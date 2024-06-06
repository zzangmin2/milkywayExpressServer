require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models/index");
const sequelize = require("./config/Database");
const memberRoutes = require("./routes/memberRoutes");
const postRoutes = require("./routes/postRoutes");
const careerRoutes = require("./routes/myCareerRoutes");
const myInfoRoutes = require("./routes/myInfoRoutes");
const insertDummyData = require("./utils/insertDummyData");

/**
 * index.js에서 관계 정의하는걸로 이해하고 구성했는데 관계 정립안된 모델들 있음 / 데이터베이스 이름 milkyway_express로 만들고 생성 확인
 */

// const sequelize = new Sequelize("test", "root", "Abcd1234!", {
//   host: "localhost",
//   dialect: "mysql",
// });
// const sequelize = new Sequelize("mysql://root:Abcd1234!@localhost:3306/test");

// const sequelize = new Sequelize("sqlite::memory:");

const initDatabase = async () => {
  try {
    // await sequelize.authenticate();

    // await db.sequelize.sync({ force: true });

    // insertDummyData();

    console.log("서버랑 붙음");
  } catch (error) {
    console.error("DB연결 실패", error);
  }
};

/**
 * cors 설정
 */
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json());
app.use(cors(corsOptions));

/**
 * port 설정
 */
const PORT = process.env.PORT || 8080;

/**
 * 라우터 설정
 */
app.use("/", memberRoutes, careerRoutes, myInfoRoutes);
app.use("/posts", postRoutes);

app.listen(PORT, () => {
  initDatabase();
  console.log("server");
});
