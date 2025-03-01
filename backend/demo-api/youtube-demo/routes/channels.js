const express = require("express");
const router = express.Router();
router.use(express.json());

const conn = require("../connection");
const { body, param, validationResult } = require("express-validator");

function validationError(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json(result.array());
  }
  return next();
}

function notFoundChannel(res) {
  res.status(404).json({
    message: "채널 정보를 찾을 수 없습니다.",
  });
}

router
  .route("/")
  // 채널 전체 조회
  .get([body("userId").notEmpty().isInt(), validationError], (req, res) => {
    var { userId } = req.body;

    let sql = `SELECT * FROM channels WHERE user_id=?`;
    conn.query(sql, userId, (err, rows, fields) => {
      if (err instanceof Error) {
        res.status(400).json({
          message: `err: ${err}`,
        });
      } else if (rows.length) {
        res.json({
          rows,
        });
      } else {
        notFoundChannel(res);
      }
    });
  })
  // 채널 생성
  .post(
    [
      body("userId").notEmpty().isInt().withMessage("숫자 입력 필요"),
      body("name").notEmpty().isString().withMessage("문자 입력 필요"),
      validationError,
    ],
    (req, res) => {
      const { name, userId } = req.body;

      let sql = `INSERT INTO channels (name, user_id) 
      VALUES (?, ?)`;
      conn.query(sql, [name, userId], (err, rows, fields) => {
        if (err.errno == 1452) {
          res.status(400).json({
            message: "존재하지 않는 user id입니다.",
          });
        } else if (err) {
          res.status(400).json({
            message: `err: ${err}`,
          });
        } else {
          res.status(201).json({
            message: `${name}님 환영합니다`,
          });
        }
      });
    }
  );

router
  .route("/:id")
  // 채널 개별 조회
  .get([param("id").notEmpty(), validationError], (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let sql = `SELECT * FROM channels WHERE id=?`;
    conn.query(sql, id, (err, rows, fields) => {
      if (err) {
        return res.status(400).json({
          message: `err: ${err}`,
        });
      }

      let channel = rows[0];
      if (channel) {
        res.json({
          channel,
        });
      } else {
        notFoundChannel(res);
      }
    });
  })
  // 채널 개별 수정
  .put(
    [
      param("id").notEmpty(),
      body("name").notEmpty().isString(),
      validationError,
    ],
    (req, res) => {
      let { id } = req.params;
      id = parseInt(id);
      let { name } = req.body;

      let sql = `UPDATE channels SET name=? WHERE id=?`;
      let values = [name, id];
      conn.query(sql, values, (err, rows, fields) => {
        if (err) {
          return res.status(400).json({
            message: `err: ${err}`,
          });
        }
        if (rows.affectedRows) {
          res.json({
            message: "채널 이름 수정이 완료되었습니다.",
          });
        } else {
          notFoundChannel(res);
        }
      });
    }
  )
  // 채널 개별 삭제
  .delete([param("id").notEmpty(), validationError], (req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let sql = `DELETE FROM channels WHERE id=?`;
    conn.query(sql, id, (err, rows, fields) => {
      if (err) {
        return res.status(400).json({
          message: `err: ${err}`,
        });
      }
      if (rows.affectedRows) {
        res.json({
          message: "채널 삭제가 완료되었습니다.",
        });
      } else {
        notFoundChannel(res);
      }
    });
  });

module.exports = router;
