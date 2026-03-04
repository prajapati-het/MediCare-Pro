import { Request, Response } from 'express';
import { Patient } from '../models/Patient.js';
import { Appointment } from '../models/Appointment.js';
import { Doctor } from '../models/Doctor.js';


// Return all dashboard stats for a doctor
export const getDoctorStats = async (req: Request, res: Response) => {

  try {
    const { doctorId } = req.params;

    if (!doctorId) {
      return res.status(400).json({ message: 'Doctor ID is required' });
    }

    // ── 1. Resolve numeric doctorCode from the Doctor document ───────────────
    const doctorDoc = await Doctor.findOne({id:doctorId}).select('doctorCode').lean();
    if (!doctorDoc) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    const doctorCode: number = doctorDoc.doctorCode;

    // ── 2. Total patients for this doctor ─────────────────────────────────────
    const totalPatients = await Patient.countDocuments({ doctorCode: doctorCode });



    // ── 3. Today's appointments ───────────────────────────────────────────────
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(now);
    endOfDay.setHours(23, 59, 59, 999);

    const todayAppointments = await Appointment.countDocuments({
      doctorCode,
      date: { $gte: startOfDay.toISOString(), $lte: endOfDay.toISOString() },
    });




    // ── 4. Weekly overview (last 7 days, oldest → newest) ────────────────────
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const weeklyStats = await Promise.all(
      Array.from({ length: 7 }).map(async (_, i) => {
        const day = new Date();
        day.setDate(day.getDate() - i);

        const start = new Date(day);
        start.setHours(0, 0, 0, 0);
        const end = new Date(day);
        end.setHours(23, 59, 59, 999);

        const [patientsCount, appointmentsCount, admissionsCount] = await Promise.all([
          Patient.countDocuments({
            doctorCode: doctorCode,
            createdAt: { $gte: start, $lte: end },
          }),
          Appointment.countDocuments({
            doctorCode,                                    // ← numeric code, never NaN
            date: { $gte: start.toISOString(), $lte: end.toISOString() },
          }),
          Patient.countDocuments({
            doctorCode: doctorCode,
            admittedAt: { $gte: start, $lte: end },
          }),
        ]);




        return {
          name: daysOfWeek[day.getDay()],
          patients: patientsCount,
          appointments: appointmentsCount,
          admissions: admissionsCount,
        };
      })
    );

    // ── 5. Department distribution ────────────────────────────────────────────
     const statusStats = await Patient.aggregate([
      { $match: { doctorCode } },
      { $group: { _id: '$status', value: { $sum: 1 } } },
      { $project: { name: '$_id', value: 1, _id: 0 } },
      { $sort: { value: -1 } },
    ]);

    const upcomingRaw = await Appointment.find({
      doctorCode,
      date: { $gte: todayStr },
      status: { $nin: ['Cancelled', 'Completed'] },
    })
      .sort({ date: 1, time: 1 })   // sort by date then time string
      .limit(5)
      .lean();


     const upcomingAppointments = upcomingRaw.map((apt) => ({
      patient: apt.patientName,
      time:    apt.time,            // already "11:00 AM" format
      date:    apt.date,            // "YYYY-MM-DD"
      type:    apt.type    ?? '—',
      status:  apt.status,
      room:    apt.room    ?? '—',
    }));

    // ── 6. Respond ────────────────────────────────────────────────────────────
    return res.json({
      doctorId,
      doctorCode,
      totalPatients,
      todayAppointments,
      weeklyStats: weeklyStats.reverse(),   // oldest → newest
      statusStats,
      upcomingAppointments
    });

  } catch (err) {
    console.error('[getDoctorStats]', err);
    return res.status(500).json({ message: 'Server error' });
  }
};