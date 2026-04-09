import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Patient } from '../models/Patient.js';
import { Appointment, IAppointment } from '../models/Appointment.js';
import { Doctor } from '../models/Doctor.js';
import { Staff } from '../models/Staff.js';
import { Hospital } from '../models/Hospital.js';
import type { QueryFilter } from 'mongoose';

// ─── Typed appointment filter ─────────────────────────────────────────────────
// date is stored as "YYYY-MM-DD" string — ISO strings sort lexicographically
// so $gte / $lte on strings works correctly for date range queries.
function apptFilter(
  codes: number[],
  startDateStr: string,
  endDateStr: string,
  statuses: string[],
): QueryFilter<IAppointment> {
  return {
    doctorCode: { $in: codes },
    date:       { $gte: startDateStr, $lte: endDateStr },
    status:     { $in: statuses },
  };
}

// ─── Controller ───────────────────────────────────────────────────────────────
export const getAdminStats = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;

    if (!hospitalId) {
      return res.status(400).json({ message: 'Hospital ID is required' });
    }

    // ── 1. Hospital ──────────────────────────────────────────────────────────
    const hospital = await Hospital.findOne({ hospitalId }).lean();
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    }
    const hospitalName: string = hospital.name;

    // ── 2. Doctors for this hospital ─────────────────────────────────────────
    const hospitalDoctors = await Doctor.find({ hospital: hospitalName })
      .select('doctorCode speciality status username picture')
      .lean();

    const doctorCodes = hospitalDoctors.map(d => d.doctorCode); // number[]

  


    // ── 3. Date helpers ───────────────────────────────────────────────────────
    const now      = new Date();
    const todayStr = now.toISOString().split('T')[0]; // "2026-03-10"

    console.log("todayStr:", todayStr);

    // String boundaries for Appointment.date (stored as "YYYY-MM-DD" string)
    const todayStart = todayStr; // $gte
    const todayEnd   = todayStr; // $lte  (same day = exact day match)

    // Real Date objects for Patient.createdAt (Mongoose timestamps → ISODate)
    const startOfDay = new Date(`${todayStr}T00:00:00.000Z`);
    const endOfDay   = new Date(`${todayStr}T23:59:59.999Z`);

    const ACTIVE_STATUSES   = ['Pending', 'Confirmed', 'Delayed', 'Rescheduled'];
    const INACTIVE_STATUSES = ['Cancelled', 'Completed'];

    // ── 4. Top-level KPI counts ───────────────────────────────────────────────
    const [
      totalDoctors,
      totalStaff,
      totalPatients,
      occupiedBeds,
      criticalPatients,
      staffOnDuty,
      todayAppointmentsCount,
    ] = await Promise.all([
      Doctor.countDocuments({ hospital: hospitalName }),
      Staff.countDocuments({ hospital: hospitalName }),
      Patient.countDocuments({ doctorCode: { $in: doctorCodes } }),
      Patient.countDocuments({
        doctorCode: { $in: doctorCodes },
        status: { $regex: /^admitted$/i },
      }),
      Patient.countDocuments({
        doctorCode: { $in: doctorCodes },
        $or: [
          { status: { $regex: /^critical$/i } },
          { tag:    { $regex: /^critical$/i } },
        ],
      }),
      Staff.countDocuments({ hospital: hospitalName, status: 'on-duty' }),
      Appointment.countDocuments(
        apptFilter(doctorCodes, todayStart, todayEnd, ACTIVE_STATUSES)
      ),
    ]);

    // ── 5. Weekly stats — last 7 days ─────────────────────────────────────────
    const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const baseDay   = new Date();
    baseDay.setHours(0, 0, 0, 0);

    const weeklyStatsRaw = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const day     = new Date(baseDay);
        day.setDate(baseDay.getDate() - i);
        const dateStr = day.toISOString().split('T')[0];

        // Patient.createdAt is a real ISODate → use Date objects
        const dayStart = new Date(`${dateStr}T00:00:00.000Z`);
        const dayEnd   = new Date(`${dateStr}T23:59:59.999Z`);

        const [patientsCount, appointmentsCount] = await Promise.all([
          Patient.countDocuments({
            doctorCode: { $in: doctorCodes },
            createdAt:  { $gte: dayStart, $lte: dayEnd },
          }),
          // Appointment.date is a string → use string comparison
          Appointment.countDocuments(
            apptFilter(doctorCodes, dateStr, dateStr, ACTIVE_STATUSES)
          ),
        ]);

        return {
          name:         DAY_NAMES[day.getDay()],
          patients:     patientsCount,
          appointments: appointmentsCount,
        };
      })
    );
    // Reverse so index 0 = 6 days ago, index 6 = today
    const weeklyStats = weeklyStatsRaw.reverse();

    // ── 6. Patient status breakdown ───────────────────────────────────────────
    const statusStats: { name: string; value: number }[] = await Patient.aggregate([
      { $match: { doctorCode: { $in: doctorCodes } } },
      { $group: { _id: { $toLower: '$status' }, value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } },
      { $sort: { value: -1 } },
    ]);

    // ── 7. Doctor status breakdown ────────────────────────────────────────────
    const doctorStatusStats: { status: string; count: number }[] = await Doctor.aggregate([
      { $match: { hospital: hospitalName } },
      { $group: { _id: { $toLower: '$status' }, count: { $sum: 1 } } },
      { $project: { status: '$_id', count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    // ── 8. Upcoming appointments (next 5, from today onwards) ─────────────────
    const upcomingRaw = await Appointment.find({
      doctorCode: { $in: doctorCodes },
      date:       { $gte: todayStr },          // open-ended future, string compare
      status:     { $nin: INACTIVE_STATUSES },
    } as mongoose.QueryFilter<IAppointment>)
      .sort({ date: 1, time: 1 })
      .limit(5)
      .lean();

    const upcomingAppointments = upcomingRaw.map(apt => ({
      patient: apt.patientName,
      time:    apt.time,
      date:    apt.date,
      type:    apt.type  ?? '—',
      status:  apt.status,
      room:    apt.room  ?? '—',
    }));

    // ── 9. Today's appointment list (hospital-wide, up to 10) ─────────────────
    const doctorMap: Record<number, { name: string; speciality: string }> = {};
    hospitalDoctors.forEach(d => {
      doctorMap[d.doctorCode] = {
        name:       d.username   ?? 'Unknown',
        speciality: d.speciality ?? '—',
      };
    });

    const todayRaw = await Appointment.find(
      apptFilter(doctorCodes, todayStart, todayEnd, ACTIVE_STATUSES)
    )
      .sort({ time: 1 })
      .limit(10)
      .lean();

    const appointmentsToday = todayRaw.map(apt => ({
      patient:    apt.patientName,
      time:       apt.time,
      department: doctorMap[apt.doctorCode]?.speciality ?? '—',
      doctor:     doctorMap[apt.doctorCode]?.name       ?? '—',
      status:     apt.status,
      type:       apt.type ?? '—',
    }));


    // ── 10. Department-wise stats ─────────────────────────────────────────────
    const uniqueSpecialities = [
      ...new Set(hospitalDoctors.map(d => d.speciality).filter(Boolean)),
    ];

    const departmentStats = await Promise.all(
      uniqueSpecialities.map(async dept => {
        const deptDoctors     = hospitalDoctors.filter(d => d.speciality === dept);
        const deptDoctorCodes = deptDoctors.map(d => d.doctorCode);

        const [patients, apptToday, deptOccupiedBeds] = await Promise.all([
          Patient.countDocuments({ doctorCode: { $in: deptDoctorCodes } }),
          Appointment.countDocuments(
            apptFilter(deptDoctorCodes, todayStart, todayEnd, ACTIVE_STATUSES)
          ),
          Patient.countDocuments({
            doctorCode: { $in: deptDoctorCodes },
            status: { $regex: /^admitted$/i },
          }),
        ]);

        

        return {
          department:        dept,
          doctors:           deptDoctors.length,
          patients,
          appointmentsToday: apptToday,
          occupiedBeds:      deptOccupiedBeds,
        };
      })
    );

    console.log("TotalPatients : ",       totalPatients)

    // ── 11. Response ──────────────────────────────────────────────────────────
    return res.json({
      hospitalId,
      hospitalName,

      totalDoctors,
      totalStaff,
      totalPatients,
      occupiedBeds,
      criticalPatients,
      staffOnDuty,
      todayAppointments: todayAppointmentsCount,

      weeklyStats,
      statusStats,
      doctorStatusStats,
      upcomingAppointments,
      appointmentsToday,
      departmentStats,
    });

  } catch (err) {
    console.error('[getAdminStats]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};