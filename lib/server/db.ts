import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
});

con.connect(function (err: string) {
  if (err) throw err;
  console.log("Connected!");
});

export default con;
