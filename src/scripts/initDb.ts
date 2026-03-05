import db from "../database/db.js";
import bcrypt from "bcrypt";

db.exec("PRAGMA foreign_keys = ON;");

try{
    db.exec("BEGIN;");

    db.exec(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);`)

    db.exec(`CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`)

    db.exec(`
    CREATE TABLE IF NOT EXISTS articles (id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    body TEXT NOT NULL
    );
`);
    db.exec("DELETE FROM sessions;");
    db.exec("DELETE FROM users;");
    db.exec("DELETE FROM articles;");

    const plainPassword = "1234";
    const passwordHash = await bcrypt.hash(plainPassword, 12)

    const insertUser = db.prepare(`INSERT INTO users (email, password_hash) VALUES (?, ?)`);

    const insertArticle = db.prepare(`INSERT INTO articles (title, body) VALUES (?, ?)`);

    insertUser.run("test@example.com", passwordHash);
    insertArticle.run("Artikel 1", "Inhalt 1");
    insertArticle.run("Artikel 2", "Inhalt 2");

    db.exec("COMMIT;");
    console.log("Database initialized successfully.");
}catch(error){
    db.exec("ROLLBACK;");
    throw error;
}

















