const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./Users");

const Auth = sequelize.define("Auth", {
  auth_no: {
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
  auth_refreshtoken: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  auth_refreshtoken_expiration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Auth;
