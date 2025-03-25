const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
require("dotenv").config();

app.listen(3000);

app.get("/", (req, res) => {
  const token = jwt.sign({ foo: "bar" }, process.env.PRIVATE_KEY);
  res.cookie("jwt", token, {
    httpOnly: true,
  });
  res.send("토큰 발행 완료");
});

app.get("/decode", (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.PRIVATE_KEY);

  res.send(decoded);
});
