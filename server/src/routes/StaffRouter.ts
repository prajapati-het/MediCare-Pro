import express from "express";
import { createStaff, deleteStaff, getAllStaff, getStaffById, updateStaff } from "../controllers/StaffController.js";


const StaffRouter = express.Router();

StaffRouter.get("/", getAllStaff);
StaffRouter.get("/:id", getStaffById);
StaffRouter.post("/", createStaff);
StaffRouter.put("/:id", updateStaff);
StaffRouter.delete("/:id", deleteStaff);

export default StaffRouter;