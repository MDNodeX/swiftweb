// import mysql from 'mysql2/promise';

// //to connect to mysql server
// const mySqlDB = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'Anarul7861@',
//   database: 'swiftweb_db',
// });

// //to create database if not exists
// //we need to create table
// //perform crud operations on the database

// export { mySqlDB};

import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const mySqlDB = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
});

try {
  const connection = await mySqlDB.getConnection();
  console.log("✅ MySQL Connected");
  connection.release();
} catch (error) {
  console.error("❌ Database Error:", error.message);
}

export { mySqlDB };
export default mySqlDB;
