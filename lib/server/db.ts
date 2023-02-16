import mysql from "mysql";

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "guestbook",
  charset: "utf8mb4",
  debug: false,
});

// con.connect(function (err: string) {
//   if (err) throw err;
//   console.log("Connected!");
// });

export default con;
