const express = require("express");
const app = express();

let youtuber1 = {
  channelTitle: "침착맨",
  sub: "274만명",
  videoNum: "7.4천개",
};

let youtuber2 = {
  channelTitle: "테오",
  sub: "124만명",
  videoNum: "1.2천개",
};

let youtuber3 = {
  channelTitle: "뜬뜬",
  sub: "253만명",
  videoNum: "292개",
};

let youtuberDb = new Map();

let id = 1;
youtuberDb.set(id++, youtuber1);
youtuberDb.set(id++, youtuber2);
youtuberDb.set(id++, youtuber3);

app.get("/youtuber/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  if (youtuberDb.get(id) == undefined) {
    res.json({ message: "모르는 유튜버입니다." });
  } else {
    var youtuber = youtuberDb.get(id);
    youtuber["id"] = id;

    res.json(youtuber);
  }
});

app.get("/youtubers", function (req, res) {
  res.json(youtuberDb);
});

app.use(express.json());
app.post("/youtuber", function (req, res) {
  youtuberDb.set(id, req.body);

  res.json({
    message: youtuberDb.get(id++).channelTitle + "님이 추가되었습니다.",
  });
});

app.listen(3000);
