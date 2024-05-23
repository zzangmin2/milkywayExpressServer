const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const MentorInfo = sequelize.define(
  "MentorInfo",
  {
    mentor_no: {
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
    mentor_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentor_work: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    mentor_worktype: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mentor_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mentor_locate: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "mentorInfo", // sequelize에서 모듈이름에서 테이블 이름을 추론하긴 하지만, 명시적으로 작성해주는게 좋기때문에 우선 넣음
  }
);

module.exports = MentorInfo;
