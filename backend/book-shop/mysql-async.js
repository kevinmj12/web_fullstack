const mysql = require("mysql2/promise");
require("dotenv").config();

const connection = async () => {
  return await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.MYSQL_PASSWORD,
    database: "bookshop",
    dateStrings: true,
  });
};

module.exports = connection;
