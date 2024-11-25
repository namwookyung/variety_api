const Login = require("../../models/login/login.model");
const jwt = require('jsonwebtoken');
const SECRET_KEY = require("../../config/secret.key.js").SECRET_KEY;
const REFRESH_SECRET_KEY = require("../../config/refresh_secret.key.js").REFRESH_SECRET_KEY;


// id로 조회 (Promise 기반)
exports.findOne = async (req, res) => {
  console.log("login findOne 호출");

  const userId = req.body.userId;
  const userPw = req.body.userPw;

  console.log("userId =========== " + userId);
  console.log("userPw =========== " + userPw);

  try {
    const data = await Login.findById(userId);
    if (!data) {
      throw new Error("not_found");
    }

    console.log("[findOne] User data found:", JSON.stringify(data));
    console.log("[findOne] Comparing password for user:", userId);
    console.log("[findOne] Comparing password:", userPw);

    if(userPw !== data.USER_PW) {
      throw new Error("not_matched");
    }

    // 로그인 성공 시 액세스 토큰과 리프레시 토큰 발급
    const token = jwt.sign({ userId: data.USER_ID, userName: data.USER_NAME, userAuth: data.USER_AUTH, compCode: data.COMP_CODE }, SECRET_KEY, { expiresIn: '1h' });
    const refreshToken = jwt.sign({ userId: data.USER_ID }, REFRESH_SECRET_KEY, { expiresIn: '2d' });

    console.log("[findOne] Token created:", token);
    console.log("[findOne] RefreshToken created:", refreshToken);

    res.send({ ...data, token, refreshToken });
  } catch (err) {
    console.error("[findOne] Error in login process:", err);
    // 사용자 ID 또는 패스워드 불일치
    if (err.message === "not_found" || err.message === "not_matched") {
      res.status(404).send({
        message: `ID 또는 패스워드가 일치하지 않습니다. 확인 후 다시 로그인해주시기 바랍니다.`,
      });
    } else if (err.message === "jwt_error") {
      res.status(500).send({
        message: "로그인 중 에러가 발생했습니다. 관리자에게 문의해주세요. (ERR-L01)",  // JWT 토큰 생성 오류
      });
    } else {
      res.status(500).send({
        message: "로그인 중 에러가 발생했습니다. 관리자에게 문의해주세요. (ERR-L02)",  // 기타 알 수 없는 오류
      });
    }
  }
};