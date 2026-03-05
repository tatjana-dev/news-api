import {Request, Response} from "express";
import * as userService from "../services/userService.js";

export function me(req: Request, res: Response) {
    const userId = res.locals.userId;

    if(!userId){
        return res.status(401).send("Unauthorized");
    }
    const user = userService.getUserById(userId);

    if (!user) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    return res.json(user);
}