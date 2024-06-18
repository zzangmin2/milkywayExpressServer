const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { emailAuth, emailVerify, emailState } = require("../middleware/email");
const db = require("../models/index");
const member = db.member;
const JWT_SECRET_KEY = process.env.SECRET_KEY;

/**
 * 회원가입
 * 이메일, 아이디, 비밀번호, 전화번호, 역할
 */
router.post("/signup", async (req, res) => {
  try {
    const { id, password, name, email, role, tel } = req.body;
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
  try {
    const { memberId } = req.body;
    const existingMember = await member.findOne({
      where: { member_id: memberId },
    });

    if (!existingMember) {
      res.status(200).send("중복된 아이디 없음");
    } else {
      res.status(404).send("중복된 아이디가 있습니다.");
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
  try {
    const { memberId, memberPassword } = req.body;
    const findMember = await member.findOne({
      where: {
        member_id: memberId,
        member_password: memberPassword,
      },
    });

    if (findMember) {
      const accessToken = jwt.sign(
        {
          memberId: findMember.member_id,
          memberNo: findMember.member_no,
          memberName: findMember.member_name,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: "12h",
        }
      );
      const memberName = findMember.member_name;
      res.status(200).json({ accessToken, memberName });
    } else {
      res.status(401).send("로그인 실패");
    }
  } catch (error) {
    res.status(500).send("server error");
  }
});

/**
 * signupemail에서 이메일 최초인증 axios => 성공시 verify 버튼 활성화
 */
router.post("/users/signupemailform", emailAuth);

/**
 *  signupemail에서 이메일 인증번호 확인 => 다음으로 버튼 활성화
 */
router.post("/users/signupemailverify", emailVerify);

module.exports = router;
