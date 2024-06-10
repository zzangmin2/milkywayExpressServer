const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");

const { article, apply, dibs, student_info, certification } = db;

/**
 * 게시물 전체 리스트 조회
 */

router.get("/posts/list", tokenAuthMiddleware, async (req, res) => {
  const lists = await article.findAll();

  res.status(200).send(lists);
});

/**
 * 게시물 상세 조회
 */
router.get("/posts/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const userId = req.user.memberId;
    const userNo = req.user.memberNo;
    const requestedarticleNo = req.params.no;
    const findArticle = await article.findOne({
      where: { article_no: requestedarticleNo },
    });

    const findApplys = await apply.findAll({
      where: { article_no: requestedarticleNo },
    });

    const findDibs = await dibs.findAll({
      where: { article_no: requestedarticleNo },
    });

    if (findArticle && findApplys && findDibs) {
      // 해당 게시물의 작성자인지 판별
      const isAuthor = userId === findArticle.article_memberId ? true : false;

      //해당 게시물 지원자인지 판별
      const isApplyer = userNo === findApplys.member_no ? true : false;

      //해당 게시물에 좋아요 눌렀는지 판별
      const isLike = userNo === findDibs.member_no ? true : false;

      const articleData = findArticle.dataValues;
      articleData.isApplyer = isApplyer;
      articleData.isAuthor = isAuthor;
      articleData.isLike = isLike;

      console.log("Article found:", articleData);
      res.status(200).send(articleData);
    } else {
      return res.status(404).send("해당 게시물을 찾을 수 없습니다.");
    }
  } catch (error) {
    console.error("게시물 상세 조회 오류", error);
    return res.status(404).send("해당 게시물을 찾을 수 없습니다.");
  }
});

/**
 * 게시물 등록
 * /write
 */

router.post("/posts/write", tokenAuthMiddleware, async (req, res) => {
  // router.post("/write", async (req, res) => {
  try {
    const {
      articleType,
      apply,
      findMentor,
      mentorTag,
      startDay,
      endDay,
      title,
      content,
      conMethod,
      conInfo,
    } = req.body;

    const userId = req.user.memberId;
    const userNo = req.user.memberNo;
    const newArticle = await article.create({
      member_no: userNo,
      article_memberId: userId,
      article_recruit: true,
      article_type: articleType,
      article_apply: apply,
      article_find_mentor: findMentor,
      article_mentor_tag: mentorTag,
      article_start_day: startDay,
      article_end_day: endDay,
      article_title: title,
      article_content: content,
      article_con_method: conMethod,
      article_con_info: conInfo,
    });

    console.log(newArticle);
    res.status(201).json({ success: true });
  } catch (error) {
    console.error("게시물 등록 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

/**
 * 게시물 수정 ( 모집 상태 수정 )
 * /done/${articleId}
 */

router.put("/posts/done/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const userId = req.user.memberId;
    const findArticle = await article.findOne({
      where: { article_no: requestedarticleNo },
    });

    // 게시물이 존재하지 않을 경우
    if (!findArticle) {
      return res
        .status(404)
        .json({ success: false, error: "게시물을 찾을 수 없습니다." });
    }

    // 게시물 작성자의 ID와 요청한 사용자의 ID가 일치하지 않을 경우
    if (findArticle.article_memberId !== userId) {
      return res.status(403).json({
        success: false,
        error: "게시물은 작성자만 수정할 수 있습니다.",
      });
    }

    const result = await article.update(
      {
        article_recruit: false,
      },
      { where: { article_no: requestedarticleNo } }
    );

    if (result[0] === 0) {
      return res
        .status(404)
        .json({ success: false, error: "게시물을 찾을 수 없습니다." });
    }

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("게시물 수정 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

/**
 * 게시물 삭제
 * /${articleId}
 */
router.delete("/posts/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const userId = req.user.memberId;
    const findArticle = await article.findOne({
      where: { article_no: requestedarticleNo },
    });

    // 게시물이 존재하지 않을 경우
    if (!findArticle) {
      return res
        .status(404)
        .json({ success: false, error: "게시물을 찾을 수 없습니다." });
    }

    // 게시물 작성자의 ID와 요청한 사용자의 ID가 일치하지 않을 경우
    if (findArticle.article_memberId !== userId) {
      return res.status(403).json({
        success: false,
        error: "게시물은 작성자만 삭제할 수 있습니다.",
      });
    }

    await article.destroy({ where: { article_no: requestedarticleNo } });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("게시물 삭제 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});
/**
 * 게시물 지원
 * /apply/${article_no}
 */
router.post("/posts/apply/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const userId = req.user.memberId;
    const userNo = req.user.memberNo;
    const findArticle = await article.findOne({
      where: { article_no: requestedarticleNo },
    });

    console.log(findArticle);

    // 게시물이 존재하지 않을 경우
    if (!findArticle) {
      return res
        .status(404)
        .json({ success: false, error: "게시물을 찾을 수 없습니다." });
    }

    // 게시물 작성자의 ID와 요청한 사용자의 ID가 일치할 경우
    if (findArticle.article_memberId === userId) {
      return res.status(403).json({
        success: false,
        error: "게시물 지원은 작성자 이외의 사람만 지원할 수 있습니다.",
      });
    }

    //이미 지원한 사용자의 경우
    const existingApplication = await apply.findOne({
      where: { article_no: requestedarticleNo, member_no: userNo },
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        error: "이미 이 게시물에 지원하셨습니다.",
      });
    }

    const newApply = await apply.create({
      member_no: userNo,
      article_no: requestedarticleNo,
      apply_result: "신청",
    });

    console.log(newApply);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("지원하기 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});
/**
 * 게시물 지원자 리스트 조회
 * /applylist/${article_no}
 */

router.get("/posts/applylist/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const findApply = await apply.findAll({
      where: { article_no: requestedarticleNo },
    });

    res.status(200).send(findApply);
  } catch (error) {
    console.error("지원자 리스트 조회 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

/**
 * 게시물 찜하기
 */
router.post("/posts/likes/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const userNo = req.user.memberNo;
    const findLike = await dibs.findAll({
      where: { member_no: userNo },
    });

    // 이미 찜한 게시물일경우
    if (findLike.length >= 1) {
      return res.status(400).json({
        success: false,
        error: "이미 이 게시물에 찜하셨습니다.",
      });
    }

    const newLike = await dibs.create({
      member_no: userNo,
      article_no: requestedarticleNo,
    });

    console.log(newLike);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("찜 등록 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

/**
 * 게시물 찜취소
 */

router.delete("/posts/likes/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedarticleNo = req.params.no;
    const userNo = req.user.memberNo;
    const deleteLike = await dibs.destroy({
      where: {
        member_no: userNo,
        article_no: requestedarticleNo,
      },
    });

    console.log(deleteLike);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("찜 취소 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

/**
 * 게시물 지원자 이력서 조회 ( 기본 사용자 정보 )
 */

router.get("/apply/basicInfo/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedapplyNo = req.params.no;
    const userNo = req.user.memberNo;

    const findApply = await apply.findOne({
      where: {
        apply_no: requestedapplyNo,
      },
    });

    const findArticle = await article.findOne({
      where: {
        article_no: findApply.article_no,
      },
    });

    const findStudentInfo = await student_info.findOne({
      where: {
        student_info_member_no: findApply.member_no,
      },
    });

    if (findArticle.member_no !== userNo) {
      return res.status(403).json({
        success: false,
        error: "게시물 작성자만 이력서 조회 가능합니다.",
      });
    }

    res.status(200).json(findStudentInfo);
  } catch (error) {
    console.error("지원자 이력서 (기본 정보) 조회 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});
/**
 * 게시물 지원자 이력서 조회 ( 자격증 / 경력 )
 */
router.get(
  "/apply/careerAndCertification/:no",
  tokenAuthMiddleware,
  async (req, res) => {
    try {
      const requestedapplyNo = req.params.no;
      const userNo = req.user.memberNo;

      const findApply = await apply.findOne({
        where: {
          apply_no: requestedapplyNo,
        },
      });

      const findArticle = await article.findOne({
        where: {
          article_no: findApply.article_no,
        },
      });

      const findcertificationInfo = await certification.findOne({
        where: {
          cert_member: findApply.member_no,
        },
      });

      if (findArticle.member_no !== userNo) {
        return res.status(403).json({
          success: false,
          error: "게시물 작성자만 이력서 조회 가능합니다.",
        });
      }

      res.status(200).json(findcertificationInfo);
    } catch (error) {
      console.error("지원자 이력서 (자격증 / 경력 정보) 조회 오류", error);
      res.status(500).json({ success: false, error: "서버에러드앙" });
    }
  }
);
/**
 * 지원 여부 변경 (합 / 불)
 * @request apply_no
 */
router.put("/update/:no", tokenAuthMiddleware, async (req, res) => {
  try {
    const requestedapplyNo = req.params.no;
    const { applyResult } = req.body;
    const userNo = req.user.memberNo;
    const findApply = await apply.findOne({
      where: {
        apply_no: requestedapplyNo,
      },
    });

    const findArticle = await article.findOne({
      where: {
        article_no: findApply.article_no,
      },
    });

    if (findArticle.member_no !== userNo) {
      return res.status(403).json({
        success: false,
        error: "게시물 작성자만 수정 가능합니다.",
      });
    }

    const result = await apply.update(
      {
        apply_result: applyResult,
      },
      { where: { apply_no: requestedapplyNo } }
    );

    console.log(result);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("지원 상태 수정 오류", error);
    res.status(500).json({ success: false, error: "서버에러드앙" });
  }
});

module.exports = router;
