const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const auth = sequelize.define(
  "auth",
  {
    auth_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    auth_member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    auth_refreshtoken: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "auth",
  }
);

module.exports = auth;
