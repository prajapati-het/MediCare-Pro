import express from "express";
import { getDoctorDetailsController, getDoctorPatients } from "../controllers/DoctorController.js";

export const DoctorRouter = express.Router();



DoctorRouter.get("/:doctorId/patients", getDoctorPatients);
DoctorRouter.get("/:doctorId/details", getDoctorDetailsController);



