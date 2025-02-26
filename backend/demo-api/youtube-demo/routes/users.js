const express = require("express");
const router = express.Router();
router.use(express.json());

const conn = require("../connection");

// 1. 로그인
router.post("/login", (req, res) => {
  let body = req.body;
  let email = body.id;
  let password = body.password;

  // 정보가 누락된 경우 예외 처리
  if (!email) {
    res.status(400).json({
      message: "id가 포함되어있지 않습니다.",
    });
  } else if (!password) {
    res.status(400).json({
      message: "password가 포함되어있지 않습니다.",
    });
  } else {
    let sql = `SELECT * FROM users WHERE email=?`;
    conn.query(sql, email, (err, rows, fields) => {
      if (err instanceof Error) {
        console.log(err);
        return;
      }

      let loginUser = rows[0];
      if (loginUser) {
        if (loginUser.password == password) {
          res.json({
            message: `${loginUser.name}님 환영합니다!`,
          });
        } else {
          res.json({
            message: "패스워드가 일치하지 않습니다",
          });
        }
      } else {
        res.status(404).json({
          message: `${email}에 해당되는 유저가 없습니다.`,
        });
      }
    });
  }
});

// 2. 회원가입
router.post("/join", (req, res) => {
  let body = req.body;
  let email = body.id;
  let password = body.password;
  let name = body.name;
  let phone = body.phone;

  // 정보가 누락된 경우 예외 처리
  if (!email) {
    res.status(400).json({
      message: "id가 포함되어있지 않습니다.",
    });
  } else if (!password) {
    res.status(400).json({
      message: "password가 포함되어있지 않습니다.",
    });
  } else if (!name) {
    res.status(400).json({
      message: "name이 포함되어있지 않습니다.",
    });
  } else if (!phone) {
    res.status(400).json({
      message: "phone이 포함되어있지 않습니다.",
    });
  } else {
    let sql = `INSERT INTO users (email, name, password, phone) 
      VALUES (?, ?, ?, ?)`;
    conn.query(sql, [email, name, password, phone], (err, rows, fields) => {
      if (err.errno == 1062) {
        res.status(400).json({
          message: "이미 가입되어있는 id입니다.",
        });
      } else if (err) {
        console.log(err);
        return;
      } else {
        res.status(201).json({
          message: `${name}님 환영합니다`,
        });
      }
    });
  }
});

// 3. 회원 개별 조회
router.get("/users/:id", (req, res) => {
  let { id } = req.params;
  id = parseInt(id);

  let sql = `SELECT * FROM users WHERE id=${id}`;
  conn.query(sql, (err, rows, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }

    if (rows.length) {
      res.json(rows);
    } else {
      res.status(404).json({
        message: `${id}에 해당되는 유저가 없습니다.`,
      });
    }
  });
});

// 4. 회원 개별 탈퇴
router.delete("/users", (req, res) => {
  let { email } = req.body;

  let sql = `DELETE FROM users WHERE email=?`;
  conn.query(sql, email, (err, rows, fields) => {
    if (err instanceof Error) {
      console.log(err);
      return;
    }

    res.json({
      message: `${email}님이 탈퇴되었습니다.`,
    });
  });
});

module.exports = router;
