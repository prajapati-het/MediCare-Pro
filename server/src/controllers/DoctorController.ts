import { Request, Response } from "express";
import mongoose from "mongoose";
import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { Hospital } from "../models/Hospital.js";

export const getDoctorPatients = async (req: Request, res: Response) => {
  try {
    const rawId = req.params.doctorId;
    const doctorId = Array.isArray(rawId) ? rawId[0] : rawId;
    if (doctorId === undefined || doctorId === null || doctorId === "") {
      return res.status(400).json({ message: "doctorId is required" });
    }

    const idStr = String(doctorId).trim();

    // Support both: numeric doctorCode (1, 2, 3) OR User ObjectId (24-char hex, e.g. 699abeacca0d14e8dbfdb53c)
    const numericCode = Number(idStr);
    const is24Hex = /^[a-fA-F0-9]{24}$/.test(idStr);
    let doctor =
      !Number.isNaN(numericCode)
        ? await Doctor.findOne({ doctorCode: numericCode })
        : null;
    if (!doctor && is24Hex) {
      doctor = await Doctor.findOne({ id: new mongoose.Types.ObjectId(idStr) });
    }

    if (!doctor) {
      return res.status(404).json({ message: "Doctor not found" });
    }

    const doctorCode = doctor.doctorCode;
    const patients = await Patient.find({ doctorCode }).lean();

    const normalized = (patients as unknown as Array<Record<string, unknown>>).map((p) => ({
      ...p,
      id: typeof p.id === "number" ? p.id : 0,
      doctorCode: String(doctorCode),
      doctorId: Number(p.doctorCode ?? doctorCode),
    }));

    return res.status(200).json({
      doctorCode: String(doctorCode),
      patients: normalized,
      totalPatients: normalized.length,
    });
  } catch (error) {
    console.error("getDoctorPatients error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const getDoctorDetailsController = async  (req: Request, res: Response) => {
  const { doctorId } = req.params;

  const doctor = await Doctor.findOne({id:doctorId});
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  res.json(doctor);
};


export const getDoctorsByHospital = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;
    console.log(hospitalId)

    const doctors = await Doctor.find({
      hospital: hospitalId,
    })

    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};