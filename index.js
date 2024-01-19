// 환경 변수
require("dotenv").config();
const express = require("express");
const app = express();
 const mongoose = require("mongoose");
 const sha = require("sha256");
const cors = require("cors");
const session = require("express-session");
const path = require("path");
const axios = require("axios");

// controllers
const cultureController = require("./controllers/cultureControllers");
const TwocultureController = require("./controllers/SecondcultureControllers");
const sessionController = require("./controllers/sessionController");
const reserveController = require("./controllers/reserveController");
const paymentController = require("./controllers/paymentController");

//세션 설정 (주로 앞쪽에 작성)
app.use(
  session({
    secret: process.env.SESSION_NO,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());
app.options("*", cors());

const PORT = process.env.PORT || 8080;
const URL = process.env.MONGODB_URL;

let mydb;
mongoose
  // mongoose는 내부에서도 연결이 가능하다
  .connect(URL, { dbName: "CultureReserveLogin" })
  .then(() => {
    console.log("MongoDB에 연결 되었습니다");
    mydb = mongoose.connection.db;
  })
  .catch((err) => {
    console.log("MongoDB 연결 실패:", err);
  });

// build
app.use(express.static(path.join(__dirname, "build")));

app.post("/signup", async (req, res) => {
  console.log(req.body.userId);
  console.log(req.body.userPw);
  console.log(req.body.userName);
  console.log(req.body.userGroup);
  console.log(req.body.userEmail);

  try {
    await mydb.collection("account").insertOne({
      userId: req.body.userId,
      userPw: sha(req.body.userPw),
      userName: req.body.userName,
      userGroup: req.body.userGroup,
      userEmail: req.body.userEmail,
    });
    console.log("회원가입 성공");
    res.json({ message: "회원가입성공" });
  } catch (err) {
    console.log("회원가입 에러:", err);
    resizeBy.status(500).send({ error: err });
  }
});

// 로그인
app.get("/login", sessionController.checkUserSession);
app.get("/", sessionController.checkUserSession);

app.post("/login", async (req, res) => {
  sessionController.loginUser(req, res, mydb);
});
// 로그아웃
app.get("/logout", sessionController.logoutUser);



// 장바구니
app.get("/save",reserveController.getReservePosts);
app.get("/save/total", reserveController.getReservePostTotal);
// 장바구니 삭제
app.delete("/save/delete/:id", reserveController.getReservePostDelete);
// 장바구니 저장
app.post("/reserve/:title", reserveController.getReserve);
// 장바구니 수정
app.post("/save/update", reserveController.getReservePostUpdate);


// 결재내역
// app.get("/payment",paymentController.getpaymentPosts);
// app.get("/payment/total", paymentController.getpaymentPostTotal);
// // 결재내역 삭제
// app.delete("/payment/delete/:id", paymentController.getpaymentPostDelete);
 // 결재내역 저장
 app.post("/payment/:title", paymentController.getPayment);



//문화생활 검색
app.get("/data/culture", cultureController.getCultureData);
app.get("/ex/twoculture", TwocultureController.getTwoCultureData);
app.get("/reserve/:title/twoculture", TwocultureController.reserveData);

app.listen(PORT, () => {
  console.log("8080번 포트에서 실행 중");
});
