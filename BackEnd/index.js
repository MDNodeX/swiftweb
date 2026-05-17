import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
// import nodemailer from "nodemailer";
import { mySqlDB } from "./config/db.js";
import AuthRoute from "./routes/Auth.route.js";
import UserRoute from "./routes/User.route.js";
import CategoryRoute from "./routes/Category.route.js";
import BlogRoute from "./routes/Blog.route.js";
import CommentRoute from "./routes/Comment.route.js";
import LikeRoute from "./routes/Like.route.js";
import ContactRoute from "./routes/Contact.route.js";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  // cors({
  //   origin: process.env.FRONTEND_URL,
  //   credentials: true,
  // }),
  cors({
    origin: process.env.FRONTEND_URL,
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

await mySqlDB
  .query("SELECT 1")
  .then(() => {
    console.log("Database connected successfully");
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
