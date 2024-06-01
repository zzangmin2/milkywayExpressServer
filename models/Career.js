const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const career = sequelize.define(
  "career",
  {
    career_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    career_member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    career_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    career_startdate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    career_startend: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  },
  {
    tableName: "career",
  }
);

module.exports = career;
