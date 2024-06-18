const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: process.env.DB_PASSWORD,
  database: "milkyway_express",
});
module.exports = sequelize;
