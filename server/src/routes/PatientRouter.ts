import express from "express";
import { getPatients, getPatientById, updatePatient } from "../controllers/PatientController.js";

export const PatientRouter = express.Router();

PatientRouter.get("/", getPatients);
PatientRouter.get("/:id", getPatientById);
PatientRouter.patch("/:id", updatePatient);