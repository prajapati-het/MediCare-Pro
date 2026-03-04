import { Request, Response } from "express";
import mongoose from "mongoose";
import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { Hospital } from "../models/Hospital.js";

export const getDoctorPatients = async (req: Request, res: Response) => {
  try {
    const rawId = req.params.doctorId;
    console.log("Raw ID : ", rawId);
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
      // doctor = await Doctor.findOne({ id: new mongoose.Types.ObjectId(idStr) });
      doctor = await Doctor.findOne({ id: idStr });
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
  try{
    const { doctorId } = req.params;
    console.log(doctorId)

    const doctor = await Doctor.findOne({id:doctorId});
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);

  }catch (error) {
    console.error("getDoctorDetails error:", error);
    res.status(500).json({ message: "Server error" });
  }
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



export const addDoctor = async (req: Request, res: Response) => {
  console.log("Entering in addDoctor")
  try {
    const {
      username,
      email,
      hospital,
      speciality,
      phone,
      experience,
      consultationFee,
      education,
      licenseNumber,
      availableDays,
    } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) {
      return res.status(400).json({
        message: "Doctor already exists with this email",
      });
    }



    const doctorCode = Math.floor(100000 + Math.random() * 900000);

    console.log(doctorCode)

    const doctor = await Doctor.create({
      id: new mongoose.Types.ObjectId(),
      doctorCode,
      username,
      email,
      hospital: hospital || "",
      speciality: speciality || "",
      phone: phone || "",
      experience: experience || "",
      consultationFee: Number(consultationFee) || 0,
      education: education || "",
      licenseNumber: licenseNumber || "",
      availableDays: Array.isArray(availableDays) ? availableDays : [],
      nextAvailable:
        Array.isArray(availableDays) && availableDays.length > 0
          ? availableDays[0]
          : "",
    });

    console.log(doctor)

    console.log("Body:", req.body);
console.log("availableDays:", availableDays);

    res.status(201).json({
      message: "Doctor added successfully",
      doctor,
    });
  } catch (error: any) {
  console.log("FULL ERROR ↓↓↓");
  console.log(error);
  console.log(error.message);
  console.log(error.errors);
  
  res.status(500).json({
    message: "Server error",
    error: error.message,
  });
  }
};



export const getDoctors = async (req: Request, res: Response) => {
  try {
    const { search } = req.query;

    let filter = {};
    if (search) {
      const regex = new RegExp(search.toString(), "i");
      filter = { $or: [{ name: regex }, { specialty: regex }] };
    }

    const doctors = await Doctor.find(filter).sort({ name: 1 });

    return res.status(200).json({ success: true, data: doctors });
  } catch (error) {
    console.error("getDoctors error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};