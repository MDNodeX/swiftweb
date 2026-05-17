import express from "express";
import {
  GoolgleLogin,
  Login,
  Logout,
  Register,
} from "../controllers/Auth.controller.js";

const AuthRoute = express.Router();

AuthRoute.post("/register", Register);
AuthRoute.post("/login", Login);
AuthRoute.post("/google-login", GoolgleLogin);
AuthRoute.get("/logout", Logout);

export default AuthRoute;
