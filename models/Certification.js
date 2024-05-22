const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const Certification = sequelize.define(
  "Certification",
  {
    cert_no: {
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
    cert_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "Certification",
  }
);

module.exports = Certification;
