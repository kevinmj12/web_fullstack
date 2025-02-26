const mysql = require("mysql2");

require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "youtube",
  password: process.env.MYSQL_PASSWORD,
  dateStrings: true,
});

module.exports = connection;
