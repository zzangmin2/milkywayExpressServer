const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");
const JWT_SECRET_KEY = process.env.SECRET_KEY;
const jwt = require("jsonwebtoken");
const member = db.member;
const apply = db.apply;
const article = db.article;
const dibs = db.dibs;

/**
 * 회원 기본 정보 조회
 */
router.get("/info", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberNo } = req.user;
    const result = await member.findOne({
      attributes: ["member_email", "member_name", "member_phonenum"],
      where: {
        member_no: memberNo,
      },
    });

    if (result) {
      const memberInfo = {
        member: {
          member_email: result.member_email,
          member_name: result.member_name,
          member_phoneNum: result.member_phonenum,
        },
      };
      res.status(200).json({ memberInfo });
    } else {
      res.status(404).send("멤버를 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("/info에러  ( myinfo ): ", error);
    res.status(500).send(error);
  }
});

/**
 * 내가 등록한 프로젝트 조회 (카드아님 표임)
 */
router.get("/applyinfo", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberNo } = req.user;
    const user = await member.findOne({
      where: {
        member_no: memberNo,
      },
      include: [
        {
          model: apply,
          attributes: ["apply_no", "apply_result"], // 필요한 apply 속성만 선택
          include: [
            {
              model: article,
              attributes: [
                "article_no", // 필요한 article 속성만 선택
                "article_title",
                "article_con_method",
                "article_con_info",
              ],
              include: [
                {
                  model: member, // article의 member 정보 가져오기
                  attributes: ["member_no", "member_name"],
                },
              ],
            },
          ],
        },
      ],
    });

    if (user) {
      const apply = user.applies.map((apply) => ({
        applyNo: apply.apply_no,
        article: {
          articleNo: apply.article.article_no,
          applyMember: {
            memberName: apply.article.member.member_name,
            memberNo: apply.article.member.member_no,
          },
          applyTitle: apply.article.article_title,
          conMethod: apply.article.article_con_method,
          conInfo: apply.article.article_con_info,
        },
        applyDate: apply.createdAt,
        applyResult: apply.apply_result,
      }));

      res.status(200).json({ apply });
    } else {
      res.status(404).json({ message: "error" });
    }
  } catch (error) {
    console.error("/applyInfo 에러 : ", error);
    res.status(500).json({ message: "error" });
  }
});

/**
 * 내가 찜한 프로젝트 조회 (마이페이지 dibs (찜))
 */

router.get("/dibsinfo", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberNo } = req.user;

    const dibsList = await dibs.findAll({
      attributes: ["dibs_no", "article_no", "member_no"],
      where: {
        member_no: memberNo,
      },
    });

    if (dibsList) {
      const articles = dibsList.map((article) => ({
        cardArticle_no: article.article_no,
        cardArticleType: article.article_type,
        cardTitle: article.article_title,
        cardFindMentor: article.article_find_mentor,
        cardRecruit: article.article_recruit,
        cardApply: article.article_apply,
        cardApplyNow: article.apply_now,
        cardLikes: article.article_likes,
        cardEndDay: article.article_end_day,
        cardStartDay: article.article_start_day,
      }));
      res.status(200).json(articles);
    }
    // else {
    //   res.status(404).json({ message: "error" });
    // }
  } catch (error) {
    console.error("/dibsInfo 에러 : ", error);
    res.status(500).json({ message: "error" });
  }
});
/**
 * 내가 신청한 프로젝트 조회 (마이페이지 article)
 */
router.get("/articleinfo", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberNo } = req.user;

    const result = await member.findOne({
      attributes: ["member_no"],
      include: {
        model: article,
        attributes: [
          "article_no",
          "article_type",
          "article_title",
          "article_find_mentor",
          "article_recruit",
          "article_apply",
          "apply_now",
          "article_likes",
          "article_start_day",
          "article_end_day",
        ],
      },
      where: {
        member_no: memberNo,
      },
    });
    if (result && result.articles && result.articles.length > 0) {
      const article = result.articles.map((article) => ({
        cardArticle_no: article.article_no,
        cardArticleType: article.article_type,
        cardTitle: article.article_title,
        cardFindMentor: article.article_find_mentor,
        cardRecruit: article.article_recruit,
        cardApply: article.article_apply,
        cardApplyNow: article.apply_now,
        cardLikes: article.article_likes,
        cardStartDay: article.article_start_day,
        cardEndDay: article.article_end_day,
      }));
      res.status(200).json(article);
    } else {
      res.status(404).json({ message: "Articles not found" });
    }
  } catch (error) {
    console.error("/articleinfo 에러 : ", error);
    res.status(500).send(error);
  }
});

/**
 * 회원 기본 정보 수정
 */
router.put("/update", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberName, memberEmail, memberPhoneNum } = req.body;
    const { memberNo } = req.user;

    const updated = await member.update(
      {
        member_name: memberName,
        member_email: memberEmail,
        member_phonenum: memberPhoneNum,
      },
      {
        where: { member_No: memberNo },
      }
    );

    if (updated) {
      const findMember = await member.findOne({
        where: {
          member_no: memberNo,
        },
      });

      const accessToken = jwt.sign(
        {
          memberId: findMember.member_id,
          memberNo: findMember.member_no,
          memberName: findMember.member_name,
        },
        JWT_SECRET_KEY,
        {
          expiresIn: "12h",
        }
      );
      res.status(200).json({
        message: "회원 정보가 업데이트되었습니다.",
        accessToken,
        memberName,
      });
    } else {
      return res.status(404).json({ message: "회원을 찾을 수 없습니다." });
    }
  } catch (error) {
    console.error("/update 에러 ( myinfo )", error);
    res.status(500).send(error);
  }
});

module.exports = router;
