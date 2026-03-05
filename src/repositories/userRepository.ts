import type {User} from "../models/user.js";
import db from "../database/db.js";

export function getUserByEmail(email: string) : User | null {
    const stmt = db.prepare('SELECT id, email, password_hash FROM users WHERE email = ?');
    const row = stmt.get(email) as User | undefined;

    return row ?? null;
}

export function getUserById(id: string) : User | null {
    const stmt = db.prepare('SELECT id, email, password_hash FROM users WHERE id = ?');

    const row = stmt.get(id) as User | undefined;
    return row ?? null;
}