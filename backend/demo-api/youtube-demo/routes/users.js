const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();
router.use(express.json());

const conn = require("../connection");
const { body, param, validationResult } = require("express-validator");

function validationError(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.array());
  }
  next();
}

// 1. 로그인
router.post(
  "/login",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("올바른 이메일을 입력해주세요"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("올바른 비밀번호를 입력하세요"),
    validationError,
  ],
  (req, res) => {
    let body = req.body;
    let email = body.email;
    let password = body.password;

    // 정보가 누락된 경우 예외 처리

    let sql = `SELECT * FROM users WHERE email=?`;
    conn.query(sql, email, (err, rows, fields) => {
      if (err instanceof Error) {
        console.log(err);
        return;
      }

      let loginUser = rows[0];
      if (loginUser) {
        if (loginUser.password == password) {
          // jwt 발급
          const token = jwt.sign(
            {
              email: loginUser.email,
              name: loginUser.name,
            },
            process.env.JWT_SIGN,
            {
              expiresIn: "30m",
              issuer: "minje",
            }
          );

          // 쿠키에 jwt 포함시킴
          res.cookie("token", token, { httpOnly: true });

          res.json({
            message: `${loginUser.name}님 환영합니다!`,
          });
        } else {
          res.json({
            message: "패스워드가 일치하지 않습니다",
          });
        }
      } else {
        res.status(403).json({
          message: `${email}에 해당되는 유저가 없습니다.`,
        });
      }
    });
  }
);

// 2. 회원가입
router.post(
  "/join",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("올바른 이메일을 입력해주세요"),
    body("password")
      .notEmpty()
      .isString()
      .withMessage("올바른 비밀번호를 입력해주세요"),
    body("name")
      .notEmpty()
      .isString()
      .withMessage("올바른 이름을 입력해주세요"),
    body("phone")
      .notEmpty()
      .isString()
      .withMessage("올바른 연락처를 입력해주세요"),
    validationError,
  ],
  (req, res) => {
    let body = req.body;
    let email = body.email;
    let password = body.password;
    let name = body.name;
    let phone = body.phone;

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
);

// 3. 회원 개별 조회
router.get(
  "/users/:id",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("올바른 이메일을 입력해주세요"),
    validationError,
  ],
  (req, res) => {
    let { email } = req.params;

    let sql = `SELECT * FROM users WHERE email=${email}`;
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
  }
);

// 4. 회원 개별 탈퇴
router.delete(
  "/users",
  [
    body("email")
      .notEmpty()
      .isEmail()
      .withMessage("올바른 이메일을 입력해주세요"),
    validationError,
  ],
  (req, res) => {
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
  }
);

module.exports = router;
