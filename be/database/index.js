const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "mysql123",
  database: "temporary_parcel",
  port: 3306,
  multipleStatements: true,
});

db.connect((err) => {
  console.log("db masuk");
  if (err) {
    return console.log(`error : ${err.message}`);
  }
  console.log(`Connected to MySQL Server`);
});

module.exports = { db };
