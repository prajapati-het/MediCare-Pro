import express from "express";
import { getAdminDetails } from "../controllers/AdminController.js";

export const AdminRouter = express.Router();

AdminRouter.get("/:adminId/details", getAdminDetails);