import express from "express";
import upload from "../config/multer.js";

import {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
  editBlog,
  BlogSinglePage,
  getRelatedBlog,
  getBlogByCategory,
  search,
  ShowAllBlogs,
} from "../controllers/Blog.controller.js";
import { Authenticate } from "../Middlewere/Authenticate.js";

const BlogRoute = express.Router();

BlogRoute.post("/add", Authenticate, upload.single("file"), createBlog);
BlogRoute.get("/getall", Authenticate, getAllBlogs);
BlogRoute.get("/getsingleblog/:id", BlogSinglePage);
BlogRoute.get("/get/:id", Authenticate, editBlog);
BlogRoute.put("/update/:id", Authenticate, upload.single("file"), updateBlog);
BlogRoute.delete("/delete/:id", Authenticate, deleteBlog);
BlogRoute.get("/get-related-blog/:category_id", getRelatedBlog);
BlogRoute.get("/get-blog-by-category/:slug", getBlogByCategory);
BlogRoute.get("/search", search);

//public route
BlogRoute.get("/blogs", ShowAllBlogs);

export default BlogRoute;
