const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Article = require("./Article");
const User = require("./Users");

const Qreply = sequelize.define("Qreply", {
  qreply_no: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
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
  qreply_content: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  qreply_createdate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Qreply;
