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
      allowNull: true,
      references: {
        model: member,
        key: "member_no",
      },
    },
    studentresume_grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    studentresume_locate: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    studentresume_onelineshow: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    studentresume_major: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "studentresume",
  }
);

module.exports = studentresume;
