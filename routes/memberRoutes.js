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
  const { id, password, name, email, role, tel } = req.body;
  try {
    const result = await member.create({
      member_id: id,
      member_password: password,
      member_name: name,
      member_email: email,
      member_role: role,
      member_phonenum: tel,
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

  try {
    const existingMember = await member.findOne({
      where: { member_id: memberId },
    });

    if (!existingMember) {
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
  const findMember = await member.findOne({
    where: {
      member_id: memberId,
      member_password: memberPassword,
    },
  });

  if (findMember) {
    const accessToken = jwt.sign(
      { id: findMember.member_id, no: findMember.member_no },
      JWT_SECRET_KEY,
      {
        expiresIn: "3h",
      }
    );
    const memberName = findMember.member_name;
    res.json({ accessToken, memberName });
  } else {
    res.status(401).send("로그인 실패");
  }
});

module.exports = router;
