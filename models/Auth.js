const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const Auth = sequelize.define(
  "Auth",
  {
    auth_no: {
      type: DataTypes.BIGINT,
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
    auth_refreshtoken: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    auth_refreshtoken_expiration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Auth",
  }
);

module.exports = Auth;
