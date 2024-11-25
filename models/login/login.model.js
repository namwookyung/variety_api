const sql = require("../db.js");

// 생성자
const Login = function (login) {
  this.USER_ID = login.userId;
  this.USER_PW = login.userPw;
  this.USER_NAME = login.userName;
  this.USER_AUTH = login.userAuth;
  this.COMP_CODE = login.compCode;
};

// Login id로 조회
Login.findById = (userId) => {
  return new Promise((resolve, reject) => {
    const findById = "SELECT user_pw, user_name, user_auth, comp_code FROM user WHERE user_id = ?";
    
    sql.query(findById, [userId])
      .then(([rows, fields]) => {
        if (rows.length) {
          // 데이터 구조를 올바르게 매핑
          const user = {
            USER_PW: rows[0].user_pw,
            USER_NAME: rows[0].user_name,
            USER_AUTH: rows[0].user_auth,
            COMP_CODE: rows[0].comp_code
          };
          console.log("[findById] User found, data:", JSON.stringify(user));
          resolve(user);
          console.log("resolve(user) ======== " + user);
        } else {
          console.log("[findById] No user found for userId:", userId);
          reject(new Error("not_found"));
        }
      })
      .catch(err => {
        console.error("[findById] Error executing SQL query:", err);
        reject(err);
      });
  });
};

//TODO  로그인 후 마지막 로그인 일자 업데이트 해주기( 해당 api 는  사용자 쪽에 있을 예정)

module.exports = Login;