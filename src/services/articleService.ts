import {Article} from "../models/article.js";
import * as articlesRepository from "../repositories/articleRepository.js";

export function getAllArticles() : Article[]{

    const articles = articlesRepository.getAllArticles();
    console.log("getAllArticles()", articles);
    return articles;
}

export function getArticleById(id: number) : Article | null {
    const article : Article | null = articlesRepository.getArticleById(id)
    if (!article) return null;
    return article;
}