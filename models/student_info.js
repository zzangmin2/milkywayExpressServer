const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const student_info = sequelize.define(
  "student_info",
  {
    student_info_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    student_info_member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    student_grade: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    student_major: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    student_onelineshow: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    student_locate: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    tableName: "student_info", // sequelize에서 모듈이름에서 테이블 이름을 추론하긴 하지만, 명시적으로 작성해주는게 좋기때문에 우선 넣음
  }
);

module.exports = student_info;
