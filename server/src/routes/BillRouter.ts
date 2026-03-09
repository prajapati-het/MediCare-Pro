import express from "express";
import { createBill, getBillById, getBillsByDoctor, getBillsByPatient, updateBillStatus } from "../controllers/BillController.js";


const BillRouter = express.Router();

BillRouter.post("/create", createBill);
BillRouter.get("/:id", getBillById);
BillRouter.get("/doctor/:doctorCode", getBillsByDoctor);
BillRouter.get("/patient/:patientId", getBillsByPatient);
BillRouter.put("/:id/status", updateBillStatus);

export default BillRouter;