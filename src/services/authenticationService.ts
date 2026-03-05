import {getUserByEmail} from "../repositories/userRepository.js";
import * as sessionRepository from "../repositories/sessionRepository.js";
import crypto from "node:crypto";
import bcrypt from "bcrypt";

export async function login(email: string, password: string) : Promise<string | null> {

    const user = getUserByEmail(email);

    if (!user) return null;

    const passwordValid : boolean = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) return null;

    const sessionId = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    sessionRepository.createSession(sessionId, user.id, createdAt)

    return sessionId;
}

export function logout(sessionId: string) {
    sessionRepository.deleteSession(sessionId);
}