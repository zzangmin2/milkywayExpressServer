const { faker } = require("@faker-js/faker/locale/ko");
const db = require("../models/index");
const member = db.member;
const article = db.article;

const insertDummyData = async () => {
  /**
   * faker.js로 더미데이터 삽입하기
   */
  const members = [];
  for (let i = 0; i < 1; i++) {
    members.push(
      await member.create({
        member_id: `test${i + 1}`,
        member_name: faker.person.lastName() + faker.person.firstName(),
        member_password: faker.internet.password(),
        member_email: faker.internet.email(),
        member_role: "student",
        member_phonenum: faker.phone.number(),
      })
    );
  }

  for (let i = 0; i < 1; i++) {
    const member = faker.helpers.arrayElement(members);
    await article.create({
      article_memberId: member.member_id,
      member_no: member.member_no,
      article_type: faker.helpers.arrayElement(["스터디", "프로젝트"]),
      article_likes: faker.number.int({ min: 0, max: 100 }),
      article_title: faker.lorem.sentence(),
      article_content: faker.lorem.paragraph(),
      article_recruit: faker.datatype.boolean(),
      article_apply: faker.number.int({ min: 0, max: 10 }),
      apply_now: faker.number.int({ min: 0, max: 10 }),
      article_start_day: faker.date.past().toString(),
      article_end_day: faker.date.future().toString(),
      article_con_info: faker.lorem.word(),
      article_con_method: faker.lorem.word(),
      article_find_mentor: faker.datatype.boolean(),
      article_mentor_tag: Array.from(
        { length: 3 },
        () => `#${faker.lorem.word()}`
      ).join(""),
    });
  }
};

module.exports = insertDummyData;
