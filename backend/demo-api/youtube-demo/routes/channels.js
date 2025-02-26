const express = require("express");
const router = express.Router();
router.use(express.json());

const conn = require("../connection");

router
  .route("/")
  // 채널 전체 조회
  .get((req, res) => {
    var { userId } = req.body;
    var channels = [];

    if (!userId) {
      res.status(404).json({
        message: "userId가 포함되어있지 않습니다.",
      });
    } else {
      let sql = `SELECT * FROM channels WHERE user_id=?`;
      conn.query(sql, userId, (err, rows, fields) => {
        if (err instanceof Error) {
          console.log(err);
          return;
        }

        if (rows.length) {
          res.json({
            rows,
          });
        } else {
          res.status(404).json({
            message: "조회할 채널이 없습니다.",
          });
        }
      });
    }
  })
  // 채널 생성
  .post((req, res) => {
    let body = req.body;
    let channelTitle = body.channelTitle;
    let userId = body.userId;

    if (!userId) {
      res.status(400).json({
        message: "로그인이 필요합니다",
      });
    } else if (!channelTitle) {
      res.status(400).json({
        message: "channelTitle이 포함되어있지 않습니다.",
      });
    } else {
      let sql = `INSERT INTO channels (name, user_id) 
      VALUES (?, ?)`;
      conn.query(sql, [channelTitle, userId], (err, rows, fields) => {
        if (err.errno == 1452) {
          res.status(400).json({
            message: "존재하지 않는 user id입니다.",
          });
        } else if (err) {
          console.log(err);
          return;
        } else {
          res.status(201).json({
            message: `${channelTitle}님 환영합니다`,
          });
        }
      });
    }
  });

router
  .route("/:id")
  // 채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let sql = `SELECT * FROM channels WHERE id=?`;
    conn.query(sql, id, (err, rows, fields) => {
      if (err instanceof Error) {
        console.log(err);
        return;
      }

      let channel = rows[0];
      if (channel) {
        res.json({
          channel,
        });
      } else {
        res.status(404).json({
          message: "요청이 올바르지 않습니다.",
        });
      }
    });
  })
  // 채널 개별 수정
  .put((req, res) => {
    let { id } = req.params;
    id = parseInt(id);
    let newChannelTitle = req.body.channelTitle;

    let channel = channelDb.get(id);
    let oldChannelTitle = channel.channelTitle;

    if (channel) {
      channel.channelTitle = newChannelTitle;
      channelDb.set(id, channel);

      res.json({
        message: `${oldChannelTitle} 채널이 ${newChannelTitle} 채널로 수정되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "요청이 올바르지 않습니다.",
      });
    }
  })
  // 채널 개별 삭제
  .delete((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = channelDb.get(id);
    if (channel) {
      channelDb.delete(id);
      res.json({
        message: `${channel.channelTitle} 채널이 삭제되었습니다.`,
      });
    } else {
      res.status(404).json({
        message: "요청이 올바르지 않습니다.",
      });
    }
  });

module.exports = router;
