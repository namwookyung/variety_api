const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.json({message: "Hello World! Get!"});
});

app.post("/", (req, res, next) => {
  res.json({message: "Hello World! Post!"});
});

// require("./routes/login/login.routes.js")(app);

// Port Setting
app.listen(3001, () => {
  console.log("Server is running on port 3001!");
});

// TO DO : 암호화 작업, 기타 API 작업, 사용자별 권한 관리, Transacrion 관리 