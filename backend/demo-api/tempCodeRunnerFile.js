app.put("/youtuber/:id", function (req, res) {
  let { id } = req.params;
  id = parseInt(id);

  let youtuber = youtuberDb.get(id);
  if (youtuber == undefined) {
    res.json({
      message: `id ${id}에 해당되는 유튜버가 없습니다.`,
    });
  } else {
    let channelTitle = youtuber.channelTitle;
    youtuberDb.set(id, req.body);

    res.json({
      message: `${channelTitle}님의 정보가 수정되었습니다..`,
    });
  }
});