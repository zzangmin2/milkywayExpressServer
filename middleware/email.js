require("dotenv").config;
const { error } = require("console");
const nodemailer = require("nodemailer");

/**
 * smtpTranport객체로 보낼 이메일과 smtp방식, 포트번호 등 설정

 */
const smtpTransport = nodemailer.createTransport({
  pool: true,
  maxConnections: 1,
  service: "naver",
  host: "smtp.naver.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.EMAIL_HOST,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

/**
 * 인증번호 값 저장_verify에서 비교(된다면 단방향 암호화?해봐도 좋지 않을까,,내 생각)
 */
let storedNumber;

/**
 * 인증번호로 보낼 랜덤숫자 만들기
 * @param {*} min
 * @param {*} max
 * @returns randNum
 */
const generateRandomNumber = (min, max) => {
  const randNum = Math.floor(Math.random() * (max - min + 1)) + min;

  return randNum;
};

/**
 * 이메일 인증번호 클라이언트에서 최초 받을때 사용 / 유저가 입력한 이메일로 6자리 랜덤번호보냄(generateRandomNumber)
 * @param {*} req
 * @param {*} res
 * @returns success: false | true
 */
const emailAuth = (req, res) => {
  try {
    const number = generateRandomNumber(111111, 999999);
    storedNumber = number;

    const signupEmail = req.body.signupEmail;

    const mailOptions = {
      from: "toui5679@naver.com", // 발신자 이메일 주소.
      to: signupEmail, //사용자가 입력한 이메일 -> 목적지 주소 이메일
      subject: "milkyway인증메일 입니다!",
      html: "<h1>인증번호를 입력해주세요 \n\n\n\n\n\n</h1>" + number,
    };
    smtpTransport.sendMail(mailOptions, (err, response) => {
      console.log("response", response);
      if (err) {
        res.status(400).json({ success: false, message: "전송 실패!" });
        smtpTransport.close();
        return;
      } else {
        res.status(200).json({
          success: true,
          message: " 메일 전송에 성공하였습니다. ",
        });
        smtpTransport.close();
        return;
      }
    });
  } catch (error) {
    res.status(500).send("server error");
  }
};

/**
 * 이메일 인증번호 확인 / 인증시간 여기서 한번 더 확인 구현??모르겠다 공부필요
 * @param {*} req
 * @param {*} res
 * @returns success: false | true
 */

const emailVerify = (req, res) => {
  try {
    const verify = req.body.verifyEmail;
    console.log(verify);
    console.log(storedNumber);
    if (verify == storedNumber) {
      res.status(200).json({ success: true });
    } else {
      res.status(400).json({ message: "인증번호가 일치하지 않습니다!" });
    }
  } catch (error) {
    res.status(500).send("server error");
  }
};

module.exports = { emailAuth, emailVerify };
