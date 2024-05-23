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
 * 질문답변 관계설정   ( 유저와 질문 답변은 1:N / 질문 답변은 1:1 )
 */
User.hasMany(Qreply, { foreignKey: "user_no" });
Qreply.belongsTo(User, { foreignKey: "user_no" });

User.hasMany(Areply, { foreignKey: "user_no" });
Areply.belongsTo(User, { foreignKey: "user_no" });

Article.hasMany(Qreply, { foreignKey: "article_no" });
Qreply.belongsTo(Article, { foreignKey: "article_no" });

Article.hasMany(Areply, { foreignKey: "article_no" });
Areply.belongsTo(Article, { foreignKey: "article_no" });

Qreply.hasOne(Areply, { foreignKey: "qreply_no" });
Areply.belongsTo(Qreply, { foreignKey: "qreply_no" });

/**
 * 자격증, 유저인증 관련된 관계설정
 * ( 유저와 auth{토큰}은 1:1 / 자격증과 경력사항은 1:N )
 * ( 유저와 멘토정보, 회원정보는 1:1? )   * + erd에서는 1:n관계인데 한 회원이 한개의 학생, 멘토정보를 가진다고 이해해서 1:1로 (hasOne) 만듬
 */

User.hasMany(Career, { foreignKey: "user_no" });
Career.belongsTo(User, { foreignKey: "user_no" });

User.hasOne(Auth, { foreignKey: "user_no" });
Auth.belongsTo(User, { foreignKey: "user_no" });

User.hasMany(Certification, { foreignKey: "user_no" });
Certification.belongsTo(User, { foreignKey: "user_no" });

User.hasOne(StudentInfo, { foreignKey: "user_no" });
StudentInfo.belongsTo(User, { foreignKey: "user_no" });

User.hasOne(MentorInfo, { foreignKey: "user_no" });
StudentInfo.belongsTo(User, { foreignKey: "user_no" });

module.exports = db;
