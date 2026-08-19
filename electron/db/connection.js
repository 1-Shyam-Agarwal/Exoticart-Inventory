import { DatabaseSync } from "node:sqlite"
import { app } from "electron"
import path from "node:path"

let db = null

export function getDb() {
  if (db) return db

  const dbPath = path.join(app.getPath("userData"), "inventory.db")
  db = new DatabaseSync(dbPath)
  db.exec("PRAGMA foreign_keys = ON")

  return db
}
