exports.logout = (req, res) => {
    console.log("logout.controller.js 호출");
    
    res.clearCookie("session-cookie-name");
    res.status(200).json({ message: "로그아웃 되었습니다." });
};