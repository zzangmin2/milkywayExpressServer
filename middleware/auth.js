const jwt = require("jsonwebtoken");
const { member } = require("../models");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.SECRET_KEY;

const tokenAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(403).send("비정상 접근입니다.");
  }

  const tokenParts = authHeader.split(" ");
  if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
    return res.status(403).send("비정상 접근입니다.");
  }

  const token = tokenParts[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send("정상적이지 않은 토큰");
  }
  // next();
};

module.exports = tokenAuthMiddleware;
