const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const certification = sequelize.define(
  "certification",
  {
    cert_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    cert_member: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    cert_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    createdAt: "cert_date",
    tableName: "certification",
  }
);

module.exports = certification;
