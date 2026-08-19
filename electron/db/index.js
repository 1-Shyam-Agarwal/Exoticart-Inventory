import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { getDb } from "./connection.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const schema = fs.readFileSync(path.join(__dirname, "schema.sql"), "utf-8")

export function initDb() {
  const db = getDb()
  db.exec(schema)
  return db
}

export { getDb }
