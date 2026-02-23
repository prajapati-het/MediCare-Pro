import { Request, Response } from "express";
import { Patient } from "../models/Patient.js"; // adjust path if needed

// Get all patients
export const getPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find().sort({ patientName: 1 }); // optional: sorted by name
    res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ message: "Server error fetching patients" });
  }
};

// Get single patient by ID
export const getPatientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Patient ID is required" });
    }

    const patient = await Patient.findOne({ id: Number(id) }); // assuming id is a number

    if (!patient) {
      return res.status(404).json({ message: "Patient not found" });
    }

    res.json(patient);
  } catch (err) {
    console.error("Error fetching patient by ID:", err);
    res.status(500).json({ message: "Server error fetching patient" });
  }
};