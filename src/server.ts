import express from "express";
import {listArticles} from "./controllers/articleController.js"
import {getArticleById} from "./controllers/articleController.js";
import {login, logout} from "./controllers/authenticationController.js";
import cookieParser from "cookie-parser";
import {requireAuth} from "./middleware/requireAuth.js";
import {me} from "./controllers/userController.js";


const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/test", (req, res) => {
    res.send("ok");
});

app.get("/articles", listArticles);

app.get("/articles/:articleId", getArticleById);

app.post("/login", login)

app.post("/logout", logout)

app.get("/me", requireAuth, me)

app.listen(3000, () => {
    console.log("Server läuft auf http://localhost:3000");
});