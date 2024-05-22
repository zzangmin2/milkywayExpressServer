const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const User = sequelize.define(
  "User",
  {
    user_no: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_pwd: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_tel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "User",
  }
);

module.exports = User;
