const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./User");

const Career = sequelize.define(
  "Career",
  {
    career_no: {
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
    career_name: {
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    career_startdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    career_enddate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Career",
  }
);

module.exports = Career;
