import { Request, Response } from "express";
import * as articleService from "../services/articleService.js";
import type {Article} from "../models/article.js";

export function listArticles(req: Request, res: Response) {

    const articles = articleService.getAllArticles()
    return res.json(articles);
}

export function getArticleById(req: Request, res: Response) {
    const rawId = req.params.articleId;

    if (!rawId || Array.isArray(rawId)) {
        return res.status(400).json({ error: "Invalid id" });
    }
    const id = Number.parseInt(rawId, 10)

    if (Number.isNaN(id)) {
        return res.status(400).json({error: "Invalid id" });
    }
    const article: Article | null = articleService.getArticleById(id)

    if (!article) {
        res.status(404).json({error: "Article not found"})
        return;
    }

    return res.json(article);
}