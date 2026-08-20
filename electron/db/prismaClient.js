import { execFileSync } from "node:child_process"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { app } from "electron"
import { PrismaClient } from "@prisma/client"

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  ".."
)

const prismaPackageDir = path.dirname(
  fileURLToPath(import.meta.resolve("prisma/package.json"))
)
const prismaCliEntry = path.join(prismaPackageDir, "build", "index.js")

function resolveDbPath() {
  return path.join(app.getPath("userData"), "inventory.db")
}

function resolveDatabaseUrl() {
  return "file:" + resolveDbPath().replace(/\\/g, "/")
}

function runMigrateDeploy() {
  return execFileSync(process.execPath, [prismaCliEntry, "migrate", "deploy"], {
    cwd: projectRoot,
    env: {
      ...process.env,
      DATABASE_URL: resolveDatabaseUrl(),
      // process.execPath is the Electron binary in the main process;
      // this makes it run the script as plain Node instead of launching Electron.
      ELECTRON_RUN_AS_NODE: "1",
    },
    encoding: "utf-8",
  })
}

let prisma = null

export function getPrismaClient() {
  if (prisma) return prisma

  prisma = new PrismaClient({
    datasources: { db: { url: resolveDatabaseUrl() } },
  })

  return prisma
}

export function initDb() {
  try {
    console.log(runMigrateDeploy())
  } catch (err) {
    const output = `${err.stdout ?? ""}${err.stderr ?? ""}`

    // P3005: the db file has tables but no Prisma migration history — e.g. a
    // machine that ran an older build using the pre-Prisma raw-SQL schema.
    // There's no real data worth preserving at this stage (see spec Section 14),
    // so reset the file once and retry instead of requiring manual intervention.
    const dbPath = resolveDbPath()
    if (output.includes("P3005") && fs.existsSync(dbPath)) {
      fs.rmSync(dbPath)
      console.log(runMigrateDeploy())
    } else {
      console.error(output)
      throw err
    }
  }

  return getPrismaClient()
}
