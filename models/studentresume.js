const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const studentresume = sequelize.define(
  "studentresume",
  {
    studentresume_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    studentresume_member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    studentresume_grade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    studentresume_locate: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    studentresume_onelineshow: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    studentresume_major: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    tableName: "studentresume",
  }
);

module.exports = studentresume;
