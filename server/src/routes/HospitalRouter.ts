import express from "express";
import { getHospitalById } from "../controllers/HospitalController.js";

export const HospitalRouter = express.Router();

HospitalRouter.get("/:hospitalId", getHospitalById);