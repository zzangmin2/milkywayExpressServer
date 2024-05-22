const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const User = require("./User");
const Article = require("./Article");
const Apply = require("./Apply");
const Qreply = require("./Qreply");
const Areply = require("./Areply");
const Career = require("./Career");
const Certification = require("./Certification");
const Auth = require("./Auth");
const Dibs = require("./Dibs");
const StudentInfo = require("./StudentInfo");
const MentorInfo = require("./MentorInfo");

/**
 * 객체 초기화
 */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * app.js에서 사용할때 require로 db불러오고 사용할 모델들 객체할당
 */
db.User = User;
db.Article = Article;
db.StudentInfo = StudentInfo;
db.MentorInfo = MentorInfo;
db.Certification = Certification;
db.Career = Career;
db.Dibs = Dibs;
db.Auth = Auth;
db.Qreply = Qreply;
db.Areply = Areply;
db.Apply = Apply;

/**
 * 질문답변 관계설정 ( 유저와 질문 답변은 1:N / 질문 답변은 1:1 )
 * ( 관계설정에서 option설정을 통해 user_no가 변경되거나 삭제되면 그에 맞게 삭제 또는 변경되도록 옵션 추가 )
 */
User.hasMany(Qreply, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Qreply.belongsTo(User, { foreignKey: "user_no" });

User.hasMany(Areply, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Areply.belongsTo(User, { foreignKey: "user_no" });

Article.hasMany(Qreply, {
  foreignKey: "article_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Qreply.belongsTo(Article, { foreignKey: "article_no" });

Article.hasMany(Areply, {
  foreignKey: "article_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Areply.belongsTo(Article, { foreignKey: "article_no" });

Qreply.hasOne(Areply, {
  foreignKey: "qreply_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Areply.belongsTo(Qreply, { foreignKey: "qreply_no" });

User.hasMany(Apply, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Apply.belongsTo(User, { foreignKey: "user_no" });

Article.hasMany(Apply, {
  foreignKey: "article_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Apply.belongsTo(Article, { foreignKey: "article_no" });

/**
 * 자격증, 유저 인증, 회원정보 관련된 관계 설정
 * ( 유저와 auth{토큰}은 1:1 / 자격증과 경력사항은 1:N )
 * ( 유저와 멘토 정보, 회원 정보는 1:1 )
 */
User.hasMany(Career, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Career.belongsTo(User, { foreignKey: "user_no" });

User.hasMany(Auth, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Auth.belongsTo(User, { foreignKey: "user_no" });

User.hasMany(Certification, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Certification.belongsTo(User, { foreignKey: "user_no" });

User.hasOne(StudentInfo, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
StudentInfo.belongsTo(User, { foreignKey: "user_no" });

User.hasOne(MentorInfo, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
MentorInfo.belongsTo(User, { foreignKey: "user_no" });

/**
 * 찜은 1:N
 */
User.hasMany(Dibs, {
  foreignKey: "user_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Dibs.belongsTo(User, { foreignKey: "user_no" });

Article.hasMany(Dibs, {
  foreignKey: "article_no",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Dibs.belongsTo(Article, { foreignKey: "article_no" });

module.exports = db;
