import { getUserDetails, googleSignin, login, logout } from "../controllers/UserController.js";
import express from "express";

export const UserAuthRouter = express.Router();

UserAuthRouter.post("/login", login);
UserAuthRouter.post("/googleSignin", googleSignin);
UserAuthRouter.get("/user-details",getUserDetails);
UserAuthRouter.post("/logout", logout);