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

export const mySqlDB = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

