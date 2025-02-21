.get((req, res) => {
    var channels = [];
    channelDb.forEach((val) => {
      channels.push(val);
    });

    if (channels.length) {
      res.json(channels);
    } else {
      res.status(404).json({
        message: "조회할 채널이 없습니다.",
      });
    }
  })