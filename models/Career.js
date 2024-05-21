const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const User = require("./Users");

const Career = sequelize.define("Career", {
  career_no: {
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
});

module.exports = Career;
