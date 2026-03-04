import express from "express";
import { addFacility, getFacilitiesByHospital } from "../controllers/FacilityController.js";

const FacilityRouter = express.Router();

FacilityRouter.get("/", getFacilitiesByHospital);
FacilityRouter.post("/", addFacility);

export default FacilityRouter;