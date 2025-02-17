const express = require("express");
const app = express();
const port = 3000;

const people = [];
people.push("Tom");

// GET
app.get("/get-people", function (req, res) {
  res.send(people);
});

// POST
app.use(express.json());
app.post("/add-person", function (req, res) {
  const name = req.body.name;
  people.push(name);
  res.send(`Add name ${name}!`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
