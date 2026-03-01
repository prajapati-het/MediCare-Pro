import express from "express";
import { getDoctorDetailsController, getDoctorPatients, getDoctorsByHospital } from "../controllers/DoctorController.js";

export const DoctorRouter = express.Router();



DoctorRouter.get("/:doctorId/patients", getDoctorPatients);
DoctorRouter.get("/:doctorId/details", getDoctorDetailsController);
DoctorRouter.get("/hospitals/:hospitalId", getDoctorsByHospital);


