import express from "express";
import { addProblem, getProblemsByHospital } from "../controllers/ProblemController.js";

const ProblemRouter = express.Router();

ProblemRouter.get("/", getProblemsByHospital);
ProblemRouter.post("/", addProblem);

export default ProblemRouter;