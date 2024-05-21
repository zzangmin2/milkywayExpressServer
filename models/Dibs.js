const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./Users");
const Article = require("./Article");

const Dibs = sequelize.define("Dibs", {
  dibs_no: {
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
});

module.exports = Dibs;
