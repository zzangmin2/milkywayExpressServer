const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");
const article = db.article;

/**
 * 게시물 전체 조회
 */

router.get("/list", tokenAuthMiddleware, async (req, res) => {
  const lists = await article.findAll();
  res.send(lists);
});

/**
 * 게시물 상세 조회
 */
router.get("/:article_no", tokenAuthMiddleware, async (req, res) => {
  const requestedarticleNo = req.params.article_no;
  const articles = await article.findAll();
  const article = await articles.find(
    (article) => article.article_no === parseInt(requestedarticleNo)
  );

  if (article) {
    res.send(article);
  } else {
    res.status(404).send("article not found");
  }
});

module.exports = router;
