const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const db = require("../models/index");
const member = db.member;
const JWT_SECRET_KEY = process.env.SECRET_KEY;

/**
 * 회원 전체 조회
 */
router.get("/info", async (req, res) => {
  const result = await member.findAll();
  res.send(result);
});

/**
 * 회원가입
 * 이메일, 아이디, 비밀번호, 전화번호, 역할
 */
router.post("/signup", async (req, res) => {
  const { id, pwd, name, email, role, tel } = req.body;
  try {
    const result = await member.create({
      id,
      pwd,
      name,
      email,
      role,
      tel,
    });
    res.status(200).send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send("에러발생");
  }
});

/**
 * 회원가입 시 아이디 중복 확인
 */
router.post("/signup/checkId", async (req, res) => {
  const { memberId } = req.body;
  const members = await member.findAll();

  try {
    if (!members.find((member) => member.member_id === memberId)) {
      res.status(200).send("중복된 아이디 없음");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("에러발생");
  }
});

/**
 * 로그인
 */
router.post("/login", async (req, res) => {
  const { memberId, memberPassword } = req.body;
  const members = await member.findAll();
  const member = members.find(
    (member) =>
      member.member_id === memberId && member.member_pwd === memberPassword
  );
  if (member) {
    const accessToken = jwt.sign({ id: member.member_id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const memberName = member.member_name;
    res.json({ accessToken, memberName });
  } else {
    res.status(401).send("로그인 실패");
  }
});

module.exports = router;
