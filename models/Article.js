const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const Article = sequelize.define("Article", {
  article_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  articleMemberId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  articleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  recruit: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  apply: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  applyNow: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  startDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endDay: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  findMentor: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  mentorTag: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Article;
