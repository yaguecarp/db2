const mysql = require("mysql2");

function mysqlClient() {
  const client = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tpo",
  });

  client.on("connect", () => {
    console.log("mySQL Connected.");
  });
}

module.exports = mysqlClient;
