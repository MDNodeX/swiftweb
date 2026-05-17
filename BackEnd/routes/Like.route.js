import express from "express";
import { doLike, likeCount } from "../controllers/Like.controller.js";
import { Authenticate } from "../Middlewere/Authenticate.js";

const LikeRoute = express.Router();

LikeRoute.post("/toggle", Authenticate, doLike);
LikeRoute.get("/get-like/:blog_id/:user_id", likeCount);

export default LikeRoute;
