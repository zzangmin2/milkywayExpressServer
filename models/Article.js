const { DataTypes } = require("sequelize");
const sequelize = require("../config/Database");
const member = require("./member");

const article = sequelize.define(
  "article",
  {
    article_no: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    article_memberId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    member_no: {
      type: DataTypes.BIGINT,
      allowNull: false,
      references: {
        model: member,
        key: "member_no",
      },
    },
    article_type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    article_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // recruitment_state: {
    //   type: DataTypes.BOOLEAN,
    //   allowNull: false,
    // },
    article_apply: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    apply_now: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    article_start_day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_end_day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_find_mentor: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    article_mentor_tag: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    article_recruit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    article_con_info: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    article_con_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "article_regdate",
    tableName: "article",
  }
);

module.exports = article;
