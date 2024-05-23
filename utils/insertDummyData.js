const { faker } = require("@faker-js/faker/locale/ko");
const db = require("../models/index");
const User = db.User;
const Article = db.Article;

const insertDummyData = async () => {
  /**
   * faker.js로 더미데이터 삽입하기
   */
  const users = [];
  for (let i = 0; i < 10; i++) {
    users.push(
      await User.create({
        user_id: `test${i + 1}`,
        user_name: faker.person.lastName() + faker.person.firstName(),
        user_pwd: faker.internet.password(),
        user_email: faker.internet.email(),
        user_role: "student",
        user_tel: faker.phone.number(),
      })
    );
  }

  for (let i = 0; i < 20; i++) {
    const user = faker.helpers.arrayElement(users);
    await Article.create({
      article_memberId: user.user_id,
      user_no: user.user_no,
      articleType: faker.helpers.arrayElement(["스터디", "프로젝트"]),
      article_likes: faker.number.int({ min: 0, max: 100 }),
      article_title: faker.lorem.sentence(),
      article_content: faker.lorem.paragraph(),
      recruit: faker.datatype.boolean(),
      article_apply: faker.number.int({ min: 0, max: 10 }),
      article_applynow: faker.number.int({ min: 0, max: 10 }),
      article_startDay: faker.date.past(),
      article_endDay: faker.date.future(),
      article_findMentor: faker.datatype.boolean(),
      article_mentorTag: Array.from(
        { length: 3 },
        () => `#${faker.lorem.word()}`
      ).join(""),
    });
  }
};

module.exports = insertDummyData;
