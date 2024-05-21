const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Article = require("./Article");
const User = require("./Users");
const Qreply = require("./Qreply");

const Areply = sequelize.define("Areply", {
  areply_no: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
  },
  qreply_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Qreply,
      key: "qreply_no",
    },
  },
  article_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: "article_no",
    },
  },
  user_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: User,
      key: "user_no",
    },
  },
  areply_content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  areply_createdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Areply;
