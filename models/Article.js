const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const Article = sequelize.define(
  "Article",
  {
    article_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    article_memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_no",
      },
    },
    articleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    article_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recruit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    article_apply: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    article_applynow: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    article_startDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    article_endDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    article_findMentor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    article_mentorTag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Article",
  }
);

module.exports = Article;
