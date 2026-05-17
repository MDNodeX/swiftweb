import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserProfile,
  updateUser,
} from "../controllers/User.controller.js";
import upload from "../config/multer.js";
import { Authenticate } from "../Middlewere/Authenticate.js";

const UserRoute = express.Router();
UserRoute.use(Authenticate);
UserRoute.get("/get-user/:userId", getUserProfile);
UserRoute.put("/update-user/:userId", upload.single("file"), updateUser);
UserRoute.get("/get-all-user", getAllUser);
UserRoute.delete("/delete/:id", deleteUser);

export default UserRoute;
