import {Bill} from "../models/Bill.js";
import { Request, Response } from "express";



export const createBill = async (req: Request, res: Response): Promise<void> => {
  try {
    // get current year
    const year = new Date().getFullYear();

    // find last bill of this year
    const lastBill = await Bill.findOne({
      billNumber: { $regex: `BILL-${year}` },
    }).sort({ createdAt: -1 });

    let nextNumber = 1;

    if (lastBill) {
      const lastNumber = parseInt(
        lastBill.billNumber.split("-")[2]
      );

      nextNumber = lastNumber + 1;
    }

    const billNumber = `BILL-${year}-${String(
      nextNumber
    ).padStart(4, "0")}`;

    const bill = await Bill.create({
      ...req.body,
      billNumber,
    });

    res.status(201).json({
      success: true,
      data: bill,
    });

  } catch (err) {
    console.log("[createBill]", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET BILL BY ID
export const getBillById = async (req: Request, res: Response) => {
  try {
    const bill = await Bill.findById(req.params.id);

    if (!bill)
      return res.status(404).json({ message: "Bill not found" });

    res.json(bill);
  } catch (err) {
    console.log("[getBillById]", err);
    res.status(500).json({ message: "Server error" });
  }
};


// GET BILLS BY DOCTOR
export const getBillsByDoctor = async (req: Request, res: Response) => {
  try {
    const doctorCode = Number(req.params.doctorCode);

    const bills = await Bill.find({
      doctorCode: doctorCode,
    });

    res.json(bills);
  } catch (err) {
    console.log("[getBillsByDoctor]", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET BILLS BY PATIENT
export const getBillsByPatient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const patientId = Number(req.params.patientId);

    const bills = await Bill.find({
      patientId: patientId,
    });

    console.log(bills);

    res.json(bills);
  } catch (err) {
    console.log("[getBillsByPatient]", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE STATUS
export const updateBillStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { returnDocument: "after" }
    );

    res.json(bill);
  } catch (err) {
    console.log("[updateBillStatus]", err);
    res.status(500).json({ message: "Server error" });
  }
};