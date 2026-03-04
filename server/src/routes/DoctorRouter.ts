import express from "express";
import { addDoctor, getDoctorDetailsController, getDoctorPatients, getDoctors, getDoctorsByHospital } from "../controllers/DoctorController.js";

export const DoctorRouter = express.Router();



DoctorRouter.get("/:doctorId/patients", getDoctorPatients);
DoctorRouter.get("/:doctorId/details", getDoctorDetailsController);
DoctorRouter.get("/hospitals/:hospitalId", getDoctorsByHospital);
DoctorRouter.get("/doctors", getDoctors);
DoctorRouter.post("/add", addDoctor);


