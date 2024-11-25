const logins = require("../../controllers/login/login.controller.js");
const logout = require("../../controllers/login/logout.controller.js");

module.exports = (app) => {  
    // id/pw 조회
    app.post("/login", logins.findOne);

    app.post("/logout", logout.logout);
  };
  