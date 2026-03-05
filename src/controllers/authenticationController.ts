import {Request, Response} from "express";
import * as authenticationService from "../services/authenticationService.js";

const cookieOptions = {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
};

export async function login(req: Request, res: Response) {
    const {email, password} = req.body;

    if (typeof email !== "string" || typeof password !== "string" || !email || !password) {
        return res.status(400).json({error: 'Request invalid'})
    }

    try {
        const sessionId = await authenticationService.login(email, password)

        if (!sessionId) {
            return res.status(401).json({error: 'Unauthorized'})
        }

        res.cookie("sessionId", sessionId, cookieOptions)
        return res.json({ ok: true })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}

export function logout(req: Request, res: Response) {
    const sessionId = req.cookies?.sessionId;

    if (!sessionId) {
        res.clearCookie("sessionId", cookieOptions);
        return res.json({ ok: true })
    }

    authenticationService.logout(sessionId)
    res.clearCookie("sessionId", cookieOptions)
    return res.json({ ok: true })
}