const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");
const Article = db.Article;

/**
 * 게시물 전체 조회
 */

router.get("/list", tokenAuthMiddleware, async (req, res) => {
  const lists = await Article.findAll();
  res.send(lists);
});

/**
 * 게시물 상세 조회
 */
router.get("/:article_no", tokenAuthMiddleware, async (req, res) => {
  const requestedArticleNo = req.params.article_no;
  const articles = await Article.findAll();
  const article = await articles.find(
    (article) => article.article_no === parseInt(requestedArticleNo)
  );

  if (article) {
    res.send(article);
  } else {
    res.status(404).send("Article not found");
  }
});

module.exports = router;
