import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
// import nodemailer from "nodemailer";
import { mySqlDB } from "./config/db.js";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.route.js";
import LikeRoute from "./routes/Like.route.js";
import ContactRoute from "./routes/Contact.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;




const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173",
  "https://swiftweb-9i1d1t3j9-anarul-islam-s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

//routes
app.use("/backend/auth", AuthRoute);
app.use("/backend/user", UserRoute);
app.use("/backend/category", CategoryRoute);
app.use("/backend/blog", BlogRoute);
app.use("/backend/comment", CommentRoute);
app.use("/backend/blog-like", LikeRoute);
app.use("/backend/contact", ContactRoute);

app.get("/", (req, res) => {
  res.send("Backend running");
});

// Ensure the database exists before attempting a pooled connection
try {
  const initConn = await (await import("mysql2/promise")).createConnection({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    port: process.env.MYSQLPORT,
  });
  await initConn.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.MYSQLDATABASE || "demodb"}\`;`
  );
  await initConn.end();
  console.log("Database ensured successfully");
} catch (error) {
  console.error("Failed to ensure database exists:", error);
  process.exit(1);
}

await mySqlDB
  .query("SELECT 1")
  .then(async () => {
    console.log("Database connected successfully");

    // Run schema initialisation — creates tables if they don't exist yet
    try {
      const sqlPath = path.join(__dirname, "database", "init.sql");
      const sql = fs.readFileSync(sqlPath, "utf8");

      // Split on statement boundaries (semicolons) and execute each one
      const statements = sql
        .split(";")
        .map((s) => s.trim())
        .filter((s) => s.length > 0 && !s.startsWith("--"));

      for (const statement of statements) {
        await mySqlDB.query(statement);
      }
      console.log("Database schema initialised successfully");
    } catch (error) {
      console.error("Failed to initialise database schema:", error);
      process.exit(1);
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database connection failed:", error);
  });

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
