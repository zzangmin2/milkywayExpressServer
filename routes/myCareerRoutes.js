const express = require("express");
const router = express.Router();
const tokenAuthMiddleware = require("../middleware/auth");
const db = require("../models/index");
const moment = require("moment");
const { error } = require("console");
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
      return res.status(403).json({ message: "member_no가 없습니다." });
    }

    const memberResult = await member.findOne({
      where: { member_no: memberNo },
      attributes: ["member_id", "member_name", "member_phonenum"],
    });

    const studentresumeResult = await studentresume.findOne({
      where: { studentresume_member_no: memberNo },
      attributes: [
        "studentresume_locate",
        "studentresume_major",
        "studentresume_onelineshow",
      ],
    });

    if (!studentresumeResult && !memberResult) {
      return res.status(404).json({ message: "정보를 찾을수 없습니다" });
    }

    const response = {
      studentLocate: studentresumeResult
        ? studentresumeResult.studentresume_locate
        : "",
      studentMajor: studentresumeResult
        ? studentresumeResult.studentresume_major
        : "",
      studentOneLineShow: studentresumeResult
        ? studentresumeResult.studentresume_onelineshow
        : "",
      memberId: memberResult.member_id,
      memberName: memberResult.member_name,
      memberPhoneNum: memberResult.member_phonenum,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.error("/myResume/basicInfo ( 이력서 내 정보 불러오기 ) ", error);
    res.status(500).json({ message: "server error", error });
  }
});

/**
 * 이력서 경력정보 조회
 */
router.get(
  "/myResume/careerAndCertification",
  tokenAuthMiddleware,
  async (req, res) => {
    try {
      const { memberNo } = req.user;
      if (!memberNo) {
        return res.status(403).json({ message: "member_no가 없습니다." });
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
        carStartDay: career.career_startdate,
        carEndDay: career.career_startend,
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
      return res.status(403).json({ message: "member_no가 없습니다." });
    }
    if (!studentMajor && !studentLocate && !studentOneLineShow) {
      return res.status(200).json({ message: "empty field" });
    }
    try {
      const [studentresumeResult, created] = await studentresume.findOrCreate({
        where: { studentresume_member_no: memberNo },
        defaults: {
          studentresume_locate: studentLocate,
          studentresume_major: studentMajor,
          studentresume_onelineshow: studentOneLineShow,
          studentresume_grade: "1",
          studentresume_member_no: memberNo,
        },
      });

      if (!created) {
        return res.status(409).json({ message: "데이터가 이미 존재합니다." });
      }

      res.status(200).json({ message: "success" });
    } catch (error) {
      return res.status(500).json({ message: "서버 오류", error });
    }
  } catch (error) {
    console.error(
      "/member/update/info 오류  (이력서 내 정보 수정(post)",
      error
    );
    return res.status(500).json({ message: "server error", error });
  }
});

router.put("/member/modify/info", tokenAuthMiddleware, async (req, res) => {
  try {
    const { studentMajor, studentLocate, studentOneLineShow } = req.body;

    const { memberNo } = req.user;
    if (!memberNo) {
      return res
        .status(403)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
    }

    const result = await studentresume.update(
      {
        studentresume_locate: studentLocate,
        studentresume_major: studentMajor,
        studentresume_onelineshow: studentOneLineShow,
      },
      { where: { studentresume_member_no: memberNo } }
    );

    if (result) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ error: "error" });
    }
  } catch (error) {
    console.error("/member/modify/info 오류  (이력서 내 정보 수정(put)", error);
    res.status(500).json({ message: "server error", error });
  }
});

/**
 * 내 이력서 경력 수정 ( post )
 */
router.post("/member/update/profile", tokenAuthMiddleware, async (req, res) => {
  try {
    const { careerDtoList, certificationDtoList } = req.body;
    const { memberNo } = req.user;

    if (!memberNo) {
      return res
        .status(403)
        .json({ message: "사용자 정보를 찾을 수 업습니다." });
    }

    try {
      await Promise.all(
        careerDtoList.map(async (careerData) => {
          await career.create({
            career_name: careerData.carName,
            career_startdate: moment(careerData.carStartDay).format(
              "YYYY-MM-DD"
            ),
            career_startend: moment(careerData.carEndDay).format("YYYY-MM-DD"),
            career_member_no: memberNo,
          });
        })
      );

      // 자격증 정보 추가
      await Promise.all(
        certificationDtoList.map(async (certificationData) => {
          await certification.create({
            cert_name: certificationData.certName,
            cert_date: moment(certificationData.certDate).format("YYYY-MM-DD"),
            cert_member: memberNo,
          });
        })
      );
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(404).json({ message: "error" });
    }
  } catch (error) {
    console.error(
      "/member/update/profile 오류 (이력서 내 경력 및 자격증 추가)",
      error
    );
    res.status(500).json({ message: "server error", error });
  }
});

/**
 * 경력 정보 수정 ( put )
 */

router.put("/member/modify/profile", tokenAuthMiddleware, async (req, res) => {
  try {
    const { careerDtoList, certificationDtoList } = req.body;
    const { memberNo } = req.user;

    if (!memberNo) {
      return res
        .status(403)
        .json({ message: "사용자 정보를 찾을 수 없습니다." });
    }

    await career.destroy({
      where: { career_member_no: memberNo },
    });

    await certification.destroy({
      where: { cert_member: memberNo },
    });

    // 경력 정보 수정
    try {
      await Promise.all(
        careerDtoList.map(async (careerData) => {
          await career.create({
            career_name: careerData.carName,
            career_startdate: moment(careerData.carStartDay).format(
              "YYYY-MM-DD"
            ),
            career_startend: moment(careerData.carEndDay).format("YYYY-MM-DD"),
            career_member_no: memberNo,
          });
        })
      );

      // 자격증 정보 추가
      await Promise.all(
        certificationDtoList.map(async (certificationData) => {
          await certification.create({
            cert_name: certificationData.certName,
            cert_date: moment(certificationData.certDate).format("YYYY-MM-DD"),
            cert_member: memberNo,
          });
        })
      );
      res.status(200).json({ message: "success" });
    } catch (error) {
      res.status(404).json({ message: "error", error });
    }
  } catch (error) {
    console.error(
      "/member/modify/profile 오류 (이력서 내 경력 및 자격증 수정)",
      error
    );
    res.status(500).json({ message: "server error", error });
  }
});

module.exports = router;
