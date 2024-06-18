const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");
const article = require("./Article");

const dibs = sequelize.define(
  "dibs",
  {
    dibs_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    article_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: article,
        key: "article_no",
      },
    },
  },
  {
    timestamps: false,
    tableName: "dibs",
  }
);

module.exports = dibs;
