const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const StudentInfo = sequelize.define(
  "StudentInfo",
  {
    studentInfo_no: {
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
    student_grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    student_major: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    student_onelineshow: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    student_locate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "studentInfo", // sequelize에서 모듈이름에서 테이블 이름을 추론하긴 하지만, 명시적으로 작성해주는게 좋기때문에 우선 넣음
  }
);

module.exports = StudentInfo;
