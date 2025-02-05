const mariadb = require("mysql");

const conection = mariadb.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "Tennis",
});

module.exports = conection;
