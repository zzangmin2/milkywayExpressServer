const { faker } = require("@faker-js/faker/locale/ko");
const db = require("../models/index");
const member = db.member;
const article = db.article;
const career = db.career;
const apply = db.apply;

const insertDummyData = async () => {
  /**
   * faker.js로 더미데이터 삽입하기
   */
  const members = [];

  const specialMember = await member.create({
    member_id: "test1234",
    member_name: faker.person.lastName() + faker.person.firstName(),
    member_password: "test1234",
    member_email: faker.internet.email(),
    member_role: "student",
    member_phonenum: faker.phone.number(),
  });
  members.push(specialMember);

  for (let i = 0; i < 20; i++) {
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

  const articles = [];
  for (let i = 0; i < 20; i++) {
    const member = faker.helpers.arrayElement(members);
    articles.push(
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
        article_start_day: faker.date.past().toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
        article_end_day: faker.date.future().toISOString().split("T")[0], // YYYY-MM-DD 형식으로 변환
        article_con_info: faker.lorem.word(),
        article_con_method: faker.lorem.word(),
        article_find_mentor: faker.datatype.boolean(),
        article_mentor_tag: Array.from(
          { length: 3 },
          () => `#${faker.lorem.word()}`
        ).join(""),
      })
    );
  }

  // member_no가 21 및 12인 멤버에 대한 추가 데이터 생성
  const specialMembers = members.filter(
    (member) =>
      member.member_no === specialMember.member_no || member.member_no === 12
  );
  for (let i = 0; i < 10; i++) {
    for (const member of specialMembers) {
      articles.push(
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
          article_start_day: faker.date.past().toISOString().split("T")[0],
          article_end_day: faker.date.future().toISOString().split("T")[0],
          article_con_info: faker.lorem.word(),
          article_con_method: faker.lorem.word(),
          article_find_mentor: faker.datatype.boolean(),
          article_mentor_tag: Array.from(
            { length: 3 },
            () => `#${faker.lorem.word()}`
          ).join(""),
        })
      );
    }
  }

  for (let i = 0; i < 30; i++) {
    const member = faker.helpers.arrayElement(members);
    await career.create({
      career_member_no: member.member_no,
      career_name: faker.lorem.sentence(),
      career_startdate: faker.date.past(5).toISOString().split("T")[0],
      career_startend: faker.date.past(1).toISOString().split("T")[0],
    });
  }

  for (let i = 0; i < 30; i++) {
    const member = faker.helpers.arrayElement(members);
    const article = faker.helpers.arrayElement(articles);
    await apply.create({
      member_no: member.member_no,
      article_no: article.article_no,
      apply_result: faker.helpers.arrayElement(["등록", "신청", "선정"]),
    });
  }
  for (let i = 0; i < 30; i++) {
    const specialMember = await member.findOne({ where: { member_no: 21 } });
    const article = faker.helpers.arrayElement(articles);
    await apply.create({
      member_no: specialMember.member_no,
      article_no: article.article_no,
      apply_result: faker.helpers.arrayElement(["등록", "신청", "선정"]),
    });
  }
};

module.exports = insertDummyData;
