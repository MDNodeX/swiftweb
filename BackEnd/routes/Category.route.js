import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
} from "../controllers/Category.controller.js";
import { OnlyAdmin } from "../Middlewere/onlyadmin.js";
const CategoryRoute = express.Router();
CategoryRoute.post("/add", OnlyAdmin, createCategory);
CategoryRoute.put("/update/:category_id", OnlyAdmin, updateCategory);
CategoryRoute.get("/show/:category_id", OnlyAdmin, getSingleCategory);
CategoryRoute.delete("/delete/:category_id", OnlyAdmin, deleteCategory);
CategoryRoute.get("/getall", getAllCategories);

export default CategoryRoute;
