const express = require("express");
const router = express.Router();
router.use(express.json());

let channelDb = new Map();
var id = 1;

router
  .route("/")
  // 채널 전체 조회
  .get((req, res) => {
    if (channelDb.size) {
      var { userId } = req.body;
      if (userId == undefined) {
        res.status(404).json({
          message: "로그인이 필요합니다.",
        });
      } else {
        var channels = [];

        channelDb.forEach((val) => {
          if (val.userId == userId) {
            channels.push(val);
          }
        });

        if (channels.length) {
          res.json(channels);
        } else {
          res.status(404).json({
            message: "조회할 채널이 없습니다.",
          });
        }
      }
    } else {
      res.status(404).json({
        message: "조회할 채널이 없습니다.",
      });
    }
  })
  // 채널 생성
  .post((req, res) => {
    let channel = req.body;
    let userId = channel.userId;
    let channelTitle = channel.channelTitle;

    if (!userId) {
      res.status(400).json({
        message: "로그인이 필요합니다",
      });
    } else if (!channelTitle) {
      res.status(400).json({
        message: "channelTitle이 포함되어있지 않습니다.",
      });
    } else {
      channelDb.set(id++, req.body);
      res.status(201).json({
        message: `${channelTitle} 채널이 생성되었습니다.`,
      });
    }
  });

router
  .route("/:id")
  // 채널 개별 조회
  .get((req, res) => {
    let { id } = req.params;
    id = parseInt(id);

    let channel = channelDb.get(id);
    if (channel) {
      res.json({
        channelTitle: channel.channelTitle,
      });
    } else {
      res.status(404).json({
        message: "요청이 올바르지 않습니다.",
      });
    }
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
