const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cors = require("cors");
const { tokenAuthMiddleware } = require("./middleware/auth");

// const sequelize = new Sequelize("test", "root", "Abcd1234!", {
//   host: "localhost",
//   dialect: "mysql",
// });
// const sequelize = new Sequelize("mysql://root:Abcd1234!@localhost:3306/test");

// const sequelize = new Sequelize("sqlite::memory:");

const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    await User.sync({ force: true });
    await Article.sync({ force: true });

    await User.create({
      user_no: 1,
      id: "test1",
      name: "테스트1",
      pwd: "1234",
      email: "test1@test.com",
      role: "STUDENT",
      tel: "01022223333",
      //   dpt: "com",
    });
    await User.create({
      user_no: 2,
      id: "test2",
      name: "테스트2",
      pwd: "1234",
      email: "test2@test.com",
      role: "STUDENT",
      tel: "01044445555",
      //   dpt: "com",
    });

    await Article.create({
      article_no: 1,
      user_no: 1,
      articleMemberId: "test1",
      articleType: "study",
      title: "[express] 스터디원 모집합니다.",
      content:
        "안녕 !\n\n 안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕안녕",
      apply: 4,
      applyNow: 4,
      startDay: "2024-05-16T07:48:58.540Z",
      endDay: "2024-04-29",
      recruit: true,
      findMentor: true,
      mentorTag: "#열정적인#잘도와주는#멋진",
    });
    console.log("서버랑 붙음");
  } catch (error) {
    console.error("DB연결 실패", error);
  }
};

const JWT_SECRET_KEY = "secretkey";

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

const PORT = process.env.PORT || 8080;

//토큰 검증 미들웨어 함수

/**
 * 회원가입
 * 이메일, 아이디, 비밀번호, 전화번호, 역할
 */
app.post("/signup", async (req, res) => {
  const { id, pwd, name, email, role, tel } = req.body;
  try {
    const result = await User.create({
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
app.post("/signup/duplicationCheck", async (req, res) => {
  const { id } = req.body;
  const users = await User.findAll();

  try {
    if (!users.find((user) => user.id === id)) {
      res.status(200).send("중복된 아이디 없음");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("에러발생");
  }
});

/**
 * 회원 조회
 */
app.get("/user", async (req, res) => {
  const result = await User.findAll();
  res.send(result);
});

/**
 * 로그인
 */
app.post("/login", async (req, res) => {
  const { memberId, memberPassword } = req.body;
  const users = await User.findAll();
  const user = users.find(
    (user) => user.id === memberId && user.pwd === memberPassword
  );
  if (user) {
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ accessToken });
  } else {
    res.status(401).send("로그인 실패");
  }
});

/**
 * 게시물 전체 조회
 */

app.get("/posts/list", tokenAuthMiddleware, async (req, res) => {
  const lists = await Article.findAll();
  res.send(lists);
});

/**
 * 게시물 상세 조회
 */
app.get("/posts/:article_no", tokenAuthMiddleware, async (req, res) => {
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
// app.post("/", (req, res) => {
//   const { name, id, pwd } = req.body;
//   res.json({ message: `${id}, ${pwd}` });
//   res.send("hello");
// });

app.listen(PORT, () => {
  initDatabase();
  console.log("server");
});
