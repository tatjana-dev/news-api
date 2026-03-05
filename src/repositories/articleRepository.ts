import db from '../database/db.js';
import type {Article} from '../models/article.js';

export function getAllArticles() : Article[] {
    const stmt = db.prepare('SELECT id, title, body FROM articles ORDER BY id DESC ');
    const rows = stmt.all() as Article[];
    console.log("rows:", rows);
    return rows;
}

export function getArticleById(id: number) : Article | null {
    const stmt = db.prepare('SELECT id, title, body FROM articles WHERE id = ?');
    const row = stmt.get(id) as Article | undefined;

    if (!row) return null;

    return row;
}




