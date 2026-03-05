import db from "../database/db.js";
import type {Session} from "../models/session.js"

export function createSession(sessionId: string, userId: number, createdAt: string) {
    const stmt = db.prepare(`
    INSERT INTO sessions (id, user_id, created_at)
    VALUES (?, ?, ?)`);
    stmt.run(sessionId, userId, createdAt);
}

export function deleteSession(sessionId: string) {
    const stmt = db.prepare(`
    DELETE FROM sessions WHERE id = ?`);
    stmt.run(sessionId);
}

export function findSessionById(sessionId: string) : Session | null {
    const stmt = db.prepare(`SELECT id, user_id, created_at FROM sessions WHERE id = ?`);
    const row = stmt.get(sessionId) as Session | undefined;
    return row ?? null;
}