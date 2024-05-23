const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");

const member = sequelize.define(
  "member",
  {
    member_no: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },

    member_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_phonenum: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "member_create",
    updatedAt: "member_modify",
    tableName: "member",
  }
);

module.exports = member;
