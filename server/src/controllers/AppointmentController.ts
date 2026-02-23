import { Request, Response } from "express";
import { Appointment, IAppointment } from "../models/Appointment.js";
import { Patient } from "../models/Patient.js";

// -------------------- Get appointments for a specific day --------------------
export const getTodayAppointments = async (req: Request, res: Response) => {
  try {
    const { doctorCode, date } = req.params;

    console.log(doctorCode, date);

    if (!doctorCode || !date) {
      return res.status(400).json({ message: "doctorCode and date are required" });
    }

    // Convert doctorCode to number
    const doctorCodeNum = Number(doctorCode);

    if (isNaN(doctorCodeNum)) {
      return res.status(400).json({ message: "Invalid doctorCode" });
    }

    // Find appointments for that doctor and exact date
    const appointments: IAppointment[] = await Appointment.find({
      doctorCode: doctorCodeNum,
      date, // matches "YYYY-MM-DD" format
    }).sort({ time: 1 }); // optional: sort by time

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching today appointments:", err);
    res.status(500).json({ message: "Server error fetching today appointments" });
  }
};

// -------------------- Get appointments for a specific month --------------------
export const getMonthlyAppointments = async (req: Request, res: Response) => {
  try {
    console.log("req.params:", req.params);
    const { doctorCode } = req.params;

    console.log(doctorCode);

    // Get yearMonth safely from params
    const yearMonthRaw = Array.isArray(req.params.yearMonth)
      ? req.params.yearMonth[0]
      : req.params.yearMonth;

    console.log(yearMonthRaw)

    if (!doctorCode || !yearMonthRaw) {
      return res
        .status(400)
        .json({ message: "doctorCode and yearMonth are required" });
    }

    // Convert doctorCode to number
    const doctorCodeNum = Number(doctorCode);
    if (isNaN(doctorCodeNum)) {
      return res.status(400).json({ message: "Invalid doctorCode" });
    }

    const [year, month] = yearMonthRaw.split("-").map(Number);

    // Regex for all dates in the month: YYYY-MM-XX
    const monthStr = month.toString().padStart(2, "0");
    const regex = new RegExp(`^${year}-${monthStr}-`);

    // Find all appointments for that doctor and month
    const appointments: IAppointment[] = await Appointment.find({
      doctorCode: doctorCodeNum,
      date: { $regex: regex },
    }).sort({ date: 1, time: 1 }); // optional: sort by date & time

    res.json(appointments);
  } catch (err) {
    console.error("Error fetching monthly appointments:", err);
    res
      .status(500)
      .json({ message: "Server error fetching monthly appointments" });
  }
};


export const getAllAppointments = async (req: Request, res: Response) => {
  try {
    const appointments: IAppointment[] = await Appointment.find().sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    console.error("Error fetching all appointments:", err);
    res.status(500).json({ message: "Server error fetching appointments" });
  }
};


// GET /appointments/doctor/:doctorCode/with-patients
export const getAppointmentsWithPatientInfo = async (req: Request, res: Response) => {
  try {
    const { doctorCode } = req.params;
    if (!doctorCode) return res.status(400).json({ message: "doctorCode required" });

    const doctorCodeNum = Number(doctorCode);

    // Fetch appointments
    const appointments = await Appointment.find({ doctorCode: doctorCodeNum }).sort({ date: 1, time: 1 });

    // Fetch all patients referenced in appointments
    const patientIds = appointments.map(a => a.patientId);
    const patients = await Patient.find({ id: { $in: patientIds } });

    const patientMap = new Map(patients.map(p => [p.id, p]));

    // Combine appointment + patient info
    const result = appointments.map(apt => {
      const patient = patientMap.get(apt.patientId);
      return {
        ...apt.toObject(),
        patientName: patient?.name ?? "—",
        condition: patient?.condition ?? "—",
        age: patient?.age ?? "—",
        height: patient?.vitals?.height ?? "—",
        weight: patient?.vitals?.weight ?? "—",
        contact: patient?.phone ?? "—",
        email: patient?.email ?? "—",
        tag: patient?.tag ?? "_",
      };
    });

    res.json(result);
  } catch (err) {
    console.error("Error fetching appointments with patients:", err);
    res.status(500).json({ message: "Server error" });
  }
};