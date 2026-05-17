import express from "express";
import {
  createComment,
  deleteComment,
  getAllComment,
  getCommentCount,
  getCommentsByBlog,
  showAllComment,
} from "../controllers/Comment.controller.js";
import { Authenticate } from "../Middlewere/Authenticate.js";

const CommentRoute = express.Router();
CommentRoute.post("/add", Authenticate, createComment);
CommentRoute.get("/get/:blog_id", getCommentsByBlog);
CommentRoute.get("/get-count/:blog_id", getCommentCount);
CommentRoute.get("/get-all-comment", Authenticate, getAllComment);
CommentRoute.delete("/delete/:id", Authenticate, deleteComment);

//admin comment
CommentRoute.get("/get-all-comment", showAllComment);

export default CommentRoute;
