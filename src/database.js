const mysql = require("mysql");
const mysqlConnection = mysql.createConnection({
  host:"3.140.176.65",
  user:"admin",
  password:"IGDS_2021",
  port:"3309",
  database:"empleados",
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.log(err);
    return;
  } else {
    console.log("DB is connected");
  }
});

module.exports = mysqlConnection;
