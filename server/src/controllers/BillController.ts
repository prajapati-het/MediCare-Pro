import {Bill} from "../models/Bill.js";
import { Request, Response } from "express";
import { Patient } from "../models/Patient.js";
import { sendBillWhatsapp } from "./sendBillWhatsapp.js";
import { Doctor } from "../models/Doctor.js";
import mongoose from "mongoose";


export const createBill = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      billId,        // ← passed from frontend when editing
      doctorId,
      patientId,
      doctorCode,
      medicines,
      consultationFee,
      labTestsFee,
      subtotal,
      tax,
      total,
      status,
      paymentMethod,
      notes,
    } = req.body;

    const patient = await Patient.findOne({ id: patientId });
    const doctor = await Doctor.findOne({ doctorCode });
    const doctorObjectId = new mongoose.Types.ObjectId(doctorId);

    // =========================
    // UPDATE — only if billId was explicitly passed
    // =========================
    if (billId) {
      const updated = await Bill.findByIdAndUpdate(
        billId,
        { medicines, consultationFee, labTestsFee, subtotal, tax, total, status, paymentMethod, notes },
        { new: true }
      );

      if (!updated) {
        res.status(404).json({ success: false, message: "Bill not found" });
        return;
      }

      // ── Only notify on Paid ──
      if (status === "Paid") {
        try {
          await sendBillWhatsapp(updated, patient, doctor);
        } catch (err) {
          console.log("WhatsApp failed (update)", err);
        }
      }

      res.status(200).json({ success: true, message: "Bill updated", data: updated });
      return;
    }

    // =========================
    // CREATE — no billId means brand-new bill
    // =========================
    console.log("CREATE branch");

    const year = new Date().getFullYear();
    const lastBill = await Bill.findOne({
      billNumber: { $regex: `BILL-${year}` },
    }).sort({ createdAt: -1 });

    let nextNumber = 1;
    if (lastBill) {
      const lastNumber = parseInt(lastBill.billNumber.split("-")[2]);
      nextNumber = lastNumber + 1;
    }

    const billNumber = `BILL-${year}-${String(nextNumber).padStart(4, "0")}`;

    const bill = await Bill.create({
      billNumber,
      doctorId: doctorObjectId,
      doctorCode,
      patientId,
      medicines,
      consultationFee,
      labTestsFee,
      subtotal,
      tax,
      total,
      status:        status        ?? "Pending",
      paymentMethod: paymentMethod ?? "Cash",
      notes,
    });

    console.log(bill)

    if (bill.status === "Paid") {
      console.log("whatsapp bill entering")
        try {
          await sendBillWhatsapp(bill, patient, doctor);
          console.log("whatsapp bill exiting......")
        } catch (err) {
          console.log("WhatsApp failed (create)", err);
        }
      }

    res.status(201).json({ success: true, message: "Bill created", data: bill });

  } catch (err) {
    console.log("[createBill ERROR]", err);
    res.status(500).json({ success: false, message: "Server error" });
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