const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");
const article = require("./article");

const apply = sequelize.define(
  "apply",
  {
    apply_no: {
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
    apply_result: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "apply",
  }
);

module.exports = apply;
