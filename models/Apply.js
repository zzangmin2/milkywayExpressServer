const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Article = require("./Article");
const User = require("./Users");

const Apply = sequelize.define("Apply", {
  apply_no: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  user_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: User,
      key: "user_no",
    },
  },
  article_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: "article_no",
    },
  },
  apply_result: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Apply;
