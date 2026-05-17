import mysql from "mysql2/promise";

//to connect to mysql server
const mySqlDB = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Anarul7861@",
  database: "swiftweb_db",
});

//to create database if not exists
//we need to create table
//perform crud operations on the database

export { mySqlDB };
