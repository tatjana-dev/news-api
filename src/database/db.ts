import Database from "better-sqlite3"
import type { Database as DatabaseType } from "better-sqlite3";

const db: DatabaseType = new Database("data/dev.db");

db.exec("PRAGMA foreign_keys = ON;");

export default db;