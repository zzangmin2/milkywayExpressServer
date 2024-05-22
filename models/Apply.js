const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Article = require("./Article");
const User = require("./User");

const Apply = sequelize.define(
  "Apply",
  {
    apply_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_no",
      },
    },
    article_no: {
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: "Apply",
  }
);

module.exports = Apply;
