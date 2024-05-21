const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.SECRET_KEY;

const tokenAuthMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader.split(" ")[1];
  if (!authHeader || !token) {
    return res.status(403).send("비정상 접근입니다.");
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    req.user = decoded;
  } catch (err) {
    console.log(err);
    return res.status(401).send("정상적이지 않은 토큰");
  }

  //어떤 요청을 하기 전에 실행한 다음에 본 코드를 실행하게하는 함수
  next();
};

module.exports = tokenAuthMiddleware;
