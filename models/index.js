const Sequelize = require("sequelize");
const sequelize = require("../config/Database");

const member = require("./member");
const article = require("./article");
const apply = require("./apply");
const career = require("./career");
const certification = require("./certification");
const auth = require("./auth");
const student_info = require("./student_info");
const studentresume = require("./studentresume");
const refresh_token = require("./refresh_token");

/**
 * 객체 초기화
 */
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * app.js에서 사용할 때 require로 db를 불러오고 사용할 모델들 객체 할당
 */

db.member = member;
db.article = article;
db.student_info = student_info;
db.certification = certification;
db.career = career;
db.auth = auth;
db.apply = apply;
db.refresh_token = refresh_token;
db.studentresume = studentresume;

/**
 * 자격증, 유저 인증 관련된 관계 설정
 * (유저와 auth {토큰}은 1:1, 자격증과 경력 사항은 1:N)
 * (유저와 멘토 정보, 회원 정보는 1:1? ERD에서는 1:N 관계인데 한 회원이 한 개의 학생, 멘토 정보를 가진다고 이해해서 1:1로 만듬)
 */

// member.hasMany(career, { foreignKey: "member_no" });
// career.belongsTo(member, { foreignKey: "member_no" });

// member.hasOne(auth, { foreignKey: "member_no" });
// auth.belongsTo(member, { foreignKey: "member_no" });

// member.hasMany(certification, { foreignKey: "member_no" });
// certification.belongsTo(member, { foreignKey: "member_no" });

// member.hasOne(student_info, { foreignKey: "member_no" });
// student_info.belongsTo(member, { foreignKey: "member_no" });

// member.hasOne(studentresume, { foreignKey: "member_no" });
// studentresume.belongsTo(member, { foreignKey: "member_no" });

// member.hasOne(refresh_token, { foreignKey: "member_no" });
// refresh_token.belongsTo(member, { foreignKey: "member_no" });

/**
 * 게시물 관련 관계 설정
 */

member.hasMany(article, { foreignKey: "member_no" });
article.belongsTo(member, { foreignKey: "member_no" });

member.hasMany(apply, { foreignKey: "member_no" });
apply.belongsTo(member, { foreignKey: "member_no" });

article.hasMany(apply, { foreignKey: "article_no" });
apply.belongsTo(article, { foreignKey: "article_no" });

module.exports = db;
