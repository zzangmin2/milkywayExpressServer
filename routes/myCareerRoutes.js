const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");
const { where } = require("sequelize");
const member = db.member;
const studentresume = db.studentresume;
const career = db.career;
const certification = db.certification;

/**
 * 이력서 기본 정보 조회
 */
router.get("/myResume/basicInfo", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberNo } = req.user;

    if (!memberNo) {
      return res.status(400).json({ message: "member_no가 없습니다." });
    }

    const result = await studentresume.findOne({
      where: { studentresume_member_no: memberNo },
      include: [
        {
          model: member,
          attributes: ["member_id", "member_name", "member_phonenum"],
        },
      ],
    });

    if (!result) {
      return res.status(404).json({ message: "정보를 찾을수 없습니다" });
    }

    const response = {
      studentLocate: result.studentresume_locate,
      studentMajor: result.studentresume_major,
      studentOneLineShow: result.studentresume_onelineshow,
      memberId: result.member.member_id,
      memberName: result.member.member_name,
      memberPhoneNum: result.member.member_phonenum,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("/myResume/basicInfo ( 이력서 내 정보 불러오기 ) ", error);
    return res.status(500).json({ message: "server error", error });
  }
});

/**
 * 내가 등록한 프로젝트 카드 조회 ( 마이페이지 apply )
 */
router.get(
  "/myResume/careerAndCertification",
  tokenAuthMiddleware,
  async (req, res) => {
    try {
      const { memberNo } = req.user;
      if (!memberNo) {
        return res.status(400).json({ message: "member_no가 없습니다." });
      }
      const careerResult = await career.findAll({
        where: { career_member_no: memberNo },
        attributes: ["career_name", "career_startdate", "career_startend"],
      });
      const certificationResult = await certification.findAll({
        where: { cert_member: memberNo },
        attributes: ["cert_name", "cert_date"],
      });

      const careerDtoList = careerResult.map((career) => ({
        carName: career.career_name,
        carStartDay: career.carStartDay,
        carEndDay: career.carEndDay,
      }));

      const certificationDtoList = certificationResult.map((certification) => ({
        certName: certification.cert_name,
        certDate: certification.cert_date,
      }));

      res.status(200).json({ careerDtoList, certificationDtoList });
    } catch (error) {
      console.error(
        "/myResume/careerAndCertification ( 이력서 경력정보 불러오기 오류 발생 )",
        error
      );
      res.status(500).json({ message: "server error", error });
    }
  }
);

/**
 * 이력서 내 정보 수정
 */
router.post("/member/update/info", tokenAuthMiddleware, async (req, res) => {
  try {
    const { studentMajor, studentLocate, studentOneLineShow } = req.body;

    const { memberNo } = req.user;
    if (!memberNo) {
      return res.status(400).json({ message: "member_no가 없습니다." });
    }

    const result = await studentresume.create(
      {
        studentresume_locate: studentLocate,
        studentresume_major: studentMajor,
        studentresume_onelineshow: studentOneLineShow,
      },
      { where: { studentresume_member_no: memberNo } }
    );

    if (!result) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(
      "/member/update/info 오류  (이력서 내 정보 수정(post)",
      error
    );
    res.status(500).json({ message: "server error", error });
  }
});

router.put("/member/modify/info", tokenAuthMiddleware, async (req, res) => {
  try {
    const { studentMajor, studentLocate, studentOneLineShow } = req.body;

    const { memberNo } = req.user;
    if (!memberNo) {
      return res.status(400).json({ message: "member_no가 없습니다." });
    }

    const result = await studentresume.update(
      {
        studentresume_locate: studentLocate,
        studentresume_major: studentMajor,
        studentresume_onelineshow: studentOneLineShow,
      },
      { where: { studentresume_member_no: memberNo } }
    );

    if (!result) {
      return res.status(404).json({ error: "사용자를 찾을 수 없습니다." });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("/member/modify/info 오류  (이력서 내 정보 수정(put)", error);
    res.status(500).json({ message: "server error", error });
  }
});

/**
 * 내 이력서 경력 수정
 */
router.post("/member/update/profile", tokenAuthMiddleware, async (req, res) => {
  try {
    const { memberName, memberEmail, memberPhoneNum } = req.body;
    const { memberNo } = req.user;

    const result = await member.create(
      {
        memberName: memberName,
        memberEmail: memberEmail,
        memberPhoneNum: memberPhoneNum,
      },
      {
        where: { career_no: memberId },
      }
    );
    res.status(200).send(result);
  } catch (error) {
    console.error(
      "/member/modify/profile 오류  (이력서 내 경력 수정(post)",
      error
    );
    res.status(500).json({ message: "server error", error });
  }
});

router.put("/member/update/profile", tokenAuthMiddleware, async (req, res) => {
  const { memberName, memberEmail, memberPhoneNum } = req.body;
  const { memberNo } = req.user;
  const result = await member.update(
    {
      memberName: memberName,
      memberEmail: memberEmail,
      memberPhoneNum: memberPhoneNum,
    },
    {
      where: { id: memberId },
    }
  );
  res.status(200).send(result);
});

module.exports = router;
