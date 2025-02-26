const mysql = require("mysql2");

require("dotenv").config();
console.log(process.env.MYSQL_PASSWORD);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "board",
  password: "", // 비밀번호 입력,
  dateStrings: true,
});

module.exports = connection;
