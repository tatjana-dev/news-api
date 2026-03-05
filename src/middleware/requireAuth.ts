import type { Request, Response, NextFunction } from "express";
import {deleteSession, findSessionById} from "../repositories/sessionRepository.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const session = findSessionById(sessionId);

    if (!session) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    const createdAt = new Date(session.created_at);
    const now = new Date();

    const validFor = 24 * 60 * 60 * 1000;

    if(now.getTime() - createdAt.getTime() > validFor) {
        deleteSession(sessionId);
        res.clearCookie("sessionId");
        return res.status(401).json({ error: "Unauthorized" });
    }

    res.locals.userId = session.user_id;
    next();
}