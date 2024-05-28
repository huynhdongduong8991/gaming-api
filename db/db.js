require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  port: 3306,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const run = () => {
  connection.connect((err) => {
    if (err) {
      console.error("Error connecting to MySQL:", err);
      return;
    }
    console.log("Connected to MySQL database");
  });
};

const getDB = () => {
  return connection;
};

module.exports = { run, getDB };
