const { faker } = require("@faker-js/faker");
const express = require("express");
const app = express();

app.get("/fake/users", (req, res) => {
  res.status(200).json({
    email: faker.internet.email(),
    password: faker.internet.password(),
    fullName: faker.person.fullName(),
    contact: faker.phone.number(),
  });
});

app.get("/fake/users/:userCount", (req, res) => {
  let { userCount } = req.params;
  userCount = parseInt(userCount);

  let rtnArr = [];
  while (userCount--) {
    let user = {
      email: faker.internet.email(),
      password: faker.internet.password(),
      fullName: faker.person.fullName(),
      contact: faker.phone.number(),
    };
    rtnArr.push(user);
  }
  res.status(200).json(rtnArr);
});

app.listen(3000);
