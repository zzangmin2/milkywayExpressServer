const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const refresh_token = sequelize.define(
  "refresh_token",
  {
    refresh_token_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    refresh_token_member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    refresh_token_refreshtoken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "refresh_token",
  }
);

module.exports = refresh_token;
