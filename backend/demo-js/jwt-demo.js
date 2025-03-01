require("dotenv").config();

const JWT_SIGN = process.env.JWT_SIGN;

var jwt = require("jsonwebtoken");
var token = jwt.sign({ foo: "bar" }, JWT_SIGN, {
  expiresIn: "30m",
  issuer: "minje",
});

console.log(token);

var decoded = jwt.verify(token, JWT_SIGN);
console.log(decoded);
