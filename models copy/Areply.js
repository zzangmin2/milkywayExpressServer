const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Qreply = require("./Qreply");
const User = require("./User");

const Areply = sequelize.define(
  "Areply",
  {
    areply_no: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    qreply_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Qreply,
        key: "qreply_no",
      },
    },
    user_no: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User,
        key: "user_no",
      },
    },
    areply_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    areply_createdate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "Areply",
  }
);

module.exports = Areply;
