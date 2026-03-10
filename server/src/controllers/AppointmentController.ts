import { Request, Response } from "express";
import { Appointment, IAppointment } from "../models/Appointment.js";
import { Patient } from "../models/Patient.js";
import { Doctor } from "../models/Doctor.js";
import { QueryFilter } from "mongoose";

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


export const addAppointment = async (req: Request, res: Response) => {
  try {
    const { doctorCode, patientName, date, time } = req.body;

    if (!doctorCode || !patientName || !date || !time) {
      return res.status(400).json({ success: false, message: "Missing required fields" });
    }

    // Generate unique patientId and id
    const lastPatient = await Appointment.findOne({}).sort({ patientId: -1 }).exec();
    const patientId = lastPatient ? lastPatient.patientId + 1 : 1;

    const lastId = await Appointment.findOne({}).sort({ id: -1 }).exec();
    const id = lastId ? lastId.id + 1 : 1;

    const newAppointment = await Appointment.create({
      doctorCode,
      patientName,
      date,
      time,
      patientId,
      id,
    });

    return res.status(201).json({ success: true, data: newAppointment });
  } catch (error) {
    console.error("addAppointment error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};



// Update appointment status and log it to Patient table
export const updateAppointmentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status, reason } = req.body as { status: string; reason?: string };

    // 1️⃣ Build appointment update
    const filter: QueryFilter<IAppointment> = { id: Number(id) };
    const updateData: Partial<IAppointment> = { status };

    if (status.toLowerCase() === "cancelled" && reason) {
      updateData.cancelReason = reason;
    }

    // 2️⃣ Update appointment
    const appointment = await Appointment.findOneAndUpdate(filter, updateData, {
      returnDocument: "after",
    });

    if (!appointment) return res.status(404).json({ message: "Appointment not found" });

    // 3️⃣ Find doctor
    const doctor = await Doctor.findOne({ doctorCode: appointment.doctorCode });
    if (!doctor) throw new Error("Doctor not found");

    // 4️⃣ Update patient (always active)
    const patientEntry = await Patient.findOneAndUpdate(
      { id: appointment.patientId },
      {
        status: "Active",              // patient stays active
        doctorCode: appointment.doctorCode,
        name: appointment.patientName,
        lastVisit: appointment.date,
        doctorId: doctor.id,
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // 5️⃣ Respond
    return res.status(200).json({ appointment, patientEntry });
  } catch (error) {
    console.error("[updateAppointmentStatus]", error);
    return res.status(500).json({ message: "Server error" });
  }
};


export const updateAppointment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Appointment.findByIdAndUpdate(
      id,
      {
        $set: {
          ...req.body,
          status: "Rescheduled",
        },
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    const doctor = await Doctor.findOne({
      doctorCode: updated.doctorCode
    });

    if (!doctor) {
      throw new Error("Doctor not found");
    }

    // 2. Add entry to Patient table
    const patientEntry = await Patient.findOneAndUpdate(
      { id: updated.patientId },
      {
        status: "Active",
        doctorCode: updated.doctorCode,
        name: updated.patientName,
        lastVisit: updated.date,
        doctorId: doctor.id
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};