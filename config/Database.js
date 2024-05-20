const { Sequelize } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "1234",
  database: "milkyway",
});
module.exports = sequelize;
