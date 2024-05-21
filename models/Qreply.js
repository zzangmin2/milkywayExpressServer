const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const Article = require("./Article");

const Qreply = sequelize.define("Qreply", {
  qreply_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  article_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: article_no,
    },
  },
  user_no: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Article,
      key: user_no,
    },
  },
  articleType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Qreply;
