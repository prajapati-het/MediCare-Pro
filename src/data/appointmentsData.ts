// Appointments data mapped to specific doctors
export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "Delayed"
  | "No Show";

export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  patientName: string;
  time: string;
  date: string;
  type: string;
  status: AppointmentStatus;
  notes?: string;
  duration: number;
  room: string;
  cancelReason?: string
}

export const appointmentsData: Appointment[] = [

  { id: 25, doctorId: 1, patientId: 1, patientName: "John Smith", time: "11:00 AM", date: "2025-12-20", type: "Check-up", status: "Pending", notes: "Medication review", duration: 30, room: "Room 402" },
  { id: 26, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "02:30 PM", date: "2025-12-22", type: "Surgery", status: "Pending", notes: "Pacemaker adjustment", duration: 60, room: "OR 2" },
  { id: 27, doctorId: 1, patientId: 3, patientName: "Patricia Anderson", time: "10:00 AM", date: "2025-12-23", type: "Consultation", status: "Pending", notes: "Treatment plan review", duration: 45, room: "Room 401" },
  { id: 100, doctorId: 1, patientId: 20, patientName: "Sarah Connor", time: "08:00 AM", date: "2025-12-24", type: "Check-up", status: "Confirmed", notes: "Blood pressure monitoring", duration: 30, room: "Room 402" },
  { id: 101, doctorId: 1, patientId: 21, patientName: "Kyle Reese", time: "09:30 AM", date: "2025-12-27", type: "Lab Review", status: "Pending", notes: "Irregular heartbeat check", duration: 45, room: "Lab 1" },
  { id: 102, doctorId: 1, patientId: 22, patientName: "T-800", time: "11:00 AM", date: "2026-01-05", type: "Surgery", status: "Confirmed", notes: "Cybernetic maintenance", duration: 120, room: "OR 1" },
  { id: 103, doctorId: 1, patientId: 23, patientName: "Dr. Silberman", time: "02:00 PM", date: "2026-01-12", type: "Consultation", status: "Pending", notes: "Stress analysis", duration: 30, room: "Room 402" },
  { id: 104, doctorId: 1, patientId: 24, patientName: "John Connor", time: "10:00 AM", date: "2026-02-02", type: "Check-up", status: "Confirmed", notes: "Post-op healing", duration: 30, room: "Room 401" },
  { id: 200, doctorId: 1, patientId: 1, patientName: "John Smith", time: "09:00 AM", date: "2025-10-12", type: "Check-up", status: "Completed", notes: "Regular monitoring", duration: 30, room: "Room 402" },
  { id: 201, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "02:00 PM", date: "2025-11-05", type: "Surgery", status: "Completed", notes: "Pacemaker installed", duration: 120, room: "OR 2" },
  { id: 202, doctorId: 1, patientId: 120, patientName: "Alice Freeman", time: "10:30 AM", date: "2025-11-18", type: "Consultation", status: "Cancelled", notes: "Patient rescheduled", duration: 30, room: "Room 401" },

  // New patients
  { id: 28, doctorId: 2, patientId: 4, patientName: "Emily Davis", time: "09:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Routine health check", duration: 30, room: "Room 403" },
  { id: 29, doctorId: 2, patientId: 5, patientName: "Michael Johnson", time: "10:30 AM", date: "2025-12-16", type: "Consultation", status: "Confirmed", notes: "Discuss treatment options", duration: 45, room: "Room 404" },
  { id: 30, doctorId: 2, patientId: 6, patientName: "Sophia Martinez", time: "01:00 PM", date: "2025-12-17", type: "Lab Review", status: "Confirmed", notes: "Blood test review", duration: 20, room: "Room 403" },
  { id: 31, doctorId: 2, patientId: 7, patientName: "James Brown", time: "02:30 PM", date: "2025-12-18", type: "Video Call", status: "Confirmed", notes: "Teleconsultation", duration: 30, room: "Virtual" },
  { id: 105, doctorId: 2, patientId: 25, patientName: "Ellen Ripley", time: "09:00 AM", date: "2025-12-28", type: "Check-up", status: "Confirmed", notes: "Annual physical", duration: 30, room: "Room 403" },
  { id: 106, doctorId: 2, patientId: 26, patientName: "Dallas", time: "11:30 AM", date: "2026-01-08", type: "Consultation", status: "Pending", notes: "Chest pain review", duration: 45, room: "Room 404" },
  { id: 107, doctorId: 2, patientId: 27, patientName: "Parker", time: "03:00 PM", date: "2026-01-15", type: "Lab Review", status: "Confirmed", notes: "Infection markers", duration: 20, room: "Room 403" },
  { id: 108, doctorId: 2, patientId: 28, patientName: "Brett", time: "08:15 AM", date: "2026-02-10", type: "Video Call", status: "Confirmed", notes: "Follow up", duration: 15, room: "Virtual" },
  { id: 203, doctorId: 2, patientId: 4, patientName: "Emily Davis", time: "08:30 AM", date: "2025-10-15", type: "Check-up", status: "Completed", notes: "Flu shot", duration: 15, room: "Room 403" },
  { id: 204, doctorId: 2, patientId: 5, patientName: "Michael Johnson", time: "11:15 AM", date: "2025-11-02", type: "Consultation", status: "Completed", notes: "Diet plan", duration: 45, room: "Room 404" },
  { id: 205, doctorId: 2, patientId: 121, patientName: "Mark Twain", time: "03:45 PM", date: "2025-11-29", type: "Lab Review", status: "Completed", notes: "Vitamin D deficiency", duration: 20, room: "Room 403" },


  { id: 32, doctorId: 3, patientId: 8, patientName: "Olivia Wilson", time: "09:30 AM", date: "2025-12-19", type: "Follow-up", status: "Confirmed", notes: "Post-surgery check", duration: 30, room: "Room 405" },
  { id: 33, doctorId: 3, patientId: 9, patientName: "Liam Taylor", time: "11:00 AM", date: "2025-12-20", type: "Consultation", status: "Confirmed", notes: "New patient intake", duration: 45, room: "Room 406" },
  { id: 34, doctorId: 3, patientId: 10, patientName: "Ava Thomas", time: "02:00 PM", date: "2025-12-21", type: "Check-up", status: "Confirmed", notes: "Routine monitoring", duration: 30, room: "Room 405" },
  { id: 35, doctorId: 3, patientId: 11, patientName: "William Harris", time: "03:30 PM", date: "2025-12-22", type: "Consultation", status: "Confirmed", notes: "Medication adjustment", duration: 30, room: "Room 406" },
  { id: 36, doctorId: 3, patientId: 12, patientName: "Isabella Clark", time: "10:00 AM", date: "2025-12-23", type: "Follow-up", status: "Confirmed", notes: "Lab result discussion", duration: 30, room: "Room 405" },

  // Dr. Emily Davis (id: 3) - Orthopedics
  { id: 10, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "08:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Post-surgery check", duration: 30, room: "Room 201" },
  { id: 11, doctorId: 3, patientId: 8, patientName: "Karen White", time: "10:30 AM", date: "2025-12-16", type: "Consultation", status: "Confirmed", notes: "Knee replacement discussion", duration: 45, room: "Room 201" },
  { id: 12, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "09:00 AM", date: "2025-12-18", type: "Check-up", status: "Pending", notes: "Physical therapy progress", duration: 30, room: "Room 202" },
  { id: 30, doctorId: 3, patientId: 8, patientName: "Karen White", time: "02:00 PM", date: "2025-12-19", type: "Follow-up", status: "Confirmed", notes: "Pain management review", duration: 30, room: "Room 201" },
  { id: 109, doctorId: 3, patientId: 29, patientName: "Rocky Balboa", time: "07:00 AM", date: "2025-12-30", type: "Surgery", status: "Confirmed", notes: "Eye surgery", duration: 90, room: "OR 3" },
  { id: 110, doctorId: 3, patientId: 30, patientName: "Apollo Creed", time: "10:00 AM", date: "2026-01-03", type: "Lab Review", status: "Pending", notes: "Fracture check", duration: 30, room: "Imaging" },
  { id: 111, doctorId: 3, patientId: 31, patientName: "Adrian", time: "01:00 PM", date: "2026-02-14", type: "Consultation", status: "Confirmed", notes: "Joint pain", duration: 30, room: "Room 405" },
  { id: 206, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "07:00 AM", date: "2025-10-20", type: "Surgery", status: "Completed", notes: "ACL Repair", duration: 180, room: "OR 3" },
  { id: 207, doctorId: 3, patientId: 8, patientName: "Karen White", time: "01:30 PM", date: "2025-11-14", type: "Follow-up", status: "Completed", notes: "Cast removal", duration: 30, room: "Room 201" },
  { id: 208, doctorId: 3, patientId: 122, patientName: "Usain Bolt", time: "10:00 AM", date: "2025-11-25", type: "Consultation", status: "Cancelled", notes: "Emergency conflict", duration: 45, room: "Room 202" },

  // Dr. James Wilson (id: 4) - Pediatrics
  { id: 13, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "09:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Asthma management review", duration: 30, room: "Room 210" },
  { id: 14, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "10:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Ear infection follow-up", duration: 20, room: "Room 210" },
  { id: 15, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "11:00 AM", date: "2025-12-19", type: "Consultation", status: "Pending", notes: "Vaccination consultation", duration: 20, room: "Room 211" },
  { id: 31, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "09:30 AM", date: "2025-12-20", type: "Check-up", status: "Confirmed", notes: "General wellness check", duration: 30, room: "Room 210" },
  { id: 112, doctorId: 4, patientId: 32, patientName: "Bart Simpson", time: "04:00 PM", date: "2025-12-31", type: "Check-up", status: "Pending", notes: "Vaccination", duration: 15, room: "Room 210" },
  { id: 113, doctorId: 4, patientId: 33, patientName: "Lisa Simpson", time: "09:00 AM", date: "2026-01-10", type: "Consultation", status: "Confirmed", notes: "Allergy testing", duration: 30, room: "Room 211" },
  { id: 114, doctorId: 4, patientId: 34, patientName: "Maggie Simpson", time: "11:00 AM", date: "2026-02-20", type: "Check-up", status: "Confirmed", notes: "Growth monitoring", duration: 20, room: "Room 210" },
  { id: 209, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "04:00 PM", date: "2025-10-05", type: "Check-up", status: "Completed", notes: "Growth chart", duration: 20, room: "Room 210" },
  { id: 210, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "09:15 AM", date: "2025-11-10", type: "Follow-up", status: "Completed", notes: "Antibiotic course done", duration: 15, room: "Room 211" },
  { id: 211, doctorId: 4, patientId: 123, patientName: "Drew Brees", time: "02:30 PM", date: "2025-11-22", type: "Consultation", status: "Completed", notes: "Sports physical", duration: 30, room: "Room 210" },

  // Dr. Lisa Anderson (id: 5) - Dermatology
  { id: 16, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "09:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Acne treatment progress", duration: 20, room: "Room 220" },
  { id: 17, doctorId: 5, patientId: 12, patientName: "George Miller", time: "11:00 AM", date: "2025-12-17", type: "Check-up", status: "Confirmed", notes: "Skin cancer screening", duration: 30, room: "Room 220" },
  { id: 18, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "02:00 PM", date: "2025-12-20", type: "Consultation", status: "Pending", notes: "Treatment adjustment", duration: 20, room: "Room 221" },
  { id: 115, doctorId: 5, patientId: 35, patientName: "Freddy Krueger", time: "02:00 PM", date: "2025-12-29", type: "Consultation", status: "Pending", notes: "Severe burn scars", duration: 60, room: "Room 220" },
  { id: 116, doctorId: 5, patientId: 36, patientName: "Jason Voorhees", time: "10:30 AM", date: "2026-01-20", type: "Check-up", status: "Confirmed", notes: "Skin care regimen", duration: 30, room: "Room 221" },
  { id: 212, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "11:00 AM", date: "2025-10-18", type: "Follow-up", status: "Completed", notes: "Acne clearing up", duration: 20, room: "Room 220" },
  { id: 213, doctorId: 5, patientId: 12, patientName: "George Miller", time: "08:00 AM", date: "2025-11-06", type: "Check-up", status: "Completed", notes: "Biopsy negative", duration: 30, room: "Room 221" },
  { id: 214, doctorId: 5, patientId: 124, patientName: "Wolverine", time: "01:00 PM", date: "2025-11-30", type: "Consultation", status: "Completed", notes: "Rapid healing analysis", duration: 60, room: "Room 220" },

  // Dr. Robert Taylor (id: 6) - Oncology
  { id: 19, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "08:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Chemotherapy response review", duration: 45, room: "Room 501" },
  { id: 20, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "10:00 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Post-radiation assessment", duration: 30, room: "Room 501" },
  { id: 21, doctorId: 6, patientId: 15, patientName: "William Clark", time: "11:30 AM", date: "2025-12-17", type: "Consultation", status: "Confirmed", notes: "Surveillance scan review", duration: 30, room: "Room 502" },
  { id: 22, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "09:00 AM", date: "2025-12-18", type: "Lab Review", status: "Pending", notes: "Blood count results", duration: 20, room: "Room 501" },
  { id: 23, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "10:00 AM", date: "2025-12-22", type: "Video Call", status: "Pending", notes: "Hormone therapy check-in", duration: 20, room: "Virtual" },
  { id: 117, doctorId: 6, patientId: 37, patientName: "Walter White", time: "08:00 AM", date: "2025-12-28", type: "Consultation", status: "Confirmed", notes: "Remission review", duration: 45, room: "Room 501" },
  { id: 118, doctorId: 6, patientId: 38, patientName: "Jesse Pinkman", time: "09:30 AM", date: "2026-01-25", type: "Lab Review", status: "Pending", notes: "Chemotherapy effects", duration: 30, room: "Room 502" },
  { id: 119, doctorId: 6, patientId: 39, patientName: "Saul Goodman", time: "11:00 AM", date: "2026-02-05", type: "Check-up", status: "Confirmed", notes: "General health", duration: 20, room: "Room 501" },
  { id: 215, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "09:00 AM", date: "2025-10-22", type: "Check-up", status: "Completed", notes: "Stable condition", duration: 45, room: "Room 501" },
  { id: 216, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "10:30 AM", date: "2025-11-15", type: "Follow-up", status: "Completed", notes: "No new growth", duration: 30, room: "Room 502" },
  { id: 217, doctorId: 6, patientId: 125, patientName: "Bruce Willis", time: "03:00 PM", date: "2025-11-28", type: "Consultation", status: "Cancelled", notes: "Doctor unavailability", duration: 30, room: "Room 501" },


  // =========================================================
  // DOCTOR 7: Dr. Strange (Neurology)
  // =========================================================
  { id: 120, doctorId: 7, patientId: 40, patientName: "Peter Parker", time: "09:00 AM", date: "2025-12-16", type: "Consultation", status: "Confirmed", notes: "Headaches", duration: 30, room: "Room 301" },
  { id: 121, doctorId: 7, patientId: 41, patientName: "Stephen Strange", time: "10:30 AM", date: "2025-12-17", type: "Follow-up", status: "Confirmed", notes: "Hand tremors", duration: 45, room: "Room 302" },
  { id: 122, doctorId: 7, patientId: 42, patientName: "Christine Palmer", time: "01:00 PM", date: "2026-01-10", type: "Check-up", status: "Pending", notes: "Nerve conduction study", duration: 60, room: "Lab 2" },
  { id: 123, doctorId: 7, patientId: 43, patientName: "Wong", time: "03:00 PM", date: "2026-01-15", type: "Video Call", status: "Confirmed", notes: "Migraine discussion", duration: 30, room: "Virtual" },
  { id: 124, doctorId: 7, patientId: 44, patientName: "Kaecilius", time: "09:15 AM", date: "2026-02-01", type: "Consultation", status: "Pending", notes: "Memory loss", duration: 45, room: "Room 301" },
  { id: 218, doctorId: 7, patientId: 40, patientName: "Peter Parker", time: "08:00 AM", date: "2025-10-10", type: "Consultation", status: "Completed", notes: "Migraine prescription", duration: 30, room: "Room 301" },
  { id: 219, doctorId: 7, patientId: 126, patientName: "Cleo", time: "11:00 AM", date: "2025-11-12", type: "Follow-up", status: "Completed", notes: "Vision restoration", duration: 45, room: "Room 302" },

  // =========================================================
  // DOCTOR 8: Dr. Banner (Endocrinology)
  // =========================================================
  { id: 125, doctorId: 8, patientId: 45, patientName: "Bruce Banner", time: "08:30 AM", date: "2025-12-16", type: "Lab Review", status: "Confirmed", notes: "Cortisol levels", duration: 30, room: "Room 305" },
  { id: 126, doctorId: 8, patientId: 46, patientName: "Betty Ross", time: "11:00 AM", date: "2025-12-18", type: "Check-up", status: "Confirmed", notes: "Thyroid function", duration: 30, room: "Room 305" },
  { id: 127, doctorId: 8, patientId: 47, patientName: "Thaddeus Ross", time: "02:00 PM", date: "2026-01-05", type: "Consultation", status: "Pending", notes: "Stress hormones", duration: 45, room: "Room 306" },
  { id: 128, doctorId: 8, patientId: 48, patientName: "Emil Blonsky", time: "10:00 AM", date: "2026-01-20", type: "Surgery", status: "Confirmed", notes: "Adrenal gland procedure", duration: 90, room: "OR 4" },
  { id: 129, doctorId: 8, patientId: 49, patientName: "Jennifer Walters", time: "04:00 PM", date: "2026-02-12", type: "Follow-up", status: "Confirmed", notes: "Blood transfusion reaction", duration: 30, room: "Room 305" },

  // =========================================================
  // DOCTOR 9: Dr. Foster (Rheumatology)
  // =========================================================
  { id: 130, doctorId: 9, patientId: 50, patientName: "Jane Foster", time: "09:00 AM", date: "2025-12-17", type: "Check-up", status: "Confirmed", notes: "Joint pain", duration: 30, room: "Room 310" },
  { id: 131, doctorId: 9, patientId: 51, patientName: "Thor Odinson", time: "11:30 AM", date: "2025-12-20", type: "Consultation", status: "Pending", notes: "Arthritis screening", duration: 45, room: "Room 310" },
  { id: 132, doctorId: 9, patientId: 52, patientName: "Darcy Lewis", time: "08:00 AM", date: "2026-01-08", type: "Lab Review", status: "Confirmed", notes: "ANA panel", duration: 20, room: "Room 311" },
  { id: 133, doctorId: 9, patientId: 53, patientName: "Erik Selvig", time: "01:30 PM", date: "2026-02-03", type: "Follow-up", status: "Confirmed", notes: "Lupus management", duration: 30, room: "Room 310" },
  { id: 220, doctorId: 8, patientId: 45, patientName: "Bruce Banner", time: "09:30 AM", date: "2025-10-25", type: "Lab Review", status: "Completed", notes: "Gamma levels normal", duration: 30, room: "Room 305" },
  { id: 221, doctorId: 8, patientId: 46, patientName: "Betty Ross", time: "02:00 PM", date: "2025-11-20", type: "Check-up", status: "Completed", notes: "Metabolism check", duration: 30, room: "Room 306" },
  { id: 222, doctorId: 9, patientId: 50, patientName: "Jane Foster", time: "10:00 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Joint swelling reduced", duration: 30, room: "Room 310" },
  { id: 223, doctorId: 9, patientId: 51, patientName: "Thor Odinson", time: "01:30 PM", date: "2025-11-08", type: "Consultation", status: "Completed", notes: "God-tier physiology", duration: 45, room: "Room 311" },

  // =========================================================
  // DOCTOR 10: Dr. Palmer (Psychiatry)
  // =========================================================
  { id: 134, doctorId: 10, patientId: 54, patientName: "Tony Stark", time: "10:00 AM", date: "2025-12-18", type: "Consultation", status: "Confirmed", notes: "Anxiety/Insomnia", duration: 60, room: "Room 350" },
  { id: 135, doctorId: 10, patientId: 55, patientName: "Pepper Potts", time: "02:00 PM", date: "2025-12-21", type: "Video Call", status: "Confirmed", notes: "Stress management", duration: 45, room: "Virtual" },
  { id: 136, doctorId: 10, patientId: 56, patientName: "Happy Hogan", time: "11:00 AM", date: "2026-01-12", type: "Follow-up", status: "Pending", notes: "Trauma therapy", duration: 45, room: "Room 350" },
  { id: 137, doctorId: 10, patientId: 57, patientName: "Harley Keener", time: "09:00 AM", date: "2026-02-14", type: "Consultation", status: "Confirmed", notes: "Grief counseling", duration: 60, room: "Room 351" },

  // =========================================================
  // DOCTOR 11: Dr. Erskine (Immunology)
  // =========================================================
  { id: 138, doctorId: 11, patientId: 58, patientName: "Steve Rogers", time: "07:00 AM", date: "2025-12-19", type: "Consultation", status: "Confirmed", notes: "Immune system history", duration: 60, room: "Room 410" },
  { id: 139, doctorId: 11, patientId: 59, patientName: "Bucky Barnes", time: "09:30 AM", date: "2025-12-22", type: "Lab Review", status: "Pending", notes: "Hydration analysis", duration: 30, room: "Lab 3" },
  { id: 140, doctorId: 11, patientId: 60, patientName: "Peggy Carter", time: "02:00 PM", date: "2026-01-18", type: "Check-up", status: "Confirmed", notes: "Allergy test", duration: 30, room: "Room 411" },

  // =========================================================
  // DOCTOR 12: Dr. Cho (Radiology)
  // =========================================================
  { id: 141, doctorId: 12, patientId: 61, patientName: "Helen Cho", time: "08:00 AM", date: "2025-12-20", type: "Lab Review", status: "Confirmed", notes: "Brain scan", duration: 45, room: "Imaging 1" },
  { id: 142, doctorId: 12, patientId: 62, patientName: "Clint Barton", time: "10:00 AM", date: "2025-12-23", type: "Lab Review", status: "Pending", notes: "Hearing check", duration: 30, room: "Imaging 2" },
  { id: 143, doctorId: 12, patientId: 63, patientName: "Laura Barton", time: "01:00 PM", date: "2026-01-25", type: "Lab Review", status: "Confirmed", notes: "Wrist injury", duration: 15, room: "Imaging 1" },
  { id: 144, doctorId: 12, patientId: 64, patientName: "Natasha Romanoff", time: "03:30 PM", date: "2026-02-10", type: "Lab Review", status: "Confirmed", notes: "Abdominal pain", duration: 30, room: "Imaging 2" },

  // =========================================================
  // DOCTOR 13: Dr. Zola (Genetics)
  // =========================================================
  { id: 145, doctorId: 13, patientId: 65, patientName: "Johann Schmidt", time: "09:00 AM", date: "2025-12-21", type: "Consultation", status: "Pending", notes: "Genetic mapping", duration: 45, room: "Lab 4" },
  { id: 146, doctorId: 13, patientId: 66, patientName: "Arnim Zola", time: "11:00 AM", date: "2026-01-05", type: "Lab Review", status: "Confirmed", notes: "DNA sequencing", duration: 30, room: "Lab 4" },

  // =========================================================
  // DOCTOR 14: Dr. Alchemax (Toxicology)
  // =========================================================
  { id: 147, doctorId: 14, patientId: 67, patientName: "Miguel O'Hara", time: "08:30 AM", date: "2025-12-22", type: "Check-up", status: "Confirmed", notes: "Blood toxin screening", duration: 30, room: "Room 500" },
  { id: 148, doctorId: 14, patientId: 68, patientName: "Lyla", time: "10:30 AM", date: "2026-01-15", type: "Video Call", status: "Confirmed", notes: "Virtual results", duration: 15, room: "Virtual" },
  { id: 149, doctorId: 14, patientId: 69, patientName: "Gabriel O'Hara", time: "02:00 PM", date: "2026-02-20", type: "Consultation", status: "Pending", notes: "Exposure assessment", duration: 45, room: "Room 501" },

  // =========================================================
  // DOCTOR 15: Dr. Voodoo (Cardiology - Specialist)
  // =========================================================
  { id: 150, doctorId: 15, patientId: 70, patientName: "Jericho Drumm", time: "07:30 AM", date: "2025-12-23", type: "Check-up", status: "Confirmed", notes: "Heart rate variability", duration: 30, room: "Room 405" },
  { id: 151, doctorId: 15, patientId: 71, patientName: "Daniel Drumm", time: "09:00 AM", date: "2026-01-30", type: "Surgery", status: "Pending", notes: "Pacemaker install", duration: 120, room: "OR 5" },
  
  // =========================================================
  // DOCTOR 16: Dr. Wu (Virology)
  // =========================================================
  { id: 152, doctorId: 16, patientId: 72, patientName: "Henry Wu", time: "08:00 AM", date: "2025-12-24", type: "Lab Review", status: "Confirmed", notes: "Viral load count", duration: 30, room: "Biosafety Lab 1" },
  { id: 153, doctorId: 16, patientId: 73, patientName: "Ian Malcolm", time: "10:00 AM", date: "2026-01-11", type: "Consultation", status: "Pending", notes: "Flu symptoms", duration: 20, room: "Room 410" },
  { id: 154, doctorId: 16, patientId: 74, patientName: "Ellie Sattler", time: "01:00 PM", date: "2026-02-22", type: "Follow-up", status: "Confirmed", notes: "Post-viral fatigue", duration: 30, room: "Room 411" },

  // =========================================================
  // DOCTOR 17: Dr. Octavius (Surgery - Trauma)
  // =========================================================
  { id: 155, doctorId: 17, patientId: 75, patientName: "Otto Octavius", time: "06:00 AM", date: "2025-12-25", type: "Surgery", status: "Confirmed", notes: "Spinal fusion", duration: 180, room: "OR 6" },
  { id: 156, doctorId: 17, patientId: 76, patientName: "Rosie Octavius", time: "03:00 PM", date: "2026-01-02", type: "Consultation", status: "Confirmed", notes: "Post-op care", duration: 30, room: "Room 201" },
  { id: 157, doctorId: 17, patientId: 77, patientName: "Peter Parker", time: "11:30 AM", date: "2026-02-15", type: "Check-up", status: "Pending", notes: "Arm functionality", duration: 45, room: "Room 202" },

  // =========================================================
  // DOCTOR 18: Dr. Connors (Dermatology/Genetics)
  // =========================================================
  { id: 158, doctorId: 18, patientId: 78, patientName: "Curt Connors", time: "09:30 AM", date: "2025-12-26", type: "Check-up", status: "Confirmed", notes: "Skin graft healing", duration: 30, room: "Room 220" },
  { id: 159, doctorId: 18, patientId: 79, patientName: "Martha Connors", time: "11:00 AM", date: "2026-01-19", type: "Lab Review", status: "Pending", notes: "Regeneration cell count", duration: 45, room: "Lab 5" },
  { id: 160, doctorId: 18, patientId: 80, patientName: "Billy Connors", time: "02:30 PM", date: "2026-02-28", type: "Consultation", status: "Confirmed", notes: "Rash evaluation", duration: 20, room: "Room 221" },

  // =========================================================
  // DOCTOR 19: Dr. Hamilton (Geriatrics)
  // =========================================================
  { id: 161, doctorId: 19, patientId: 81, patientName: "Alexander Pierce", time: "10:00 AM", date: "2025-12-27", type: "Check-up", status: "Confirmed", notes: "Cognitive assessment", duration: 45, room: "Room 600" },
  { id: 162, doctorId: 19, patientId: 82, patientName: "Howard Stark", time: "01:00 PM", date: "2026-01-09", type: "Consultation", status: "Pending", notes: "Mobility issues", duration: 30, room: "Room 601" },
  { id: 163, doctorId: 19, patientId: 83, patientName: "Maria Stark", time: "10:30 AM", date: "2026-02-16", type: "Follow-up", status: "Confirmed", notes: "Medication adjustment", duration: 30, room: "Room 600" },

  // =========================================================
  // DOCTOR 20: Dr. Storm (Obstetrics/Gynecology)
  // =========================================================
  { id: 164, doctorId: 20, patientId: 84, patientName: "Sue Storm", time: "09:00 AM", date: "2025-12-28", type: "Check-up", status: "Confirmed", notes: "Prenatal visit", duration: 30, room: "Room 700" },
  { id: 165, doctorId: 20, patientId: 85, patientName: "Johnny Storm", time: "11:00 AM", date: "2026-01-14", type: "Consultation", status: "Pending", notes: "Referral", duration: 15, room: "Room 700" },
  { id: 166, doctorId: 20, patientId: 86, patientName: "Alicia Masters", time: "02:00 PM", date: "2026-02-25", type: "Follow-up", status: "Confirmed", notes: "Post-natal check", duration: 45, room: "Room 701" },

  // =========================================================
  // DOCTOR 21: Dr. Lensherr (Hematology)
  // =========================================================
  { id: 167, doctorId: 21, patientId: 87, patientName: "Erik Lensherr", time: "08:30 AM", date: "2025-12-29", type: "Lab Review", status: "Confirmed", notes: "Iron levels", duration: 30, room: "Room 800" },
  { id: 168, doctorId: 21, patientId: 88, patientName: "Raven Darkholme", time: "10:30 AM", date: "2026-01-22", type: "Consultation", status: "Pending", notes: "Blood disorder", duration: 45, room: "Room 801" },
  { id: 169, doctorId: 21, patientId: 89, patientName: "Peter Maximoff", time: "01:30 PM", date: "2026-02-08", type: "Check-up", status: "Confirmed", notes: "Metabolism test", duration: 20, room: "Room 800" },

  // =========================================================
  // DOCTOR 22: Dr. Mccoy (General Practice)
  // =========================================================
  { id: 170, doctorId: 22, patientId: 90, patientName: "James Kirk", time: "09:00 AM", date: "2025-12-30", type: "Check-up", status: "Confirmed", notes: "Annual physical", duration: 30, room: "Room 101" },
  { id: 171, doctorId: 22, patientId: 91, patientName: "Spock", time: "11:00 AM", date: "2026-01-06", type: "Consultation", status: "Pending", notes: "Heart rate logic", duration: 45, room: "Room 102" },
  { id: 172, doctorId: 22, patientId: 92, patientName: "Leonard McCoy", time: "02:00 PM", date: "2026-02-18", type: "Video Call", status: "Confirmed", notes: "Triaging symptoms", duration: 15, room: "Virtual" },

  // =========================================================
  // DOCTOR 23: Dr. Crusher (Internal Medicine)
  // =========================================================
  { id: 173, doctorId: 23, patientId: 93, patientName: "Jean-Luc Picard", time: "08:00 AM", date: "2025-12-31", type: "Consultation", status: "Confirmed", notes: "Artificial heart maintenance", duration: 60, room: "Room 110" },
  { id: 174, doctorId: 23, patientId: 94, patientName: "William Riker", time: "10:00 AM", date: "2026-01-21", type: "Check-up", status: "Pending", notes: "Stress test", duration: 30, room: "Room 111" },
  { id: 175, doctorId: 23, patientId: 95, patientName: "Data", time: "01:00 PM", date: "2026-02-11", type: "Surgery", status: "Confirmed", notes: "Positronic brain tune-up", duration: 120, room: "OR 7" },

  // =========================================================
  // DOCTOR 24: Dr. Bashir (Pediatrics)
  // =========================================================
  { id: 176, doctorId: 24, patientId: 96, patientName: "Jake Sisko", time: "09:30 AM", date: "2026-01-02", type: "Check-up", status: "Confirmed", notes: "School physical", duration: 30, room: "Room 212" },
  { id: 177, doctorId: 24, patientId: 97, patientName: "Nog", time: "11:00 AM", date: "2026-01-23", type: "Consultation", status: "Pending", notes: "Ear infection", duration: 20, room: "Room 213" },
  { id: 178, doctorId: 24, patientId: 98, patientName: "Molly O'Brien", time: "03:00 PM", date: "2026-02-13", type: "Follow-up", status: "Confirmed", notes: "Vaccination reaction", duration: 15, room: "Room 212" },

  // =========================================================
  // DOCTOR 25: Dr. Phlox (Exobiology/Allergy)
  // =========================================================
  { id: 179, doctorId: 25, patientId: 99, patientName: "Jonathan Archer", time: "07:00 AM", date: "2026-01-03", type: "Consultation", status: "Confirmed", notes: "Alien pollen allergy", duration: 45, room: "Room 320" },
  { id: 180, doctorId: 25, patientId: 100, patientName: "T'Pol", time: "09:30 AM", date: "2026-01-24", type: "Lab Review", status: "Pending", notes: "Neural pressure", duration: 30, room: "Room 321" },
  { id: 181, doctorId: 25, patientId: 101, patientName: "Trip Tucker", time: "02:00 PM", date: "2026-02-19", type: "Check-up", status: "Confirmed", notes: "Respiratory infection", duration: 30, room: "Room 320" },

  // =========================================================
  // DOCTOR 26: Dr. Polaski (Pathology)
  // =========================================================
  { id: 182, doctorId: 26, patientId: 102, patientName: "Katherine Pulaski", time: "08:00 AM", date: "2026-01-04", type: "Lab Review", status: "Confirmed", notes: "Tissue biopsy", duration: 60, room: "Lab 6" },
  { id: 183, doctorId: 26, patientId: 103, patientName: "Worf", time: "10:30 AM", date: "2026-01-25", type: "Consultation", status: "Pending", notes: "Viral analysis", duration: 30, room: "Room 330" },
  { id: 184, doctorId: 26, patientId: 104, patientName: "Geordi La Forge", time: "01:00 PM", date: "2026-02-02", type: "Video Call", status: "Confirmed", notes: "Results discussion", duration: 20, room: "Virtual" },

  // =========================================================
  // DOCTOR 27: Dr. Troi (Psychiatry)
  // =========================================================
  { id: 185, doctorId: 27, patientId: 105, patientName: "Deanna Troi", time: "09:00 AM", date: "2026-01-05", type: "Consultation", status: "Confirmed", notes: "Empathy fatigue", duration: 60, room: "Room 352" },
  { id: 186, doctorId: 27, patientId: 106, patientName: "Wesley Crusher", time: "11:00 AM", date: "2026-01-26", type: "Follow-up", status: "Pending", notes: "Career counseling", duration: 30, room: "Room 353" },
  { id: 187, doctorId: 27, patientId: 107, patientName: "Lwaxana Troi", time: "02:30 PM", date: "2026-02-23", type: "Video Call", status: "Confirmed", notes: "Family mediation", duration: 45, room: "Virtual" },

  // =========================================================
  // DOCTOR 28: Dr. The Doctor (Emergency Medicine - Hologram)
  // =========================================================
  { id: 188, doctorId: 28, patientId: 108, patientName: "Tom Paris", time: "08:30 AM", date: "2026-01-06", type: "Check-up", status: "Confirmed", notes: "Inflamed dorsal vein", duration: 30, room: "Sickbay 1" },
  { id: 189, doctorId: 28, patientId: 109, patientName: "Harry Kim", time: "10:00 AM", date: "2026-01-27", type: "Surgery", status: "Pending", notes: "Appendectomy", duration: 60, room: "Sickbay OR" },
  { id: 190, doctorId: 28, patientId: 110, patientName: "B'Elanna Torres", time: "01:00 PM", date: "2026-02-24", type: "Consultation", status: "Confirmed", notes: "Klingon physiology", duration: 45, room: "Sickbay 1" },

  // =========================================================
  // DOCTOR 29: Dr. Zee (Neurology - Future)
  // =========================================================
  { id: 191, doctorId: 29, patientId: 111, patientName: "Will Robinson", time: "09:00 AM", date: "2026-01-07", type: "Consultation", status: "Confirmed", notes: "Neural interface scan", duration: 45, room: "Room 340" },
  { id: 192, doctorId: 29, patientId: 112, patientName: "Don West", time: "11:30 AM", date: "2026-01-28", type: "Check-up", status: "Pending", notes: "Concussion evaluation", duration: 30, room: "Room 341" },
  { id: 193, doctorId: 29, patientId: 113, patientName: "Maureen Robinson", time: "02:00 PM", date: "2026-02-25", type: "Lab Review", status: "Confirmed", notes: "Cognitive testing results", duration: 30, room: "Room 340" },

  // =========================================================
  // DOCTOR 30: Dr. Smith (General Practice - Sketchy)
  // =========================================================
  { id: 194, doctorId: 30, patientId: 114, patientName: "John Robinson", time: "10:00 AM", date: "2026-01-08", type: "Check-up", status: "Confirmed", notes: "General wellness", duration: 20, room: "Room 900" },
  { id: 195, doctorId: 30, patientId: 115, patientName: "Judy Robinson", time: "12:30 PM", date: "2026-01-29", type: "Consultation", status: "Pending", notes: "Space sickness", duration: 30, room: "Room 901" },
  { id: 196, doctorId: 30, patientId: 116, patientName: "Penny Robinson", time: "03:00 PM", date: "2026-02-26", type: "Video Call", status: "Confirmed", notes: "Anxiety treatment", duration: 45, room: "Virtual" },

  // Doctor 10 (Palmer) - Oct/Nov
  { id: 224, doctorId: 10, patientId: 54, patientName: "Tony Stark", time: "04:00 PM", date: "2025-10-14", type: "Consultation", status: "Completed", notes: "Therapy session 4", duration: 60, room: "Room 350" },
  { id: 225, doctorId: 10, patientId: 55, patientName: "Pepper Potts", time: "09:00 AM", date: "2025-11-19", type: "Video Call", status: "Completed", notes: "Remote session", duration: 45, room: "Virtual" },

  // Doctor 11 (Erskine) - Oct/Nov
  { id: 226, doctorId: 11, patientId: 58, patientName: "Steve Rogers", time: "07:00 AM", date: "2025-10-05", type: "Consultation", status: "Completed", notes: "Super soldier serum analysis", duration: 60, room: "Room 410" },
  { id: 227, doctorId: 11, patientId: 59, patientName: "Bucky Barnes", time: "10:30 AM", date: "2025-11-21", type: "Lab Review", status: "Completed", notes: "Winter soldier sedation", duration: 30, room: "Lab 3" },

  // Doctor 12 (Cho) - Oct/Nov
  { id: 228, doctorId: 12, patientId: 61, patientName: "Helen Cho", time: "08:00 AM", date: "2025-10-28", type: "Lab Review", status: "Completed", notes: "Brain scan clear", duration: 45, room: "Imaging 1" },
  { id: 229, doctorId: 12, patientId: 62, patientName: "Clint Barton", time: "11:00 AM", date: "2025-11-11", type: "Lab Review", status: "Completed", notes: "Hearing aids adjusted", duration: 30, room: "Imaging 2" },

  // Doctor 13 (Zola) - Oct/Nov
  { id: 230, doctorId: 13, patientId: 65, patientName: "Johann Schmidt", time: "09:00 AM", date: "2025-10-15", type: "Consultation", status: "Completed", notes: "DNA sequencing", duration: 45, room: "Lab 4" },
  { id: 231, doctorId: 13, patientId: 66, patientName: "Arnim Zola", time: "02:00 PM", date: "2025-11-03", type: "Lab Review", status: "Completed", notes: "Project Insight", duration: 30, room: "Lab 4" },

  // Doctor 14 (Alchemax) - Oct/Nov
  { id: 232, doctorId: 14, patientId: 67, patientName: "Miguel O'Hara", time: "08:30 AM", date: "2025-10-22", type: "Check-up", status: "Completed", notes: "Toxin levels low", duration: 30, room: "Room 500" },
  { id: 233, doctorId: 14, patientId: 68, patientName: "Lyla", time: "01:00 PM", date: "2025-11-16", type: "Video Call", status: "Completed", notes: "System diagnostic", duration: 15, room: "Virtual" },

  // Doctor 15 (Voodoo) - Oct/Nov
  { id: 234, doctorId: 15, patientId: 70, patientName: "Jericho Drumm", time: "07:30 AM", date: "2025-10-12", type: "Check-up", status: "Completed", notes: "Sorcerer supreme stress", duration: 30, room: "Room 405" },
  { id: 235, doctorId: 15, patientId: 71, patientName: "Daniel Drumm", time: "10:00 AM", date: "2025-11-09", type: "Surgery", status: "Cancelled", notes: "Spiritual intervention", duration: 120, room: "OR 5" },

  // Doctor 16 (Wu) - Oct/Nov
  { id: 236, doctorId: 16, patientId: 72, patientName: "Henry Wu", time: "08:00 AM", date: "2025-10-08", type: "Lab Review", status: "Completed", notes: "Dinosaur DNA", duration: 30, room: "Biosafety Lab 1" },
  { id: 237, doctorId: 16, patientId: 73, patientName: "Ian Malcolm", time: "11:30 AM", date: "2025-11-25", type: "Consultation", status: "Completed", notes: "Chaos theory talk", duration: 20, room: "Room 410" },

  // Doctor 17 (Octavius) - Oct/Nov
  { id: 238, doctorId: 17, patientId: 75, patientName: "Otto Octavius", time: "06:00 AM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Actuator attachment", duration: 240, room: "OR 6" },
  { id: 239, doctorId: 17, patientId: 76, patientName: "Rosie Octavius", time: "03:00 PM", date: "2025-11-14", type: "Consultation", status: "Completed", notes: "Bereavement", duration: 30, room: "Room 201" },

  // Doctor 18 (Connors) - Oct/Nov
  { id: 240, doctorId: 18, patientId: 78, patientName: "Curt Connors", time: "09:30 AM", date: "2025-10-19", type: "Check-up", status: "Completed", notes: "Arm regeneration progress", duration: 30, room: "Room 220" },
  { id: 241, doctorId: 18, patientId: 79, patientName: "Martha Connors", time: "02:00 PM", date: "2025-11-05", type: "Lab Review", status: "Completed", notes: "Lizard gene suppressed", duration: 45, room: "Lab 5" },

  // Doctor 19 (Hamilton) - Oct/Nov
  { id: 242, doctorId: 19, patientId: 81, patientName: "Alexander Pierce", time: "10:00 AM", date: "2025-10-11", type: "Check-up", status: "Completed", notes: "Age management", duration: 45, room: "Room 600" },
  { id: 243, doctorId: 19, patientId: 82, patientName: "Howard Stark", time: "01:00 PM", date: "2025-11-23", type: "Consultation", status: "Completed", notes: "Arc reactor safety", duration: 30, room: "Room 601" },

  // Doctor 20 (Storm) - Oct/Nov
  { id: 244, doctorId: 20, patientId: 84, patientName: "Sue Storm", time: "09:00 AM", date: "2025-10-26", type: "Check-up", status: "Completed", notes: "Invisibility strain", duration: 30, room: "Room 700" },
  { id: 245, doctorId: 20, patientId: 85, patientName: "Johnny Storm", time: "03:30 PM", date: "2025-11-17", type: "Consultation", status: "Completed", notes: "Burn treatment", duration: 15, room: "Room 700" },

  // Doctor 21 (Lensherr) - Oct/Nov
  { id: 246, doctorId: 21, patientId: 87, patientName: "Erik Lensherr", time: "08:30 AM", date: "2025-10-16", type: "Lab Review", status: "Completed", notes: "Magnetism effects on blood", duration: 30, room: "Room 800" },
  { id: 247, doctorId: 21, patientId: 88, patientName: "Raven Darkholme", time: "11:00 AM", date: "2025-11-04", type: "Consultation", status: "Completed", notes: "Shapeshifting cell stress", duration: 45, room: "Room 801" },

  // Doctor 22 (Mccoy) - Oct/Nov
  { id: 248, doctorId: 22, patientId: 90, patientName: "James Kirk", time: "09:00 AM", date: "2025-10-21", type: "Check-up", status: "Completed", notes: "Alien virus recovery", duration: 30, room: "Room 101" },
  { id: 249, doctorId: 22, patientId: 91, patientName: "Spock", time: "02:00 PM", date: "2025-11-30", type: "Consultation", status: "Completed", notes: "Pon Farr discussion", duration: 45, room: "Room 102" },

  // Doctor 23 (Crusher) - Oct/Nov
  { id: 250, doctorId: 23, patientId: 93, patientName: "Jean-Luc Picard", time: "08:00 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Artificial heart function", duration: 60, room: "Room 110" },
  { id: 251, doctorId: 23, patientId: 94, patientName: "William Riker", time: "10:00 AM", date: "2025-11-13", type: "Check-up", status: "Completed", notes: "Cardio from trombone playing", duration: 30, room: "Room 111" },

  // Doctor 24 (Bashir) - Oct/Nov
  { id: 252, doctorId: 24, patientId: 96, patientName: "Jake Sisko", time: "09:30 AM", date: "2025-10-14", type: "Check-up", status: "Completed", notes: "Writing cramp", duration: 30, room: "Room 212" },
  { id: 253, doctorId: 24, patientId: 97, patientName: "Nog", time: "01:00 PM", date: "2025-11-07", type: "Consultation", status: "Completed", notes: "Starfleet exam physical", duration: 20, room: "Room 213" },

  // Doctor 25 (Phlox) - Oct/Nov
  { id: 254, doctorId: 25, patientId: 99, patientName: "Jonathan Archer", time: "07:00 AM", date: "2025-10-31", type: "Consultation", status: "Completed", notes: "Future infection", duration: 45, room: "Room 320" },
  { id: 255, doctorId: 25, patientId: 100, patientName: "T'Pol", time: "10:30 AM", date: "2025-11-24", type: "Lab Review", status: "Completed", notes: "Trellium-D poisoning", duration: 30, room: "Room 321" },

  // Doctor 26 (Polaski) - Oct/Nov
  { id: 256, doctorId: 26, patientId: 102, patientName: "Katherine Pulaski", time: "08:00 AM", date: "2025-10-17", type: "Lab Review", status: "Completed", notes: "Cellular aging", duration: 60, room: "Lab 6" },
  { id: 257, doctorId: 26, patientId: 103, patientName: "Worf", time: "11:00 AM", date: "2025-11-06", type: "Consultation", status: "Completed", notes: "Honor injury", duration: 30, room: "Room 330" },

  // Doctor 27 (Troi) - Oct/Nov
  { id: 258, doctorId: 27, patientId: 105, patientName: "Deanna Troi", time: "09:00 AM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Betazoid therapy", duration: 60, room: "Room 352" },
  { id: 259, doctorId: 27, patientId: 106, patientName: "Wesley Crusher", time: "02:00 PM", date: "2025-11-20", type: "Follow-up", status: "Completed", notes: "Traveler consultation", duration: 30, room: "Room 353" },

  // Doctor 28 (The Doctor) - Oct/Nov
  { id: 260, doctorId: 28, patientId: 108, patientName: "Tom Paris", time: "08:30 AM", date: "2025-10-29", type: "Check-up", status: "Completed", notes: "Holographic matrix stability", duration: 30, room: "Sickbay 1" },
  { id: 261, doctorId: 28, patientId: 109, patientName: "Harry Kim", time: "01:30 PM", date: "2025-11-15", type: "Surgery", status: "Completed", notes: "Alien parasite removal", duration: 60, room: "Sickbay OR" },

  // Doctor 29 (Zee) - Oct/Nov
  { id: 262, doctorId: 29, patientId: 111, patientName: "Will Robinson", time: "09:00 AM", date: "2025-10-06", type: "Consultation", status: "Completed", notes: "Space anxiety", duration: 45, room: "Room 340" },
  { id: 263, doctorId: 29, patientId: 112, patientName: "Don West", time: "11:30 AM", date: "2025-11-27", type: "Check-up", status: "Completed", notes: "Dehydration", duration: 30, room: "Room 341" },

  // Doctor 30 (Smith) - Oct/Nov
  { id: 264, doctorId: 30, patientId: 114, patientName: "John Robinson", time: "10:00 AM", date: "2025-10-13", type: "Check-up", status: "Completed", notes: "General health", duration: 20, room: "Room 900" },
  { id: 265, doctorId: 30, patientId: 115, patientName: "Judy Robinson", time: "03:00 PM", date: "2025-11-01", type: "Consultation", status: "Cancelled", notes: "Sabotage", duration: 30, room: "Room 901" },

  // =========================================================
  // FUTURE DATA: MARCH & APRIL 2026
  // =========================================================

  // Doctor 1 - Mar/Apr
  { id: 300, doctorId: 1, patientId: 1, patientName: "John Smith", time: "09:00 AM", date: "2026-03-05", type: "Check-up", status: "Confirmed", notes: "Quarterly review", duration: 30, room: "Room 402" },
  { id: 302, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "02:00 PM", date: "2026-04-15", type: "Surgery", status: "Confirmed", notes: "Annual adjustment", duration: 60, room: "OR 2" },

  // Doctor 2 - Mar/Apr
  { id: 303, doctorId: 2, patientId: 128, patientName: "Clark Kent", time: "08:00 AM", date: "2026-03-10", type: "Check-up", status: "Confirmed", notes: "Kryptonite exposure check", duration: 30, room: "Room 403" },
  { id: 304, doctorId: 2, patientId: 5, patientName: "Michael Johnson", time: "11:00 AM", date: "2026-04-02", type: "Consultation", status: "Pending", notes: "Metabolism discussion", duration: 45, room: "Room 404" },
  { id: 305, doctorId: 2, patientId: 129, patientName: "Lois Lane", time: "03:30 PM", date: "2026-04-22", type: "Lab Review", status: "Confirmed", notes: "Stress markers", duration: 20, room: "Room 403" },

  // Doctor 3 - Mar/Apr
  { id: 306, doctorId: 3, patientId: 130, patientName: "Bruce Wayne", time: "07:30 AM", date: "2026-03-15", type: "Consultation", status: "Confirmed", notes: "Knee brace fitting", duration: 45, room: "Room 201" },
  { id: 307, doctorId: 3, patientId: 8, patientName: "Karen White", time: "10:00 AM", date: "2026-03-28", type: "Follow-up", status: "Pending", notes: "Physical therapy update", duration: 30, room: "Room 202" },
  { id: 308, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "01:00 PM", date: "2026-04-10", type: "Check-up", status: "Confirmed", notes: "Mobility assessment", duration: 30, room: "Room 201" },

  // Doctor 4 - Mar/Apr
  { id: 309, doctorId: 4, patientId: 131, patientName: "Damian Wayne", time: "04:00 PM", date: "2026-03-08", type: "Check-up", status: "Confirmed", notes: "School physical", duration: 20, room: "Room 210" },
  { id: 310, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "09:30 AM", date: "2026-03-20", type: "Follow-up", status: "Pending", notes: "Hearing test", duration: 15, room: "Room 211" },
  { id: 311, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "11:00 AM", date: "2026-04-05", type: "Consultation", status: "Confirmed", notes: "Nutrition plan", duration: 30, room: "Room 210" },

  // Doctor 5 - Mar/Apr
  { id: 312, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "10:15 AM", date: "2026-03-22", type: "Follow-up", status: "Confirmed", notes: "Skincare routine", duration: 20, room: "Room 220" },
  { id: 313, doctorId: 5, patientId: 132, patientName: "Victor Stone", time: "02:00 PM", date: "2026-04-12", type: "Consultation", status: "Pending", notes: "Cybernetic skin integration", duration: 45, room: "Room 221" },
  { id: 314, doctorId: 5, patientId: 12, patientName: "George Miller", time: "08:45 AM", date: "2026-04-30", type: "Check-up", status: "Confirmed", notes: "Annual screening", duration: 30, room: "Room 220" },

  // Doctor 6 - Mar/Apr
  { id: 315, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "09:00 AM", date: "2026-03-05", type: "Check-up", status: "Confirmed", notes: "Remission check", duration: 45, room: "Room 501" },
  { id: 316, doctorId: 6, patientId: 133, patientName: "T'Challa", time: "11:30 AM", date: "2026-03-18", type: "Consultation", status: "Pending", notes: "Heart-shaped herb effects", duration: 30, room: "Room 502" },
  { id: 317, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "01:00 PM", date: "2026-04-25", type: "Video Call", status: "Confirmed", notes: "Telehealth follow-up", duration: 20, room: "Virtual" },

  // Doctor 7 - Mar/Apr
  { id: 318, doctorId: 7, patientId: 134, patientName: "Wade Wilson", time: "08:00 AM", date: "2026-03-01", type: "Consultation", status: "Confirmed", notes: "Cancer regeneration", duration: 60, room: "Room 301" },
  { id: 319, doctorId: 7, patientId: 40, patientName: "Peter Parker", time: "10:00 AM", date: "2026-04-08", type: "Follow-up", status: "Pending", notes: "Spidey-sense headaches", duration: 30, room: "Room 302" },

  // Doctor 8 - Mar/Apr
  { id: 320, doctorId: 8, patientId: 45, patientName: "Bruce Banner", time: "09:30 AM", date: "2026-03-12", type: "Lab Review", status: "Confirmed", notes: "Gamma ray exposure", duration: 30, room: "Room 305" },
  { id: 321, doctorId: 8, patientId: 135, patientName: "Jennifer Walters", time: "02:30 PM", date: "2026-04-19", type: "Check-up", status: "Pending", notes: "She-Hulk blood pressure", duration: 30, room: "Room 306" },

  // Doctor 9 - Mar/Apr
  { id: 322, doctorId: 9, patientId: 50, patientName: "Jane Foster", time: "08:00 AM", date: "2026-03-25", type: "Check-up", status: "Confirmed", notes: "Thoritis symptoms", duration: 30, room: "Room 310" },
  { id: 323, doctorId: 9, patientId: 51, patientName: "Thor Odinson", time: "11:00 AM", date: "2026-04-03", type: "Consultation", status: "Pending", notes: "Mjolnir strain", duration: 45, room: "Room 311" },

  // Doctor 10 - Mar/Apr
  { id: 324, doctorId: 10, patientId: 54, patientName: "Tony Stark", time: "03:00 PM", date: "2026-03-30", type: "Consultation", status: "Confirmed", notes: "PTSD management", duration: 60, room: "Room 350" },
  { id: 325, doctorId: 10, patientId: 136, patientName: "Nebula", time: "10:00 AM", date: "2026-04-15", type: "Video Call", status: "Pending", notes: "Cyborg psychology", duration: 45, room: "Virtual" },

  // Doctor 11 - Mar/Apr
  { id: 326, doctorId: 11, patientId: 58, patientName: "Steve Rogers", time: "07:00 AM", date: "2026-03-10", type: "Consultation", status: "Confirmed", notes: "Vintage immune system", duration: 60, room: "Room 410" },
  { id: 327, doctorId: 11, patientId: 59, patientName: "Bucky Barnes", time: "09:00 AM", date: "2026-04-20", type: "Lab Review", status: "Pending", notes: "Arm tech interface", duration: 30, room: "Lab 3" },

  // Doctor 12 - Mar/Apr
  { id: 328, doctorId: 12, patientId: 61, patientName: "Helen Cho", time: "08:00 AM", date: "2026-03-15", type: "Lab Review", status: "Confirmed", notes: "Cranial scan", duration: 45, room: "Imaging 1" },
  { id: 329, doctorId: 12, patientId: 62, patientName: "Clint Barton", time: "01:00 PM", date: "2026-04-11", type: "Lab Review", status: "Pending", notes: "Wrist check", duration: 30, room: "Imaging 2" },

  // Doctor 13 - Mar/Apr
  { id: 330, doctorId: 13, patientId: 65, patientName: "Johann Schmidt", time: "09:00 AM", date: "2026-03-05", type: "Consultation", status: "Confirmed", notes: "Red skull reduction", duration: 45, room: "Lab 4" },
  { id: 331, doctorId: 13, patientId: 66, patientName: "Arnim Zola", time: "11:00 AM", date: "2026-04-22", type: "Lab Review", status: "Pending", notes: "AI upload health", duration: 30, room: "Lab 4" },

  // Doctor 14 - Mar/Apr
  { id: 332, doctorId: 14, patientId: 67, patientName: "Miguel O'Hara", time: "08:30 AM", date: "2026-03-18", type: "Check-up", status: "Confirmed", notes: "Dimensional travel sickness", duration: 30, room: "Room 500" },
  { id: 333, doctorId: 14, patientId: 68, patientName: "Lyla", time: "10:30 AM", date: "2026-04-09", type: "Video Call", status: "Pending", notes: "Software patch", duration: 15, room: "Virtual" },

  // Doctor 15 - Mar/Apr
  { id: 334, doctorId: 15, patientId: 70, patientName: "Jericho Drumm", time: "07:30 AM", date: "2026-03-22", type: "Check-up", status: "Confirmed", notes: "Spiritual health", duration: 30, room: "Room 405" },
  { id: 335, doctorId: 15, patientId: 71, patientName: "Daniel Drumm", time: "02:00 PM", date: "2026-04-14", type: "Surgery", status: "Pending", notes: "Astral cord repair", duration: 120, room: "OR 5" },

  // Doctor 16 - Mar/Apr
  { id: 336, doctorId: 16, patientId: 72, patientName: "Henry Wu", time: "08:00 AM", date: "2026-03-08", type: "Lab Review", status: "Confirmed", notes: "New hybrid embryo", duration: 30, room: "Biosafety Lab 1" },
  { id: 337, doctorId: 16, patientId: 73, patientName: "Ian Malcolm", time: "11:00 AM", date: "2026-04-05", type: "Consultation", status: "Pending", notes: "Life finds a way", duration: 20, room: "Room 410" },

  // Doctor 17 - Mar/Apr
  { id: 338, doctorId: 17, patientId: 75, patientName: "Otto Octavius", time: "06:00 AM", date: "2026-03-30", type: "Surgery", status: "Confirmed", notes: "Actuator lubrication", duration: 180, room: "OR 6" },
  { id: 339, doctorId: 17, patientId: 76, patientName: "Rosie Octavius", time: "01:00 PM", date: "2026-04-18", type: "Consultation", status: "Pending", notes: "Grief counseling", duration: 30, room: "Room 201" },

  // Doctor 18 - Mar/Apr
  { id: 340, doctorId: 18, patientId: 78, patientName: "Curt Connors", time: "09:30 AM", date: "2026-03-12", type: "Check-up", status: "Confirmed", notes: "Lizard monitoring", duration: 30, room: "Room 220" },
  { id: 341, doctorId: 18, patientId: 79, patientName: "Martha Connors", time: "10:00 AM", date: "2026-04-25", type: "Lab Review", status: "Pending", notes: "Gene therapy results", duration: 45, room: "Lab 5" },

  // Doctor 19 - Mar/Apr
  { id: 342, doctorId: 19, patientId: 81, patientName: "Alexander Pierce", time: "10:00 AM", date: "2026-03-16", type: "Check-up", status: "Confirmed", notes: "Senior wellness", duration: 45, room: "Room 600" },
  { id: 343, doctorId: 19, patientId: 82, patientName: "Howard Stark", time: "02:00 PM", date: "2026-04-06", type: "Consultation", status: "Pending", notes: "Time travel fatigue", duration: 30, room: "Room 601" },

  // Doctor 20 - Mar/Apr
  { id: 344, doctorId: 20, patientId: 84, patientName: "Sue Storm", time: "09:00 AM", date: "2026-03-20", type: "Check-up", status: "Confirmed", notes: "Force field fatigue", duration: 30, room: "Room 700" },
  { id: 345, doctorId: 20, patientId: 85, patientName: "Johnny Storm", time: "04:00 PM", date: "2026-04-10", type: "Consultation", status: "Pending", notes: "Flame on check", duration: 15, room: "Room 700" },

  // Doctor 21 - Mar/Apr
  { id: 346, doctorId: 21, patientId: 87, patientName: "Erik Lensherr", time: "08:30 AM", date: "2026-03-25", type: "Lab Review", status: "Confirmed", notes: "Magnetic field exposure", duration: 30, room: "Room 800" },
  { id: 347, doctorId: 21, patientId: 88, patientName: "Raven Darkholme", time: "11:30 AM", date: "2026-04-15", type: "Consultation", status: "Pending", notes: "Blue skin condition", duration: 45, room: "Room 801" },

  // Doctor 22 - Mar/Apr
  { id: 348, doctorId: 22, patientId: 90, patientName: "James Kirk", time: "09:00 AM", date: "2026-03-28", type: "Check-up", status: "Confirmed", notes: "Captain's physical", duration: 30, room: "Room 101" },
  { id: 349, doctorId: 22, patientId: 91, patientName: "Spock", time: "02:30 PM", date: "2026-04-12", type: "Consultation", status: "Pending", notes: "Logic center scan", duration: 45, room: "Room 102" },

  // Doctor 23 - Mar/Apr
  { id: 350, doctorId: 23, patientId: 93, patientName: "Jean-Luc Picard", time: "08:00 AM", date: "2026-03-05", type: "Consultation", status: "Confirmed", notes: "Artificial heart replacement", duration: 60, room: "Room 110" },
  { id: 351, doctorId: 23, patientId: 94, patientName: "William Riker", time: "10:30 AM", date: "2026-04-02", type: "Check-up", status: "Pending", notes: "Imzadi check", duration: 30, room: "Room 111" },

  // Doctor 24 - Mar/Apr
  { id: 352, doctorId: 24, patientId: 96, patientName: "Jake Sisko", time: "09:30 AM", date: "2026-03-10", type: "Check-up", status: "Confirmed", notes: "Writer's block", duration: 30, room: "Room 212" },
  { id: 353, doctorId: 24, patientId: 97, patientName: "Nog", time: "01:00 PM", date: "2026-04-20", type: "Consultation", status: "Pending", notes: "Ferengi ear ache", duration: 20, room: "Room 213" },

  // Doctor 25 - Mar/Apr
  { id: 354, doctorId: 25, patientId: 99, patientName: "Jonathan Archer", time: "07:00 AM", date: "2026-03-15", type: "Consultation", status: "Confirmed", notes: "Porthos checkup", duration: 45, room: "Room 320" },
  { id: 355, doctorId: 25, patientId: 100, patientName: "T'Pol", time: "02:00 PM", date: "2026-04-08", type: "Lab Review", status: "Pending", notes: "Neural pressure", duration: 30, room: "Room 321" },

  // Doctor 26 - Mar/Apr
  { id: 356, doctorId: 26, patientId: 102, patientName: "Katherine Pulaski", time: "08:00 AM", date: "2026-03-22", type: "Lab Review", status: "Confirmed", notes: "Retrovirus analysis", duration: 60, room: "Lab 6" },
  { id: 357, doctorId: 26, patientId: 103, patientName: "Worf", time: "11:00 AM", date: "2026-04-18", type: "Consultation", status: "Pending", notes: "Bat'leth injury", duration: 30, room: "Room 330" },

  // Doctor 27 - Mar/Apr
  { id: 358, doctorId: 27, patientId: 105, patientName: "Deanna Troi", time: "09:00 AM", date: "2026-03-08", type: "Consultation", status: "Confirmed", notes: "Mother issues", duration: 60, room: "Room 352" },
  { id: 359, doctorId: 27, patientId: 106, patientName: "Wesley Crusher", time: "03:00 PM", date: "2026-04-28", type: "Follow-up", status: "Pending", notes: "Traveler updates", duration: 30, room: "Room 353" },

  // Doctor 28 - Mar/Apr
  { id: 360, doctorId: 28, patientId: 108, patientName: "Tom Paris", time: "08:30 AM", date: "2026-03-12", type: "Check-up", status: "Confirmed", notes: "Pilot reflexes", duration: 30, room: "Sickbay 1" },
  { id: 361, doctorId: 28, patientId: 109, patientName: "Harry Kim", time: "10:00 AM", date: "2026-04-05", type: "Surgery", status: "Pending", notes: "Routine appendectomy", duration: 60, room: "Sickbay OR" },

  // Doctor 29 - Mar/Apr
  { id: 362, doctorId: 29, patientId: 111, patientName: "Will Robinson", time: "09:00 AM", date: "2026-03-20", type: "Consultation", status: "Confirmed", notes: "Robot interaction", duration: 45, room: "Room 340" },
  { id: 363, doctorId: 29, patientId: 112, patientName: "Don West", time: "01:30 PM", date: "2026-04-15", type: "Check-up", status: "Pending", notes: "Jupiter 2 mold", duration: 30, room: "Room 341" },

  // Doctor 30 - Mar/Apr
  { id: 364, doctorId: 30, patientId: 114, patientName: "John Robinson", time: "10:00 AM", date: "2026-03-25", type: "Check-up", status: "Confirmed", notes: "Command physical", duration: 20, room: "Room 900" },
  { id: 365, doctorId: 30, patientId: 115, patientName: "Judy Robinson", time: "02:00 PM", date: "2026-04-12", type: "Consultation", status: "Pending", notes: "Medical residency interview", duration: 30, room: "Room 901" },

  // =========================================================
  // BATCH 1: ADDITIONAL PATIENTS (DOCTORS 1-10)
  // Status: Completed (Oct-Dec 2025), Confirmed/Pending (Jan-Mar 2026)
  // =========================================================

  // DOCTOR 1: Dr. Smith (Cardiology)
  { id: 366, doctorId: 1, patientId: 200, patientName: "Harvey Dent", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "BP monitoring stable", duration: 30, room: "Room 402" },
  { id: 367, doctorId: 1, patientId: 201, patientName: "Grace Jones", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Arrhythmia discussion", duration: 45, room: "Room 401" },
  { id: 368, doctorId: 1, patientId: 202, patientName: "Nick Fury", time: "02:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Post-stent check", duration: 30, room: "Room 402" },
  { id: 369, doctorId: 1, patientId: 203, patientName: "Maria Hill", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Cholesterol results", duration: 20, room: "Lab 1" },
  { id: 370, doctorId: 1, patientId: 204, patientName: "Phil Coulson", time: "03:30 PM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Minor heart repair", duration: 90, room: "OR 2" },

  { id: 371, doctorId: 1, patientId: 205, patientName: "Peggy Carter", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Geriatric cardio", duration: 30, room: "Room 402" },
  { id: 372, doctorId: 1, patientId: 206, patientName: "Dum Dum Dugan", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Blood pressure", duration: 30, room: "Room 401" },
  { id: 373, doctorId: 1, patientId: 207, patientName: "Jasper Sitwell", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Medication adjustment", duration: 20, room: "Room 402" },
  { id: 374, doctorId: 1, patientId: 208, patientName: "Brock Rumlow", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Stress test analysis", duration: 30, room: "Lab 1" },
  { id: 375, doctorId: 1, patientId: 209, patientName: "Jack Rollins", time: "02:30 PM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Cardiac ablation", duration: 120, room: "OR 2" },

  { id: 376, doctorId: 1, patientId: 210, patientName: "Sharon Carter", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Routine annual", duration: 30, room: "Room 402" },
  { id: 377, doctorId: 1, patientId: 211, patientName: "Alexander Pierce", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Executive physical", duration: 45, room: "Room 401" },
  { id: 378, doctorId: 1, patientId: 212, patientName: "John Garrett", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Pacemaker check", duration: 30, room: "Room 402" },
  { id: 379, doctorId: 1, patientId: 213, patientName: "Grant Ward", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Enzyme levels", duration: 20, room: "Lab 1" },
  { id: 380, doctorId: 1, patientId: 214, patientName: "Kara Palamas", time: "01:45 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Valve replacement", duration: 180, room: "OR 2" },

  { id: 381, doctorId: 1, patientId: 215, patientName: "Bobbi Morse", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Confirmed", notes: "Athlete heart screening", duration: 30, room: "Room 402" },
  { id: 382, doctorId: 1, patientId: 216, patientName: "Lance Hunter", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Pending", notes: "Chest pain evaluation", duration: 45, room: "Room 401" },
  { id: 383, doctorId: 1, patientId: 217, patientName: "Alphonso Mackenzie", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Confirmed", notes: "Post-surgery healing", duration: 30, room: "Room 402" },
  { id: 384, doctorId: 1, patientId: 218, patientName: "Elena Rodriguez", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Pending", notes: "Blood work review", duration: 20, room: "Lab 1" },
  { id: 385, doctorId: 1, patientId: 219, patientName: "Yo-Yo Rodriguez", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Confirmed", notes: "Irregular heartbeat", duration: 30, room: "Room 401" },

  { id: 386, doctorId: 1, patientId: 220, patientName: "Leo Fitz", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Pending", notes: "Anxiety related palpitations", duration: 45, room: "Room 402" },
  { id: 387, doctorId: 1, patientId: 221, patientName: "Jemma Simmons", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Confirmed", notes: "Viral myocarditis recovery", duration: 30, room: "Room 401" },
  { id: 388, doctorId: 1, patientId: 222, patientName: "Deke Shaw", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Pending", notes: "Genetic anomaly check", duration: 30, room: "Lab 1" },
  { id: 389, doctorId: 1, patientId: 223, patientName: "Daisy Johnson", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Confirmed", notes: "Hypertension", duration: 30, room: "Room 402" },
  { id: 390, doctorId: 1, patientId: 224, patientName: "Lincoln Campbell", time: "11:00 AM", date: "2026-02-27", type: "Surgery", status: "Pending", notes: "Defibrillator implant", duration: 120, room: "OR 2" },

  { id: 391, doctorId: 1, patientId: 225, patientName: "Raina", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Confirmed", notes: "DNA mutation effects", duration: 45, room: "Room 402" },
  { id: 392, doctorId: 1, patientId: 226, patientName: "Calvin Zabo", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Pending", notes: "Stress monitoring", duration: 30, room: "Room 401" },
  { id: 393, doctorId: 1, patientId: 227, patientName: "Jiaying", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Confirmed", notes: "Regeneration effects", duration: 20, room: "Lab 1" },
  { id: 394, doctorId: 1, patientId: 228, patientName: "Gordon", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Pending", notes: "Teleportation strain", duration: 30, room: "Room 402" },
  { id: 395, doctorId: 1, patientId: 229, patientName: "Alisha Whitley", time: "09:30 AM", date: "2026-03-31", type: "Consultation", status: "Confirmed", notes: "Dizziness", duration: 45, room: "Room 401" },

  // DOCTOR 2: Dr. Johnson (Cardiology)
  { id: 396, doctorId: 2, patientId: 230, patientName: "Diana Prince", time: "09:00 AM", date: "2025-10-01", type: "Check-up", status: "Completed", notes: "Olympian physiology", duration: 30, room: "Room 403" },
  { id: 397, doctorId: 2, patientId: 231, patientName: "Steve Trevor", time: "10:30 AM", date: "2025-10-08", type: "Consultation", status: "Completed", notes: "Pilot stress test", duration: 45, room: "Room 404" },
  { id: 398, doctorId: 2, patientId: 232, patientName: "Etta Candy", time: "01:00 PM", date: "2025-10-15", type: "Follow-up", status: "Completed", notes: "Diabetes management", duration: 20, room: "Room 403" },
  { id: 399, doctorId: 2, patientId: 233, patientName: "Barbara Minerva", time: "11:00 AM", date: "2025-10-22", type: "Lab Review", status: "Completed", notes: "Blood disorder", duration: 20, room: "Lab 1" },
  { id: 400, doctorId: 2, patientId: 234, patientName: "Maxwell Lord", time: "02:30 PM", date: "2025-10-29", type: "Surgery", status: "Completed", notes: "Bypass surgery", duration: 180, room: "OR 2" },

  { id: 401, doctorId: 2, patientId: 235, patientName: "Charlie", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Flu shot", duration: 15, room: "Room 403" },
  { id: 402, doctorId: 2, patientId: 236, patientName: "Sameer", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Infection check", duration: 30, room: "Room 404" },
  { id: 403, doctorId: 2, patientId: 237, patientName: "Chief", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Wound healing", duration: 20, room: "Room 403" },
  { id: 404, doctorId: 2, patientId: 238, patientName: "Napi", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Liver function", duration: 20, room: "Lab 1" },
  { id: 405, doctorId: 2, patientId: 239, patientName: "Sir Patrick Morgan", time: "02:30 PM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Heart transplant", duration: 240, room: "OR 2" },

  { id: 406, doctorId: 2, patientId: 240, patientName: "Asteria", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Immortal checkup", duration: 30, room: "Room 403" },
  { id: 407, doctorId: 2, patientId: 241, patientName: "Hippolyta", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Queen health", duration: 45, room: "Room 404" },
  { id: 408, doctorId: 2, patientId: 242, patientName: "Antiope", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Battle scars", duration: 30, room: "Room 403" },
  { id: 409, doctorId: 2, patientId: 243, patientName: "Menalippe", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Ambrosia levels", duration: 20, room: "Lab 1" },
  { id: 410, doctorId: 2, patientId: 244, patientName: "Orana", time: "01:45 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Arrow removal", duration: 60, room: "OR 2" },

  { id: 411, doctorId: 2, patientId: 245, patientName: "Cheetah", time: "08:30 AM", date: "2026-01-06", type: "Check-up", status: "Pending", notes: "Animal mutation", duration: 30, room: "Room 403" },
  { id: 412, doctorId: 2, patientId: 246, patientName: "Dr. Poison", time: "10:00 AM", date: "2026-01-13", type: "Consultation", status: "Confirmed", notes: "Toxic gas exposure", duration: 45, room: "Room 404" },
  { id: 413, doctorId: 2, patientId: 247, patientName: "Ludendorff", time: "02:00 PM", date: "2026-01-20", type: "Follow-up", status: "Pending", notes: "Gas recovery", duration: 30, room: "Room 403" },
  { id: 414, doctorId: 2, patientId: 248, patientName: "Danny", time: "11:30 AM", date: "2026-01-27", type: "Lab Review", status: "Confirmed", notes: "Growth hormone", duration: 20, room: "Lab 1" },
  { id: 415, doctorId: 2, patientId: 249, patientName: "Carol Ferris", time: "03:30 PM", date: "2026-01-29", type: "Check-up", status: "Pending", notes: "Star Sapphire heart", duration: 30, room: "Room 401" },

  { id: 416, doctorId: 2, patientId: 250, patientName: "Hal Jordan", time: "09:00 AM", date: "2026-02-03", type: "Consultation", status: "Confirmed", notes: "Willpower exertion", duration: 45, room: "Room 402" },
  { id: 417, doctorId: 2, patientId: 251, patientName: "Sinestro", time: "10:45 AM", date: "2026-02-10", type: "Follow-up", status: "Pending", notes: "Fear toxin effects", duration: 30, room: "Room 403" },
  { id: 418, doctorId: 2, patientId: 252, patientName: "Guy Gardner", time: "01:00 PM", date: "2026-02-17", type: "Lab Review", status: "Confirmed", notes: "Rage levels", duration: 30, room: "Lab 1" },
  { id: 419, doctorId: 2, patientId: 253, patientName: "Kyle Rayner", time: "02:30 PM", date: "2026-02-24", type: "Check-up", status: "Pending", notes: "Creativity block", duration: 30, room: "Room 404" },
  { id: 420, doctorId: 2, patientId: 254, patientName: "John Stewart", time: "11:00 AM", date: "2026-02-26", type: "Surgery", status: "Confirmed", notes: "Sniper wrist injury", duration: 120, room: "OR 2" },

  { id: 421, doctorId: 2, patientId: 255, patientName: "Jessica Cruz", time: "08:00 AM", date: "2026-03-05", type: "Consultation", status: "Pending", notes: "Anxiety treatment", duration: 45, room: "Room 403" },
  { id: 422, doctorId: 2, patientId: 256, patientName: "Simon Baz", time: "10:30 AM", date: "2026-03-12", type: "Follow-up", status: "Confirmed", notes: "Car accident trauma", duration: 30, room: "Room 404" },
  { id: 423, doctorId: 2, patientId: 257, patientName: "Kilowog", time: "01:15 PM", date: "2026-03-19", type: "Lab Review", status: "Pending", notes: "Alien physiology", duration: 20, room: "Lab 1" },
  { id: 424, doctorId: 2, patientId: 258, patientName: "Tomar-Re", time: "03:00 PM", date: "2026-03-26", type: "Check-up", status: "Confirmed", notes: "Eye strain", duration: 30, room: "Room 403" },
  { id: 425, doctorId: 2, patientId: 259, patientName: "Abin Sur", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Crash recovery", duration: 45, room: "Room 402" },

  // DOCTOR 3: Dr. Emily Davis (Orthopedics)
  { id: 426, doctorId: 3, patientId: 260, patientName: "Arthur Curry", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Swimmer's shoulder", duration: 30, room: "Room 201" },
  { id: 427, doctorId: 3, patientId: 261, patientName: "Mera", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Joint hydration", duration: 45, room: "Room 202" },
  { id: 428, doctorId: 3, patientId: 262, patientName: "Orm", time: "01:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Fractured rib", duration: 30, room: "Room 201" },
  { id: 429, doctorId: 3, patientId: 263, patientName: "Vulko", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Bone density scan", duration: 20, room: "Imaging" },
  { id: 430, doctorId: 3, patientId: 264, patientName: "Black Manta", time: "02:30 PM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Leg reconstruction", duration: 180, room: "OR 3" },

  { id: 431, doctorId: 3, patientId: 265, patientName: "Victor Stone", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Cybernetic limb check", duration: 30, room: "Room 201" },
  { id: 432, doctorId: 3, patientId: 266, patientName: "Silas Stone", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Prosthetic tuning", duration: 45, room: "Room 202" },
  { id: 433, doctorId: 3, patientId: 267, patientName: "Elinore Stone", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Grief counseling", duration: 30, room: "Room 201" },
  { id: 434, doctorId: 3, patientId: 268, patientName: "S.T.A.R. Labs Tech", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Metal fatigue", duration: 20, room: "Lab 1" },
  { id: 435, doctorId: 3, patientId: 269, patientName: "Ronnie Raymond", time: "02:30 PM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Burn scar tissue", duration: 120, room: "OR 3" },

  { id: 436, doctorId: 3, patientId: 270, patientName: "Martin Stein", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Back pain", duration: 30, room: "Room 201" },
  { id: 437, doctorId: 3, patientId: 271, patientName: "Jefferson Jackson", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Firestorm separation pain", duration: 45, room: "Room 202" },
  { id: 438, doctorId: 3, patientId: 272, patientName: "Mick Rory", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Arthritis flare up", duration: 30, room: "Room 201" },
  { id: 439, doctorId: 3, patientId: 273, patientName: "Leonard Snart", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Frostbite check", duration: 20, room: "Imaging" },
  { id: 440, doctorId: 3, patientId: 274, patientName: "Ray Palmer", time: "01:45 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Shrinking side effects", duration: 60, room: "OR 3" },

  { id: 441, doctorId: 3, patientId: 275, patientName: "Nate Heywood", time: "08:30 AM", date: "2026-01-08", type: "Check-up", status: "Confirmed", notes: "Steel leg maintenance", duration: 30, room: "Room 201" },
  { id: 442, doctorId: 3, patientId: 276, patientName: "Amaya Jiwe", time: "10:00 AM", date: "2026-01-15", type: "Consultation", status: "Pending", notes: "Ankle sprain", duration: 45, room: "Room 202" },
  { id: 443, doctorId: 3, patientId: 277, patientName: "Rip Hunter", time: "02:00 PM", date: "2026-01-22", type: "Follow-up", status: "Confirmed", notes: "Time travel fatigue", duration: 30, room: "Room 201" },
  { id: 444, doctorId: 3, patientId: 278, patientName: "Sara Lance", time: "11:30 AM", date: "2026-01-29", type: "Lab Review", status: "Pending", notes: "Leg muscle tear", duration: 20, room: "Imaging" },
  { id: 445, doctorId: 3, patientId: 279, patientName: "John Constantine", time: "03:30 PM", date: "2026-01-31", type: "Check-up", status: "Confirmed", notes: "Lung damage (smoke)", duration: 30, room: "Room 202" },

  { id: 446, doctorId: 3, patientId: 280, patientName: "Zari Tarazi", time: "09:00 AM", date: "2026-02-05", type: "Consultation", status: "Pending", notes: "Wind totem joint stress", duration: 45, room: "Room 201" },
  { id: 447, doctorId: 3, patientId: 281, patientName: "Behrad Tarazi", time: "10:45 AM", date: "2026-02-12", type: "Follow-up", status: "Confirmed", notes: "Neck strain", duration: 30, room: "Room 202" },
  { id: 448, doctorId: 3, patientId: 282, patientName: "Charlie", time: "01:00 PM", date: "2026-02-19", type: "Lab Review", status: "Pending", notes: "Shapeshifting bone ache", duration: 30, room: "Imaging" },
  { id: 449, doctorId: 3, patientId: 283, patientName: "Ava Sharpe", time: "02:30 PM", date: "2026-02-26", type: "Check-up", status: "Confirmed", notes: "Clone alignment", duration: 30, room: "Room 201" },
  { id: 450, doctorId: 3, patientId: 284, patientName: "Gary Green", time: "11:00 AM", date: "2026-02-28", type: "Surgery", status: "Pending", notes: "Finger reattachment", duration: 90, room: "OR 3" },

  { id: 451, doctorId: 3, patientId: 285, patientName: "Nora Darhk", time: "08:00 AM", date: "2026-03-07", type: "Consultation", status: "Confirmed", notes: "Demon arm ache", duration: 45, room: "Room 201" },
  { id: 452, doctorId: 3, patientId: 286, patientName: "Ray Terrill", time: "10:30 AM", date: "2026-03-14", type: "Follow-up", status: "Pending", notes: "Photophobic reaction", duration: 30, room: "Room 202" },
  { id: 453, doctorId: 3, patientId: 287, patientName: "Courtney Whitmore", time: "01:15 PM", date: "2026-03-21", type: "Lab Review", status: "Confirmed", notes: "Staff impact bruising", duration: 20, room: "Imaging" },
  { id: 454, doctorId: 3, patientId: 288, patientName: "Pat Dugan", time: "03:00 PM", date: "2026-03-28", type: "Check-up", status: "Pending", notes: "Old age mobility", duration: 30, room: "Room 201" },
  { id: 455, doctorId: 3, patientId: 289, patientName: "Yolanda Montez", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Confirmed", notes: "Wrist surgery consult", duration: 45, room: "Room 202" },

  // DOCTOR 4: Dr. James Wilson (Pediatrics)
  { id: 456, doctorId: 4, patientId: 290, patientName: "Damian Wayne", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "School physical", duration: 20, room: "Room 210" },
  { id: 457, doctorId: 4, patientId: 291, patientName: "Jon Kent", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Super hearing headache", duration: 30, room: "Room 211" },
  { id: 458, doctorId: 4, patientId: 292, patientName: "Billy Batson", time: "01:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Cured cold", duration: 20, room: "Room 210" },
  { id: 459, doctorId: 4, patientId: 293, patientName: "Mary Bromfield", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Blood work normal", duration: 15, room: "Lab 1" },
  { id: 460, doctorId: 4, patientId: 294, patientName: "Freeman", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Telehealth check", duration: 15, room: "Virtual" },

  { id: 461, doctorId: 4, patientId: 295, patientName: "Eugene Choi", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Dental referral", duration: 20, room: "Room 210" },
  { id: 462, doctorId: 4, patientId: 296, patientName: "Pedro Pena", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Stomach ache", duration: 30, room: "Room 211" },
  { id: 463, doctorId: 4, patientId: 297, patientName: "Darla Dudley", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Flu shot reaction", duration: 20, room: "Room 210" },
  { id: 464, doctorId: 4, patientId: 298, patientName: "Tawny", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Vet check co-ord", duration: 15, room: "Lab 1" },
  { id: 465, doctorId: 4, patientId: 299, patientName: "Hippolyta (Tina)", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Growth spurt", duration: 30, room: "Room 211" },

  { id: 466, doctorId: 4, patientId: 300, patientName: "Wallace West", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Metabolism check", duration: 20, room: "Room 210" },
  { id: 467, doctorId: 4, patientId: 301, patientName: "Iris West II", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Time sickness", duration: 30, room: "Room 211" },
  { id: 468, doctorId: 4, patientId: 302, patientName: "Jai West", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Knee scrape", duration: 20, room: "Room 210" },
  { id: 469, doctorId: 4, patientId: 303, patientName: "Bartholomew II", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Speedster gene", duration: 15, room: "Lab 1" },
  { id: 470, doctorId: 4, patientId: 304, patientName: "Dawn Allen", time: "01:45 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Vision test", duration: 20, room: "Room 211" },

  { id: 471, doctorId: 4, patientId: 305, patientName: "Don Allen", time: "08:30 AM", date: "2026-01-07", type: "Consultation", status: "Confirmed", notes: "Tinnitus", duration: 30, room: "Room 210" },
  { id: 472, doctorId: 4, patientId: 306, patientName: "Jenni Ognats", time: "10:00 AM", date: "2026-01-14", type: "Follow-up", status: "Pending", notes: "X-ray clear", duration: 20, room: "Room 211" },
  { id: 473, doctorId: 4, patientId: 307, patientName: "XS", time: "02:00 PM", date: "2026-01-21", type: "Check-up", status: "Confirmed", notes: "Sports physical", duration: 20, room: "Room 210" },
  { id: 474, doctorId: 4, patientId: 308, patientName: "Impulse", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Pending", notes: "ADHD consult", duration: 15, room: "Lab 1" },
  { id: 475, doctorId: 4, patientId: 309, patientName: "Max Mercury", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Confirmed", notes: "Age regression", duration: 20, room: "Room 211" },

  { id: 476, doctorId: 4, patientId: 310, patientName: "Joan Garrick", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Pending", notes: "Joint pain", duration: 30, room: "Room 210" },
  { id: 477, doctorId: 4, patientId: 311, patientName: "Jay Garrick", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Confirmed", notes: "Memory check", duration: 20, room: "Room 211" },
  { id: 478, doctorId: 4, patientId: 312, patientName: "Jesse Quick", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Pending", notes: "Blood pressure", duration: 15, room: "Lab 1" },
  { id: 479, doctorId: 4, patientId: 313, patientName: "Liberty Belle", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Confirmed", notes: "Vaccination", duration: 20, room: "Room 210" },
  { id: 480, doctorId: 4, patientId: 314, patientName: "Lia Nelson", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Pending", notes: "Tele-derm", duration: 15, room: "Virtual" },

  { id: 481, doctorId: 4, patientId: 315, patientName: "Meena Dhawan", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Confirmed", notes: "Speed force allergy", duration: 30, room: "Room 210" },
  { id: 482, doctorId: 4, patientId: 316, patientName: "August Heart", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Pending", notes: "Phantom limb", duration: 20, room: "Room 211" },
  { id: 483, doctorId: 4, patientId: 317, patientName: "Daniel West", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Confirmed", notes: "Drug test", duration: 15, room: "Lab 1" },
  { id: 484, doctorId: 4, patientId: 318, patientName: "Wally West (Earth 2)", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Pending", notes: "Lightning scar", duration: 20, room: "Room 210" },
  { id: 485, doctorId: 4, patientId: 319, patientName: "Bart Allen", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Confirmed", notes: "Growth spurt", duration: 30, room: "Room 211" },

  // DOCTOR 5: Dr. Lisa Anderson (Dermatology)
  { id: 486, doctorId: 5, patientId: 320, patientName: "Bruce Wayne", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Scar tissue treatment", duration: 30, room: "Room 220" },
  { id: 487, doctorId: 5, patientId: 321, patientName: "Selina Kyle", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Leather chaffing", duration: 30, room: "Room 221" },
  { id: 488, doctorId: 5, patientId: 322, patientName: "Dick Grayson", time: "01:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Acne flare up", duration: 20, room: "Room 220" },
  { id: 489, doctorId: 5, patientId: 323, patientName: "Jason Todd", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "White hair pigment", duration: 20, room: "Lab 1" },
  { id: 490, doctorId: 5, patientId: 324, patientName: "Tim Drake", time: "02:30 PM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Mole removal", duration: 30, room: "Room 221" },

  { id: 491, doctorId: 5, patientId: 325, patientName: "Damian Wayne", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Rash on back", duration: 20, room: "Room 220" },
  { id: 492, doctorId: 5, patientId: 326, patientName: "Alfred Pennyworth", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Age spots", duration: 30, room: "Room 221" },
  { id: 493, doctorId: 5, patientId: 327, patientName: "James Gordon", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Sun damage", duration: 20, room: "Room 220" },
  { id: 494, doctorId: 5, patientId: 328, patientName: "Barbara Gordon", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Eczema", duration: 20, room: "Lab 1" },
  { id: 495, doctorId: 5, patientId: 329, patientName: "Leslie Thompkins", time: "02:30 PM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Cyst removal", duration: 45, room: "Room 221" },

  { id: 496, doctorId: 5, patientId: 330, patientName: "Lucius Fox", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Skin tag removal", duration: 20, room: "Room 220" },
  { id: 497, doctorId: 5, patientId: 331, patientName: "Harvey Dent", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Facial reconstruction", duration: 45, room: "Room 221" },
  { id: 498, doctorId: 5, patientId: 332, patientName: "Riddler", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Question mark rash", duration: 30, room: "Room 220" },
  { id: 499, doctorId: 5, patientId: 333, patientName: "Joker", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Chlorosis", duration: 20, room: "Lab 1" },
  { id: 500, doctorId: 5, patientId: 334, patientName: "Penguin", time: "01:45 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Wart treatment", duration: 30, room: "Room 221" },

  { id: 501, doctorId: 5, patientId: 335, patientName: "Poison Ivy", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Leaf mould", duration: 30, room: "Room 220" },
  { id: 502, doctorId: 5, patientId: 336, patientName: "Bane", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Venom scarring", duration: 45, room: "Room 221" },
  { id: 503, doctorId: 5, patientId: 337, patientName: "Killer Croc", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Scale shedding", duration: 30, room: "Room 220" },
  { id: 504, doctorId: 5, patientId: 338, patientName: "Scarecrow", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Mask irritation", duration: 20, room: "Lab 1" },
  { id: 505, doctorId: 5, patientId: 339, patientName: "Ra's Al Ghul", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Lazarus pit rash", duration: 30, room: "Room 221" },

  { id: 506, doctorId: 5, patientId: 340, patientName: "Talia Al Ghul", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Lip filler consult", duration: 30, room: "Room 220" },
  { id: 507, doctorId: 5, patientId: 341, patientName: "David Cain", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Callus removal", duration: 30, room: "Room 221" },
  { id: 508, doctorId: 5, patientId: 342, patientName: "Cassandra Cain", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Biopsy", duration: 20, room: "Lab 1" },
  { id: 509, doctorId: 5, patientId: 343, patientName: "Onomatopoeia", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Silent treatment", duration: 20, room: "Room 220" },
  { id: 510, doctorId: 5, patientId: 344, patientName: "Hush", time: "11:00 AM", date: "2026-02-27", type: "Surgery", status: "Confirmed", notes: "Face surgery revision", duration: 120, room: "Room 221" },

  { id: 511, doctorId: 5, patientId: 345, patientName: "Black Mask", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Burn care", duration: 45, room: "Room 220" },
  { id: 512, doctorId: 5, patientId: 346, patientName: "Firefly", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Burn graft", duration: 30, room: "Room 221" },
  { id: 513, doctorId: 5, patientId: 347, patientName: "Clayface", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Mud analysis", duration: 20, room: "Lab 1" },
  { id: 514, doctorId: 5, patientId: 348, patientName: "Mr. Freeze", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Frostbite treatment", duration: 30, room: "Room 220" },
  { id: 515, doctorId: 5, patientId: 349, patientName: "Victor Fries", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Cryosurgery", duration: 45, room: "Room 221" },

  // DOCTOR 6: Dr. Robert Taylor (Oncology)
  { id: 516, doctorId: 6, patientId: 350, patientName: "Frank Castle", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Bullet wound recovery", duration: 45, room: "Room 501" },
  { id: 517, doctorId: 6, patientId: 351, patientName: "Karen Page", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Second opinion", duration: 45, room: "Room 502" },
  { id: 518, doctorId: 6, patientId: 352, patientName: "Matt Murdock", time: "01:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Rad exposure", duration: 30, room: "Room 501" },
  { id: 519, doctorId: 6, patientId: 353, patientName: "Foggy Nelson", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Tumor markers", duration: 20, room: "Lab 1" },
  { id: 520, doctorId: 6, patientId: 354, patientName: "Elektra", time: "02:30 PM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Resurrection side effects", duration: 180, room: "OR 1" },

  { id: 521, doctorId: 6, patientId: 355, patientName: "Stick", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Blindness consult", duration: 45, room: "Room 501" },
  { id: 522, doctorId: 6, patientId: 356, patientName: "Kingpin", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Obesity related", duration: 45, room: "Room 502" },
  { id: 523, doctorId: 6, patientId: 357, patientName: "Ben Urich", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Lung cancer", duration: 30, room: "Room 501" },
  { id: 524, doctorId: 6, patientId: 358, patientName: "Turk Barrett", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Infection check", duration: 20, room: "Lab 1" },
  { id: 525, doctorId: 6, patientId: 359, patientName: "Melvin Potter", time: "02:30 PM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Arm nerve repair", duration: 120, room: "OR 1" },

  { id: 526, doctorId: 6, patientId: 360, patientName: "Claire Temple", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Night shift fatigue", duration: 30, room: "Room 501" },
  { id: 527, doctorId: 6, patientId: 361, patientName: "Colleen Wing", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Hand injury", duration: 45, room: "Room 502" },
  { id: 528, doctorId: 6, patientId: 362, patientName: "Misty Knight", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Arm prosthetic", duration: 30, room: "Room 501" },
  { id: 529, doctorId: 6, patientId: 363, patientName: "Luke Cage", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Unbreakable skin study", duration: 20, room: "Lab 1" },
  { id: 530, doctorId: 6, patientId: 364, patientName: "Bobby Fish", time: "01:45 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Hip replacement", duration: 120, room: "OR 1" },

  { id: 531, doctorId: 6, patientId: 365, patientName: "Iron Fist", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Chi depletion", duration: 45, room: "Room 501" },
  { id: 532, doctorId: 6, patientId: 366, patientName: "Davos", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Steel hand pain", duration: 45, room: "Room 502" },
  { id: 533, doctorId: 6, patientId: 367, patientName: "Joy Meachum", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Stress rash", duration: 30, room: "Room 501" },
  { id: 534, doctorId: 6, patientId: 368, patientName: "Ward Meachum", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Toxicology", duration: 20, room: "Lab 1" },
  { id: 535, doctorId: 6, patientId: 369, patientName: "Harold Meachum", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Cancer remission", duration: 30, room: "Room 502" },

  { id: 536, doctorId: 6, patientId: 370, patientName: "Trish Walker", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Inhalant toxins", duration: 45, room: "Room 501" },
  { id: 537, doctorId: 6, patientId: 371, patientName: "Jessica Jones", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Alcohol liver scan", duration: 30, room: "Room 502" },
  { id: 538, doctorId: 6, patientId: 372, patientName: "Malcolm Ducasse", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Kidney function", duration: 20, room: "Lab 1" },
  { id: 539, doctorId: 6, patientId: 373, patientName: "Jeri Hogarth", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "MS checkup", duration: 30, room: "Room 501" },
  { id: 540, doctorId: 6, patientId: 374, patientName: "Pamela", time: "11:00 AM", date: "2026-02-27", type: "Surgery", status: "Confirmed", notes: "Tumor removal", duration: 180, room: "OR 1" },

  { id: 541, doctorId: 6, patientId: 375, patientName: "Kilgrave", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Brain tumor scan", duration: 45, room: "Room 501" },
  { id: 542, doctorId: 6, patientId: 376, patientName: "Will Simpson", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Combat stimulant withdrawal", duration: 30, room: "Room 502" },
  { id: 543, doctorId: 6, patientId: 377, patientName: "Ruben", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Asthma", duration: 20, room: "Lab 1" },
  { id: 544, doctorId: 6, patientId: 378, patientName: "Clemons", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Gunshot wound recovery", duration: 30, room: "Room 501" },
  { id: 545, doctorId: 6, patientId: 379, patientName: "Alisa Jones", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Burn treatment", duration: 45, room: "Room 502" },

  // DOCTOR 7: Dr. Strange (Neurology)
  { id: 546, doctorId: 7, patientId: 380, patientName: "Wanda Maximoff", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Reality warping headaches", duration: 45, room: "Room 301" },
  { id: 547, doctorId: 7, patientId: 381, patientName: "Vision", time: "10:30 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Mind stone flux", duration: 30, room: "Room 302" },
  { id: 548, doctorId: 7, patientId: 382, patientName: "Pietro Maximoff", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Brain processing speed", duration: 30, room: "Room 301" },
  { id: 549, doctorId: 7, patientId: 383, patientName: "Agatha Harkness", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Neural magic scan", duration: 30, room: "Lab 2" },
  { id: 550, doctorId: 7, patientId: 384, patientName: "Monica Rambeau", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Wanda vision recovery", duration: 20, room: "Virtual" },

  { id: 551, doctorId: 7, patientId: 385, patientName: "Darcy Lewis", time: "09:15 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Asthmatic neural link", duration: 45, room: "Room 301" },
  { id: 552, doctorId: 7, patientId: 386, patientName: "Jimmy Woo", time: "11:45 AM", date: "2025-11-12", type: "Follow-up", status: "Completed", notes: "Card trick neural strain", duration: 30, room: "Room 302" },
  { id: 553, doctorId: 7, patientId: 387, patientName: "Tyler Hayward", time: "01:00 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Megalomania", duration: 30, room: "Room 301" },
  { id: 554, doctorId: 7, patientId: 388, patientName: "White Vision", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Memory upload status", duration: 30, room: "Lab 2" },
  { id: 555, doctorId: 7, patientId: 389, patientName: "Clea", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Dimensional vertigo", duration: 45, room: "Room 302" },

  { id: 556, doctorId: 7, patientId: 390, patientName: "Ancient One", time: "09:00 AM", date: "2025-12-03", type: "Follow-up", status: "Completed", notes: "Temporal loop effect", duration: 30, room: "Room 301" },
  { id: 557, doctorId: 7, patientId: 391, patientName: "Mordo", time: "11:30 AM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Zealotry symptoms", duration: 30, room: "Room 302" },
  { id: 558, doctorId: 7, patientId: 392, patientName: "Hamir", time: "03:00 PM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Phantom limb", duration: 45, room: "Room 301" },
  { id: 559, doctorId: 7, patientId: 393, patientName: "Tina Minoru", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Staff neural interface", duration: 30, room: "Lab 2" },
  { id: 560, doctorId: 7, patientId: 394, patientName: "Nico Minoru", time: "01:45 PM", date: "2025-12-31", type: "Follow-up", status: "Completed", notes: "Staff of One headache", duration: 30, room: "Room 302" },

  { id: 561, doctorId: 7, patientId: 395, patientName: "Karolina Dean", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Solar neural flare", duration: 30, room: "Room 301" },
  { id: 562, doctorId: 7, patientId: 396, patientName: "Chase Stein", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Fistigons neural feedback", duration: 45, room: "Room 302" },
  { id: 563, doctorId: 7, patientId: 397, patientName: "Molly Hayes", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Pronounced muscle headache", duration: 30, room: "Room 301" },
  { id: 564, doctorId: 7, patientId: 398, patientName: "Alex Wilder", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Genius intellect strain", duration: 20, room: "Lab 2" },
  { id: 565, doctorId: 7, patientId: 399, patientName: "Gertrude Yorkes", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Dinosaur telepathy", duration: 30, room: "Room 302" },

  { id: 566, doctorId: 7, patientId: 400, patientName: "Old Lace", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Dino neural net", duration: 45, room: "Room 301" },
  { id: 567, doctorId: 7, patientId: 401, patientName: "Dale Yorkes", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Time travel nausea", duration: 30, room: "Room 302" },
  { id: 568, doctorId: 7, patientId: 402, patientName: "Stacey Yorkes", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Parental stress neuralgia", duration: 20, room: "Lab 2" },
  { id: 569, doctorId: 7, patientId: 403, patientName: "Geoffrey Wilder", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Gibborim influence", duration: 30, room: "Room 301" },
  { id: 570, doctorId: 7, patientId: 404, patientName: "Leslie Dean", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Confirmed", notes: "Ultra hive mind", duration: 20, room: "Virtual" },

  { id: 571, doctorId: 7, patientId: 405, patientName: "Jonah", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Body swapping side effects", duration: 45, room: "Room 301" },
  { id: 572, doctorId: 7, patientId: 406, patientName: "Manfred", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Gibborim decay", duration: 30, room: "Room 302" },
  { id: 573, doctorId: 7, patientId: 407, patientName: "Janet Stein", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Dark dimension recovery", duration: 20, room: "Lab 2" },
  { id: 574, doctorId: 7, patientId: 408, patientName: "Victor Stein", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Genetic defect", duration: 30, room: "Room 301" },
  { id: 575, doctorId: 7, patientId: 409, patientName: "Xavin", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Super Skrull shape shifting", duration: 45, room: "Room 302" },

  // DOCTOR 8: Dr. Banner (Endocrinology)
  { id: 576, doctorId: 8, patientId: 410, patientName: "Scott Lang", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Pym particle metabolism", duration: 30, room: "Room 305" },
  { id: 577, doctorId: 8, patientId: 411, patientName: "Hope Van Dyne", time: "10:30 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Shrinking glandular strain", duration: 30, room: "Room 306" },
  { id: 578, doctorId: 8, patientId: 412, patientName: "Hank Pym", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Aging rate", duration: 30, room: "Room 305" },
  { id: 579, doctorId: 8, patientId: 413, patientName: "Janet Van Dyne", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Quantum realm hormones", duration: 20, room: "Lab 1" },
  { id: 580, doctorId: 8, patientId: 414, patientName: "Cassie Lang", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Growth spurt check", duration: 15, room: "Virtual" },

  { id: 581, doctorId: 8, patientId: 415, patientName: "Luis", time: "09:15 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Diabetes management", duration: 30, room: "Room 305" },
  { id: 582, doctorId: 8, patientId: 416, patientName: "Dave", time: "11:45 AM", date: "2025-11-12", type: "Follow-up", status: "Completed", notes: "Thyroid issue", duration: 30, room: "Room 306" },
  { id: 583, doctorId: 8, patientId: 417, patientName: "Kurt", time: "01:00 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Xerostomia", duration: 20, room: "Room 305" },
  { id: 584, doctorId: 8, patientId: 418, patientName: "Ava Starr", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Quantum instability", duration: 30, room: "Lab 1" },
  { id: 585, doctorId: 8, patientId: 419, patientName: "Bill Foster", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Giant growth glands", duration: 45, room: "Room 306" },

  { id: 586, doctorId: 8, patientId: 420, patientName: "Elihas Starr", time: "09:00 AM", date: "2025-12-03", type: "Follow-up", status: "Completed", notes: "Unstable molecules", duration: 30, room: "Room 305" },
  { id: 587, doctorId: 8, patientId: 421, patientName: "Ghost", time: "11:30 AM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Pain management", duration: 30, room: "Room 306" },
  { id: 588, doctorId: 8, patientId: 422, patientName: "Sonny Burch", time: "03:00 PM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Stress cortisol", duration: 30, room: "Room 305" },
  { id: 589, doctorId: 8, patientId: 423, patientName: "Ulysses Klaue", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Vibranium poisoning", duration: 20, room: "Lab 1" },
  { id: 590, doctorId: 8, patientId: 424, patientName: "N'Jadaka", time: "01:45 PM", date: "2025-12-31", type: "Follow-up", status: "Completed", notes: "Heart shaped herb effects", duration: 30, room: "Room 306" },

  { id: 591, doctorId: 8, patientId: 425, patientName: "T'Challa", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Panther hormones", duration: 30, room: "Room 305" },
  { id: 592, doctorId: 8, patientId: 426, patientName: "Shuri", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Vibranium exposure", duration: 45, room: "Room 306" },
  { id: 593, doctorId: 8, patientId: 427, patientName: "Okoye", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Adrenaline levels", duration: 30, room: "Room 305" },
  { id: 594, doctorId: 8, patientId: 428, patientName: "W'Kabi", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Rhino horn trauma", duration: 20, room: "Lab 1" },
  { id: 595, doctorId: 8, patientId: 429, patientName: "M'Baku", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Gorilla strength hormone", duration: 30, room: "Room 306" },

  { id: 596, doctorId: 8, patientId: 430, patientName: "Zuri", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Elderly care", duration: 30, room: "Room 305" },
  { id: 597, doctorId: 8, patientId: 431, patientName: "Nakia", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Kidney function", duration: 30, room: "Room 306" },
  { id: 598, doctorId: 8, patientId: 432, patientName: "Ayo", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Battle fatigue", duration: 20, room: "Lab 1" },
  { id: 599, doctorId: 8, patientId: 433, patientName: "Aneka", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Midnight Angel armor strain", duration: 30, room: "Room 305" },
  { id: 600, doctorId: 8, patientId: 434, patientName: "Everett Ross", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Confirmed", notes: "Stress thyroid", duration: 20, room: "Virtual" },

  { id: 601, doctorId: 8, patientId: 435, patientName: "Val", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Sound energy metabolism", duration: 45, room: "Room 305" },
  { id: 602, doctorId: 8, patientId: 436, patientName: "Riri Williams", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "MIT stress", duration: 30, room: "Room 306" },
  { id: 603, doctorId: 8, patientId: 437, patientName: "Attuma", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Talent hormone", duration: 20, room: "Lab 1" },
  { id: 604, doctorId: 8, patientId: 438, patientName: "Namora", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Deep sea pressure adaptation", duration: 30, room: "Room 305" },
  { id: 605, doctorId: 8, patientId: 439, patientName: "Namor", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Winged feet growth", duration: 45, room: "Room 306" },

  // DOCTOR 9: Dr. Foster (Rheumatology)
  { id: 606, doctorId: 9, patientId: 440, patientName: "Valkyrie", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Joint wear from fighting", duration: 30, room: "Room 310" },
  { id: 607, doctorId: 9, patientId: 441, patientName: "Heimdall", time: "10:30 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "All-seeing eye strain", duration: 30, room: "Room 311" },
  { id: 608, doctorId: 9, patientId: 442, patientName: "Sif", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Sword arm arthritis", duration: 30, room: "Room 310" },
  { id: 609, doctorId: 9, patientId: 443, patientName: "Fandral", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Fencing injuries", duration: 20, room: "Lab 1" },
  { id: 610, doctorId: 9, patientId: 444, patientName: "Hogun", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Mace elbow", duration: 20, room: "Virtual" },

  { id: 611, doctorId: 9, patientId: 445, patientName: "Volstagg", time: "09:15 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Gout", duration: 30, room: "Room 310" },
  { id: 612, doctorId: 9, patientId: 446, patientName: "Hela", time: "11:45 AM", date: "2025-11-12", type: "Follow-up", status: "Completed", notes: "Necrotic tissue", duration: 30, room: "Room 311" },
  { id: 613, doctorId: 9, patientId: 447, patientName: "Loki", time: "01:00 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Frost giant joint pain", duration: 30, room: "Room 310" },
  { id: 614, doctorId: 9, patientId: 448, patientName: "Odin", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Odin sleep maintenance", duration: 20, room: "Lab 1" },
  { id: 615, doctorId: 9, patientId: 449, patientName: "Frigga", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Witch joint strain", duration: 45, room: "Room 311" },

  { id: 616, doctorId: 9, patientId: 450, patientName: "Skurge", time: "09:00 AM", date: "2025-12-03", type: "Follow-up", status: "Completed", notes: "Axe shoulder", duration: 30, room: "Room 310" },
  { id: 617, doctorId: 9, patientId: 451, patientName: "Korg", time: "11:30 AM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Rocky skin condition", duration: 30, room: "Room 311" },
  { id: 618, doctorId: 9, patientId: 452, patientName: "Miek", time: "03:00 PM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Insect limb pain", duration: 30, room: "Room 310" },
  { id: 619, doctorId: 9, patientId: 453, patientName: "Hulk", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Muscle growth markers", duration: 20, room: "Lab 1" },
  { id: 620, doctorId: 9, patientId: 454, patientName: "Thanos", time: "01:45 PM", date: "2025-12-31", type: "Follow-up", status: "Completed", notes: "Titan arthritis", duration: 30, room: "Room 311" },

  { id: 621, doctorId: 9, patientId: 455, patientName: "Nebula", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Bionic joint lubrication", duration: 30, room: "Room 310" },
  { id: 622, doctorId: 9, patientId: 456, patientName: "Gamora", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Godslayer back pain", duration: 45, room: "Room 311" },
  { id: 623, doctorId: 9, patientId: 457, patientName: "Drax", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Knee replacement", duration: 30, room: "Room 310" },
  { id: 624, doctorId: 9, patientId: 458, patientName: "Rocket", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Spinal issues", duration: 20, room: "Lab 1" },
  { id: 625, doctorId: 9, patientId: 459, patientName: "Groot", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Root rot", duration: 30, room: "Room 311" },

  { id: 626, doctorId: 9, patientId: 460, patientName: "Star-Lord", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Space flu aches", duration: 30, room: "Room 310" },
  { id: 627, doctorId: 9, patientId: 461, patientName: "Mantis", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Empathy joint fatigue", duration: 30, room: "Room 311" },
  { id: 628, doctorId: 9, patientId: 462, patientName: "Yondu", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Fin control arthritis", duration: 20, room: "Lab 1" },
  { id: 629, doctorId: 9, patientId: 463, patientName: "Ayesha", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Sovereign perfection aches", duration: 30, room: "Room 310" },
  { id: 630, doctorId: 9, patientId: 464, patientName: "Adam Warlock", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Confirmed", notes: "Soul gem strain", duration: 20, room: "Virtual" },

  { id: 631, doctorId: 9, patientId: 465, patientName: "High Evolutionary", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Genetic perfection fatigue", duration: 45, room: "Room 310" },
  { id: 632, doctorId: 9, patientId: 466, patientName: "Rocket 89P13", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Back brace adjustment", duration: 30, room: "Room 311" },
  { id: 633, doctorId: 9, patientId: 467, patientName: "Lylla", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Otter limb pain", duration: 20, room: "Lab 1" },
  { id: 634, doctorId: 9, patientId: 468, patientName: "Teefs", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Cybernetic seal adjustment", duration: 30, room: "Room 310" },
  { id: 635, doctorId: 9, patientId: 469, patientName: "Floor", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Walrus hygiene", duration: 45, room: "Room 311" },

  // DOCTOR 10: Dr. Palmer (Psychiatry)
  { id: 636, doctorId: 10, patientId: 470, patientName: "Norman Osborn", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Split personality", duration: 60, room: "Room 350" },
  { id: 637, doctorId: 10, patientId: 471, patientName: "Harry Osborn", time: "10:30 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Goblin serum hallucinations", duration: 45, room: "Room 351" },
  { id: 638, doctorId: 10, patientId: 472, patientName: "Peter Parker (Clone)", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Identity crisis", duration: 45, room: "Room 350" },
  { id: 639, doctorId: 10, patientId: 473, patientName: "Miles Morales", time: "11:00 AM", date: "2025-10-23", type: "Video Call", status: "Completed", notes: "Bite trauma", duration: 30, room: "Virtual" },
  { id: 640, doctorId: 10, patientId: 474, patientName: "Gwen Stacy", time: "02:30 PM", date: "2025-10-30", type: "Consultation", status: "Completed", notes: "Dimensional grief", duration: 60, room: "Room 351" },

  { id: 641, doctorId: 10, patientId: 475, patientName: "Otto Octavius", time: "09:15 AM", date: "2025-11-05", type: "Follow-up", status: "Completed", notes: "Actuator obsession", duration: 45, room: "Room 350" },
  { id: 642, doctorId: 10, patientId: 476, patientName: "Adrian Toomes", time: "11:45 AM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Tech envy", duration: 45, room: "Room 351" },
  { id: 643, doctorId: 10, patientId: 477, patientName: "Cletus Kasady", time: "01:00 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Carnage voices", duration: 60, room: "Room 350" },
  { id: 644, doctorId: 10, patientId: 478, patientName: "Eddie Brock", time: "10:00 AM", date: "2025-11-26", type: "Follow-up", status: "Completed", notes: "Symbiosis relationship", duration: 45, room: "Room 351" },
  { id: 645, doctorId: 10, patientId: 479, patientName: "Riot", time: "02:30 PM", date: "2025-11-28", type: "Video Call", status: "Completed", notes: "Aggression management", duration: 30, room: "Virtual" },

  { id: 646, doctorId: 10, patientId: 480, patientName: "Mac Gargan", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Scorpion anger", duration: 45, room: "Room 350" },
  { id: 647, doctorId: 10, patientId: 481, patientName: "Max Dillon", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Electro inferiority complex", duration: 60, room: "Room 351" },
  { id: 648, doctorId: 10, patientId: 482, patientName: "Flint Marko", time: "03:00 PM", date: "2025-12-17", type: "Follow-up", status: "Completed", notes: "Depression", duration: 45, room: "Room 350" },
  { id: 649, doctorId: 10, patientId: 483, patientName: "Alekssei Sytsevich", time: "10:15 AM", date: "2025-12-24", type: "Check-up", status: "Completed", notes: "Rhino aggression", duration: 45, room: "Room 351" },
  { id: 650, doctorId: 10, patientId: 484, patientName: "Kraven", time: "01:45 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Obsessive hunting", duration: 60, room: "Room 350" },

  { id: 651, doctorId: 10, patientId: 485, patientName: "Mysterio", time: "08:30 AM", date: "2026-01-07", type: "Follow-up", status: "Pending", notes: "Narcissism", duration: 45, room: "Room 351" },
  { id: 652, doctorId: 10, patientId: 486, patientName: "Vulture", time: "10:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Family man stress", duration: 45, room: "Room 350" },
  { id: 653, doctorId: 10, patientId: 487, patientName: "Shocker", time: "02:00 PM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Gang life PTSD", duration: 60, room: "Room 351" },
  { id: 654, doctorId: 10, patientId: 488, patientName: "Tinkerer", time: "11:30 AM", date: "2026-01-28", type: "Follow-up", status: "Confirmed", notes: "Tech addiction", duration: 45, room: "Room 350" },
  { id: 655, doctorId: 10, patientId: 489, patientName: "Prowler", time: "03:30 PM", date: "2026-01-30", type: "Video Call", status: "Pending", notes: "Moral dilemma", duration: 30, room: "Virtual" },

  { id: 656, doctorId: 10, patientId: 490, patientName: "Doc Ock (Alt)", time: "09:00 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Scientist stress", duration: 45, room: "Room 351" },
  { id: 657, doctorId: 10, patientId: 491, patientName: "Green Goblin (Alt)", time: "10:45 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Bipolar disorder", duration: 60, room: "Room 350" },
  { id: 658, doctorId: 10, patientId: 492, patientName: "Spider-Gwen", time: "01:00 PM", date: "2026-02-18", type: "Follow-up", status: "Confirmed", notes: "Police band PTSD", duration: 45, room: "Room 351" },
  { id: 659, doctorId: 10, patientId: 493, patientName: "Spider-Man Noir", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Violence trauma", duration: 45, room: "Room 350" },
  { id: 660, doctorId: 10, patientId: 494, patientName: "Spider-Ham", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Confirmed", notes: "Cartoon physics anxiety", duration: 30, room: "Virtual" },

  { id: 661, doctorId: 10, patientId: 495, patientName: "Spider-Punk", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Rebellion fatigue", duration: 45, room: "Room 351" },
  { id: 662, doctorId: 10, patientId: 496, patientName: "Miguel O'Hara", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Future depression", duration: 45, room: "Room 350" },
  { id: 663, doctorId: 10, patientId: 497, patientName: "Jeff Morales", time: "01:15 PM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Parental stress", duration: 45, room: "Room 351" },
  { id: 664, doctorId: 10, patientId: 498, patientName: "Rio Morales", time: "03:00 PM", date: "2026-03-27", type: "Consultation", status: "Confirmed", notes: "Grief counseling", duration: 60, room: "Room 350" },
  { id: 665, doctorId: 10, patientId: 499, patientName: "Spot", time: "09:30 AM", date: "2026-03-30", type: "Follow-up", status: "Pending", notes: "Existential crisis", duration: 45, room: "Room 351" },

  // =========================================================
  // BATCH 2: ADDITIONAL PATIENTS (DOCTORS 11-20)
  // =========================================================

  // DOCTOR 11: Dr. Erskine (Immunology)
  { id: 666, doctorId: 11, patientId: 500, patientName: "Nick Fury", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Infinity Formula stability", duration: 30, room: "Room 410" },
  { id: 667, doctorId: 11, patientId: 501, patientName: "Dum Dum Dugan", time: "10:30 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Howling Commandos check", duration: 30, room: "Room 411" },
  { id: 668, doctorId: 11, patientId: 502, patientName: "Agent Carter", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Immunity boost", duration: 30, room: "Room 410" },
  { id: 669, doctorId: 11, patientId: 503, patientName: "Red Skull", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Serum rejection study", duration: 30, room: "Lab 3" },
  { id: 670, doctorId: 11, patientId: 504, patientName: "Arnim Zola", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Viral upload", duration: 20, room: "Virtual" },

  { id: 671, doctorId: 11, patientId: 505, patientName: "Winter Soldier", time: "09:15 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Mind control immune response", duration: 30, room: "Room 410" },
  { id: 672, doctorId: 11, patientId: 506, patientName: "Helmut Zemo", time: "11:45 AM", date: "2025-11-12", type: "Follow-up", status: "Completed", notes: "Blood mask", duration: 30, room: "Room 411" },
  { id: 673, doctorId: 11, patientId: 507, patientName: "Ulysses Klaue", time: "01:00 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Malaria resistance", duration: 30, room: "Room 410" },
  { id: 674, doctorId: 11, patientId: 508, patientName: "N'Jadaka", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Herb interaction", duration: 30, room: "Lab 3" },
  { id: 675, doctorId: 11, patientId: 509, patientName: "T'Challa", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Bullet wound immunity", duration: 45, room: "Room 411" },

  { id: 676, doctorId: 11, patientId: 510, patientName: "Shuri", time: "09:00 AM", date: "2025-12-03", type: "Follow-up", status: "Completed", notes: "Genius brain immunity", duration: 30, room: "Room 410" },
  { id: 677, doctorId: 11, patientId: 511, patientName: "W'Kabi", time: "11:30 AM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Rhino viral load", duration: 30, room: "Room 411" },
  { id: 678, doctorId: 11, patientId: 512, patientName: "Ayo", time: "03:00 PM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Wakandan flu shot", duration: 30, room: "Room 410" },
  { id: 679, doctorId: 11, patientId: 513, patientName: "Okoye", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Warrior immunity", duration: 30, room: "Lab 3" },
  { id: 680, doctorId: 11, patientId: 514, patientName: "M'Baku", time: "01:45 PM", date: "2025-12-31", type: "Follow-up", status: "Completed", notes: "Gorilla mumps", duration: 30, room: "Room 411" },

  { id: 681, doctorId: 11, patientId: 515, patientName: "Everett Ross", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "CIA vaccine", duration: 30, room: "Room 410" },
  { id: 682, doctorId: 11, patientId: 516, patientName: "Val", time: "10:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Sound wave resistance", duration: 45, room: "Room 411" },
  { id: 683, doctorId: 11, patientId: 517, patientName: "Attuma", time: "02:00 PM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Talent immunity", duration: 30, room: "Room 410" },
  { id: 684, doctorId: 11, patientId: 518, patientName: "Namora", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Deep sea antibodies", duration: 30, room: "Lab 3" },
  { id: 685, doctorId: 11, patientId: 519, patientName: "Riri Williams", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Iron heart protection", duration: 30, room: "Room 411" },

  { id: 686, doctorId: 11, patientId: 520, patientName: "Harley Keener", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "MIT lab exposure", duration: 45, room: "Room 410" },
  { id: 687, doctorId: 11, patientId: 521, patientName: "Peter Parker", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Radioactive spider bite", duration: 30, room: "Room 411" },
  { id: 688, doctorId: 11, patientId: 522, patientName: "Flash Thompson", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Venom symbiote traces", duration: 30, room: "Lab 3" },
  { id: 689, doctorId: 11, patientId: 523, patientName: "Ned Leeds", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Magic immunity", duration: 30, room: "Room 410" },
  { id: 690, doctorId: 11, patientId: 524, patientName: "MJ Watson", time: "11:00 AM", date: "2026-02-27", type: "Video Call", status: "Confirmed", notes: "Stress immunity", duration: 20, room: "Virtual" },

  { id: 691, doctorId: 11, patientId: 525, patientName: "Liz Allan", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Vulture family immunity", duration: 45, room: "Room 410" },
  { id: 692, doctorId: 11, patientId: 526, patientName: "Brad Davis", time: "10:30 AM", date: "2026-03-13", type: "Follow-up", status: "Confirmed", notes: "Football vaccine", duration: 30, room: "Room 411" },
  { id: 693, doctorId: 11, patientId: 527, patientName: "Betty Brant", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Bug bite allergies", duration: 30, room: "Lab 3" },
  { id: 694, doctorId: 11, patientId: 528, patientName: "Jason Ionello", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Viral video recovery", duration: 30, room: "Room 410" },
  { id: 695, doctorId: 11, patientId: 529, patientName: "Eugen", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "D-Man immunity", duration: 45, room: "Room 411" },

  // DOCTOR 12: Dr. Cho (Radiology)
  { id: 696, doctorId: 12, patientId: 530, patientName: "Wolverine", time: "09:00 AM", date: "2025-10-02", type: "Lab Review", status: "Completed", notes: "Adamantium skeleton scan", duration: 45, room: "Imaging 1" },
  { id: 697, doctorId: 12, patientId: 531, patientName: "Cyclops", time: "10:30 AM", date: "2025-10-09", type: "Lab Review", status: "Completed", notes: "Optic nerve beam check", duration: 30, room: "Imaging 2" },
  { id: 698, doctorId: 12, patientId: 532, patientName: "Jean Grey", time: "01:00 PM", date: "2025-10-16", type: "Lab Review", status: "Completed", notes: "Phoenix force energy scan", duration: 45, room: "Imaging 1" },
  { id: 699, doctorId: 12, patientId: 533, patientName: "Storm", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Atmospheric pressure check", duration: 30, room: "Imaging 2" },
  { id: 700, doctorId: 12, patientId: 534, patientName: "Beast", time: "02:30 PM", date: "2025-10-30", type: "Lab Review", status: "Completed", notes: "Mutation density scan", duration: 45, room: "Imaging 1" },

  { id: 701, doctorId: 12, patientId: 535, patientName: "Rogue", time: "09:15 AM", date: "2025-11-05", type: "Lab Review", status: "Completed", notes: "Power absorption check", duration: 30, room: "Imaging 2" },
  { id: 702, doctorId: 12, patientId: 536, patientName: "Gambit", time: "11:45 AM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Kinetic charge scan", duration: 30, room: "Imaging 1" },
  { id: 703, doctorId: 12, patientId: 537, patientName: "Jubilee", time: "01:00 PM", date: "2025-11-19", type: "Lab Review", status: "Completed", notes: "Pyrotechnic scan", duration: 30, room: "Imaging 2" },
  { id: 704, doctorId: 12, patientId: 538, patientName: "Professor X", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Cerebro calibration", duration: 45, room: "Imaging 1" },
  { id: 705, doctorId: 12, patientId: 539, patientName: "Magneto", time: "02:30 PM", date: "2025-11-28", type: "Lab Review", status: "Completed", notes: "Magnetic field interference", duration: 30, room: "Imaging 2" },

  { id: 706, doctorId: 12, patientId: 540, patientName: "Mystique", time: "09:00 AM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Bone shape shifting scan", duration: 45, room: "Imaging 1" },
  { id: 707, doctorId: 12, patientId: 541, patientName: "Sabretooth", time: "11:30 AM", date: "2025-12-10", type: "Lab Review", status: "Completed", notes: "Skeletal density", duration: 30, room: "Imaging 2" },
  { id: 708, doctorId: 12, patientId: 542, patientName: "Toad", time: "03:00 PM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Tongue elasticity scan", duration: 30, room: "Imaging 1" },
  { id: 709, doctorId: 12, patientId: 543, patientName: "Juggernaut", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Helmet X-ray", duration: 45, room: "Imaging 2" },
  { id: 710, doctorId: 12, patientId: 544, patientName: "Colossus", time: "01:45 PM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Metal skin scan", duration: 30, room: "Imaging 1" },

  { id: 711, doctorId: 12, patientId: 545, patientName: "Kitty Pryde", time: "08:30 AM", date: "2026-01-07", type: "Lab Review", status: "Pending", notes: "Phasing density check", duration: 30, room: "Imaging 2" },
  { id: 712, doctorId: 12, patientId: 546, patientName: "Iceman", time: "10:00 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Thermal scan", duration: 30, room: "Imaging 1" },
  { id: 713, doctorId: 12, patientId: 547, patientName: "Angel", time: "02:00 PM", date: "2026-01-21", type: "Lab Review", status: "Pending", notes: "Wing bone density", duration: 30, room: "Imaging 2" },
  { id: 714, doctorId: 12, patientId: 548, patientName: "Havok", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Cosmic energy scan", duration: 30, room: "Imaging 1" },
  { id: 715, doctorId: 12, patientId: 549, patientName: "Polaris", time: "03:30 PM", date: "2026-01-30", type: "Lab Review", status: "Pending", notes: "Magnetic resonance", duration: 30, room: "Imaging 2" },

  { id: 716, doctorId: 12, patientId: 550, patientName: "Cable", time: "09:00 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Techno-organic virus scan", duration: 45, room: "Imaging 1" },
  { id: 717, doctorId: 12, patientId: 551, patientName: "Domino", time: "10:45 AM", date: "2026-02-11", type: "Lab Review", status: "Pending", notes: "Probability field scan", duration: 30, room: "Imaging 2" },
  { id: 718, doctorId: 12, patientId: 552, patientName: "Deadpool", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Cancer scan", duration: 30, room: "Imaging 1" },
  { id: 719, doctorId: 12, patientId: 553, patientName: "Wolverine (Old)", time: "02:30 PM", date: "2026-02-25", type: "Lab Review", status: "Pending", notes: "Adamantium poisoning", duration: 45, room: "Imaging 2" },
  { id: 720, doctorId: 12, patientId: 554, patientName: "X-23", time: "11:00 AM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Claw bone growth", duration: 30, room: "Imaging 1" },

  { id: 721, doctorId: 12, patientId: 555, patientName: "Apocalypse", time: "08:00 AM", date: "2026-03-06", type: "Lab Review", status: "Pending", notes: "Ancient tech scan", duration: 45, room: "Imaging 2" },
  { id: 722, doctorId: 12, patientId: 556, patientName: "Mr. Sinister", time: "10:30 AM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "Genetic sequence scan", duration: 30, room: "Imaging 1" },
  { id: 723, doctorId: 12, patientId: 557, patientName: "Bishop", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Energy absorption scan", duration: 30, room: "Imaging 2" },
  { id: 724, doctorId: 12, patientId: 558, patientName: "Sage", time: "03:00 PM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Computer brain scan", duration: 30, room: "Imaging 1" },
  { id: 725, doctorId: 12, patientId: 559, patientName: "Forge", time: "09:30 AM", date: "2026-03-30", type: "Lab Review", status: "Pending", notes: "Invention radiation", duration: 45, room: "Imaging 2" },

  // DOCTOR 13: Dr. Zola (Genetics)
  { id: 726, doctorId: 13, patientId: 560, patientName: "High Evolutionary", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Counter-Evolution", duration: 45, room: "Lab 4" },
  { id: 727, doctorId: 13, patientId: 561, patientName: "Herbert Edgar Wyndham", time: "10:30 AM", date: "2025-10-09", type: "Lab Review", status: "Completed", notes: "New Men sequencing", duration: 30, room: "Lab 4" },
  { id: 728, doctorId: 13, patientId: 562, patientName: "Wanda Maximoff", time: "01:00 PM", date: "2025-10-16", type: "Consultation", status: "Completed", notes: "Mutate gene check", duration: 45, room: "Lab 4" },
  { id: 729, doctorId: 13, patientId: 563, patientName: "Pietro Maximoff", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Speed gene mapping", duration: 30, room: "Lab 4" },
  { id: 730, doctorId: 13, patientId: 564, patientName: "Lorna Dane", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Magnetic gene", duration: 20, room: "Virtual" },

  { id: 731, doctorId: 13, patientId: 565, patientName: "Moira MacTaggert", time: "09:15 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Mutant research", duration: 45, room: "Lab 4" },
  { id: 732, doctorId: 13, patientId: 566, patientName: "Kevin MacTaggert", time: "11:45 AM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Proteus reality gene", duration: 30, room: "Lab 4" },
  { id: 733, doctorId: 13, patientId: 567, patientName: "Rahne Sinclair", time: "01:00 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Wolf gene splicing", duration: 45, room: "Lab 4" },
  { id: 734, doctorId: 13, patientId: 568, patientName: "Sam Guthrie", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Blast field gene", duration: 30, room: "Lab 4" },
  { id: 735, doctorId: 13, patientId: 569, patientName: "Roberto Da Costa", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Solar gene", duration: 45, room: "Lab 4" },

  { id: 736, doctorId: 13, patientId: 570, patientName: "Danielle Moonstar", time: "09:00 AM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Illusion gene", duration: 30, room: "Lab 4" },
  { id: 737, doctorId: 13, patientId: 571, patientName: "Xi'an Coy Manh", time: "11:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Mind possession gene", duration: 45, room: "Lab 4" },
  { id: 738, doctorId: 13, patientId: 572, patientName: "Amara Aquilla", time: "03:00 PM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Magma gene", duration: 30, room: "Lab 4" },
  { id: 739, doctorId: 13, patientId: 573, patientName: "James Proudstar", time: "10:15 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Apache strength gene", duration: 45, room: "Lab 4" },
  { id: 740, doctorId: 13, patientId: 574, patientName: "Karma", time: "01:45 PM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Twin gene", duration: 30, room: "Lab 4" },

  { id: 741, doctorId: 13, patientId: 575, patientName: "Mister Sinister", time: "08:30 AM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Clone stability", duration: 45, room: "Lab 4" },
  { id: 742, doctorId: 13, patientId: 576, patientName: "Madelyne Pryor", time: "10:00 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Goblin Queen gene", duration: 30, room: "Lab 4" },
  { id: 743, doctorId: 13, patientId: 577, patientName: "Nathan Summers", time: "02:00 PM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Askani son gene", duration: 45, room: "Lab 4" },
  { id: 744, doctorId: 13, patientId: 578, patientName: "Rachel Summers", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Phoenix host gene", duration: 30, room: "Lab 4" },
  { id: 745, doctorId: 13, patientId: 579, patientName: "Stryfe", time: "03:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Clone virus gene", duration: 45, room: "Lab 4" },

  { id: 746, doctorId: 13, patientId: 580, patientName: "Gideon", time: "09:00 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "External mutation gene", duration: 30, room: "Lab 4" },
  { id: 747, doctorId: 13, patientId: 581, patientName: "Orphan Maker", time: "10:45 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Nanny creation gene", duration: 45, room: "Lab 4" },
  { id: 748, doctorId: 13, patientId: 582, patientName: "Blight", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Viral gene", duration: 30, room: "Lab 4" },
  { id: 749, doctorId: 13, patientId: 583, patientName: "Dark Beast", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Beast alt gene", duration: 45, room: "Lab 4" },
  { id: 750, doctorId: 13, patientId: 584, patientName: "Maggot", time: "11:00 AM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Digestive gene", duration: 30, room: "Lab 4" },

  { id: 751, doctorId: 13, patientId: 585, patientName: "Morph", time: "08:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Shapeshifting gene", duration: 45, room: "Lab 4" },
  { id: 752, doctorId: 13, patientId: 586, patientName: "Changeling", time: "10:30 AM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "Mimic gene", duration: 30, room: "Lab 4" },
  { id: 753, doctorId: 13, patientId: 587, patientName: "Copycat", time: "01:15 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "DNA replication", duration: 45, room: "Lab 4" },
  { id: 754, doctorId: 13, patientId: 588, patientName: " Mystique (DNA)", time: "03:00 PM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Baseline retrieval", duration: 30, room: "Lab 4" },
  { id: 755, doctorId: 13, patientId: 589, patientName: "X-23 (DNA)", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Clone perfection", duration: 45, room: "Lab 4" },

  // DOCTOR 14: Dr. Alchemax (Toxicology)
  { id: 756, doctorId: 14, patientId: 590, patientName: "Green Goblin", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Goblin serum toxicity", duration: 30, room: "Room 500" },
  { id: 757, doctorId: 14, patientId: 591, patientName: "Scorpion", time: "10:30 AM", date: "2025-10-09", type: "Lab Review", status: "Completed", notes: "Suit toxin levels", duration: 20, room: "Room 500" },
  { id: 758, doctorId: 14, patientId: 592, patientName: "Vulture", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Flight suit exhaust", duration: 30, room: "Room 500" },
  { id: 759, doctorId: 14, patientId: 593, patientName: "Rhino", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Asthma check", duration: 20, room: "Room 500" },
  { id: 760, doctorId: 14, patientId: 594, patientName: "Shocker", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Vibration noise damage", duration: 15, room: "Virtual" },

  { id: 761, doctorId: 14, patientId: 595, patientName: "Electro", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Electric burn", duration: 30, room: "Room 500" },
  { id: 762, doctorId: 14, patientId: 596, patientName: "Sandman", time: "11:45 AM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Silica levels", duration: 20, room: "Room 500" },
  { id: 763, doctorId: 14, patientId: 597, patientName: "Kraven", time: "01:00 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Sedative toxicity", duration: 30, room: "Room 500" },
  { id: 764, doctorId: 14, patientId: 598, patientName: "Mysterio", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Smoke inhalation", duration: 20, room: "Room 500" },
  { id: 765, doctorId: 14, patientId: 599, patientName: "Carnage", time: "02:30 PM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Symbiote toxin", duration: 30, room: "Room 500" },

  { id: 766, doctorId: 14, patientId: 600, patientName: "Venom", time: "09:00 AM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Toxin secretion control", duration: 20, room: "Room 500" },
  { id: 767, doctorId: 14, patientId: 601, patientName: "Riot", time: "11:30 AM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Heavy metal toxicity", duration: 30, room: "Room 500" },
  { id: 768, doctorId: 14, patientId: 602, patientName: "Lasher", time: "03:00 PM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Acid burn", duration: 20, room: "Room 500" },
  { id: 769, doctorId: 14, patientId: 603, patientName: "Agony", time: "10:15 AM", date: "2025-12-24", type: "Check-up", status: "Completed", notes: "Neurotoxin check", duration: 30, room: "Room 500" },
  { id: 770, doctorId: 14, patientId: 604, patientName: "Scream", time: "01:45 PM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Vocal cord damage", duration: 20, room: "Room 500" },

  { id: 771, doctorId: 14, patientId: 605, patientName: "Spider-Man 2099", time: "08:30 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Dialysis fluid check", duration: 30, room: "Room 500" },
  { id: 772, doctorId: 14, patientId: 606, patientName: "Lady Spider", time: "10:00 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Radioactive spider bite", duration: 20, room: "Room 500" },
  { id: 773, doctorId: 14, patientId: 607, patientName: "Spider-Man Noir", time: "02:00 PM", date: "2026-01-21", type: "Check-up", status: "Pending", notes: "Black lung", duration: 30, room: "Room 500" },
  { id: 774, doctorId: 14, patientId: 608, patientName: "Spider-Punk", time: "11:30 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Drug exposure", duration: 20, room: "Room 500" },
  { id: 775, doctorId: 14, patientId: 609, patientName: "Spider-Gwen", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Dimensional toxins", duration: 30, room: "Room 500" },

  { id: 776, doctorId: 14, patientId: 610, patientName: "Spider-Ham", time: "09:00 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Pork products", duration: 20, room: "Room 500" },
  { id: 777, doctorId: 14, patientId: 611, patientName: "Miles Morales", time: "10:45 AM", date: "2026-02-11", type: "Check-up", status: "Pending", notes: "Venom blast residue", duration: 30, room: "Room 500" },
  { id: 778, doctorId: 14, patientId: 612, patientName: "Gwen Stacy (Main)", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Oz formula trace", duration: 20, room: "Room 500" },
  { id: 779, doctorId: 14, patientId: 613, patientName: "Harry Osborn", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Goblin serum detox", duration: 30, room: "Room 500" },
  { id: 780, doctorId: 14, patientId: 614, patientName: "Norman Osborn", time: "11:00 AM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Super serum breakdown", duration: 20, room: "Room 500" },

  { id: 781, doctorId: 14, patientId: 615, patientName: "Doc Ock 2099", time: "08:00 AM", date: "2026-03-06", type: "Check-up", status: "Pending", notes: "Metal fatigue", duration: 30, room: "Room 500" },
  { id: 782, doctorId: 14, patientId: 616, patientName: "Venom 2099", time: "10:30 AM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "Genetic symbiosis", duration: 20, room: "Room 500" },
  { id: 783, doctorId: 14, patientId: 617, patientName: "Revconn", time: "01:15 PM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Cybernetic rejection", duration: 30, room: "Room 500" },
  { id: 784, doctorId: 14, patientId: 618, patientName: "Public Eye", time: "03:00 PM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Cybernetic fluid leak", duration: 20, room: "Room 500" },
  { id: 785, doctorId: 14, patientId: 619, patientName: "Tyler Stone", time: "09:30 AM", date: "2026-03-30", type: "Check-up", status: "Pending", notes: "Corporate toxicity", duration: 30, room: "Room 500" },

  // DOCTOR 15: Dr. Voodoo (Cardiology - Specialist)
  { id: 786, doctorId: 15, patientId: 620, patientName: "Brother Voodoo", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Spirit possession heart strain", duration: 30, room: "Room 405" },
  { id: 787, doctorId: 15, patientId: 621, patientName: "Nightcrawler", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Teleportation arrhythmia", duration: 45, room: "OR 5" },
  { id: 788, doctorId: 15, patientId: 622, patientName: "Magik", time: "01:00 PM", date: "2025-10-16", type: "Follow-up", status: "Completed", notes: "Limbo soul corruption", duration: 30, room: "Room 405" },
  { id: 789, doctorId: 15, patientId: 623, patientName: "Colossus", time: "11:00 AM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Steel heart check", duration: 20, room: "Lab 1" },
  { id: 790, doctorId: 15, patientId: 624, patientName: "Shadowcat", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Phasing palpitations", duration: 15, room: "Virtual" },

  { id: 791, doctorId: 15, patientId: 625, patientName: "Storm", time: "09:15 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Atmospheric pressure BP", duration: 30, room: "Room 405" },
  { id: 792, doctorId: 15, patientId: 626, patientName: "Wolverine", time: "11:45 AM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Healing factor heart rate", duration: 45, room: "OR 5" },
  { id: 793, doctorId: 15, patientId: 627, patientName: "Cyclops", time: "01:00 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Optic nerve stress", duration: 30, room: "Room 405" },
  { id: 794, doctorId: 15, patientId: 628, patientName: "Jean Grey", time: "10:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Phoenix force ECG", duration: 20, room: "Lab 1" },
  { id: 795, doctorId: 15, patientId: 629, patientName: "Professor X", time: "02:30 PM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Telepathy heart strain", duration: 30, room: "OR 5" },

  { id: 796, doctorId: 15, patientId: 630, patientName: "Beast", time: "09:00 AM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Secondary heart valve", duration: 45, room: "Room 405" },
  { id: 797, doctorId: 15, patientId: 631, patientName: "Angel", time: "11:30 AM", date: "2025-12-10", type: "Follow-up", status: "Completed", notes: "Wing muscle heart load", duration: 30, room: "OR 5" },
  { id: 798, doctorId: 15, patientId: 632, patientName: "Iceman", time: "03:00 PM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Cryo-heart rate", duration: 30, room: "Room 405" },
  { id: 799, doctorId: 15, patientId: 633, patientName: "Havok", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Cosmic rhythm", duration: 20, room: "Lab 1" },
  { id: 800, doctorId: 15, patientId: 634, patientName: "Polaris", time: "01:45 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Magnetic pulse arrhythmia", duration: 45, room: "OR 5" },

  { id: 801, doctorId: 15, patientId: 635, patientName: "Cable", time: "08:30 AM", date: "2026-01-07", type: "Follow-up", status: "Pending", notes: "TO virus heart", duration: 30, room: "Room 405" },
  { id: 802, doctorId: 15, patientId: 636, patientName: "Domino", time: "10:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Luck stress heart", duration: 30, room: "OR 5" },
  { id: 803, doctorId: 15, patientId: 637, patientName: "Deadpool", time: "02:00 PM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Unstable cancer heart", duration: 45, room: "Room 405" },
  { id: 804, doctorId: 15, patientId: 638, patientName: "Elektra", time: "11:30 AM", date: "2026-01-28", type: "Follow-up", status: "Confirmed", notes: "Ninja heart rate", duration: 30, room: "OR 5" },
  { id: 805, doctorId: 15, patientId: 639, patientName: "Daredevil", time: "03:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Radar sense heart", duration: 30, room: "Room 405" },

  { id: 806, doctorId: 15, patientId: 640, patientName: "Punisher", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "War heart", duration: 45, room: "OR 5" },
  { id: 807, doctorId: 15, patientId: 641, patientName: "Kingpin", time: "10:45 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Obstructive heart disease", duration: 30, room: "Room 405" },
  { id: 808, doctorId: 15, patientId: 642, patientName: "Bullseye", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Adrenaline junky heart", duration: 30, room: "OR 5" },
  { id: 809, doctorId: 15, patientId: 643, patientName: "Moon Knight", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Khonshu heart strain", duration: 45, room: "Room 405" },
  { id: 810, doctorId: 15, patientId: 644, patientName: "Blade", time: "11:00 AM", date: "2026-02-27", type: "Follow-up", status: "Confirmed", notes: "Vampire heart rate", duration: 30, room: "OR 5" },

  { id: 811, doctorId: 15, patientId: 645, patientName: "Morbius", time: "08:00 AM", date: "2026-03-06", type: "Check-up", status: "Pending", notes: "Living vampire heart", duration: 30, room: "Room 405" },
  { id: 812, doctorId: 15, patientId: 646, patientName: "Ghost Rider", time: "10:30 AM", date: "2026-03-13", type: "Consultation", status: "Confirmed", notes: "Hellfire heart", duration: 45, room: "OR 5" },
  { id: 813, doctorId: 15, patientId: 647, patientName: "Son of Satan", time: "01:15 PM", date: "2026-03-20", type: "Follow-up", status: "Pending", notes: "Daimon heart", duration: 30, room: "Room 405" },
  { id: 814, doctorId: 15, patientId: 648, patientName: "Hela", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Goddess heart", duration: 30, room: "OR 5" },
  { id: 815, doctorId: 15, patientId: 649, patientName: "Knull", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Symbiote god heart", duration: 45, room: "Room 405" },

  // DOCTOR 16: Dr. Wu (Virology)
  { id: 816, doctorId: 16, patientId: 650, patientName: "Rex (Jurassic Park)", time: "09:00 AM", date: "2025-10-02", type: "Lab Review", status: "Completed", notes: "Frog DNA virus check", duration: 30, room: "Biosafety Lab 1" },
  { id: 817, doctorId: 16, patientId: 651, patientName: "Blue", time: "10:30 AM", date: "2025-10-09", type: "Check-up", status: "Completed", notes: "Raptor flu", duration: 20, room: "Biosafety Lab 1" },
  { id: 818, doctorId: 16, patientId: 652, patientName: "Charlie", time: "01:00 PM", date: "2025-10-16", type: "Lab Review", status: "Completed", notes: "Respiratory infection", duration: 30, room: "Biosafety Lab 1" },
  { id: 819, doctorId: 16, patientId: 653, patientName: "Delta", time: "11:00 AM", date: "2025-10-23", type: "Check-up", status: "Completed", notes: "Scale rot virus", duration: 20, room: "Biosafety Lab 1" },
  { id: 820, doctorId: 16, patientId: 654, patientName: "Echo", time: "02:30 PM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Telehealth raptor", duration: 15, room: "Virtual" },

  { id: 821, doctorId: 16, patientId: 655, patientName: "Owen Grady", time: "09:15 AM", date: "2025-11-05", type: "Lab Review", status: "Completed", notes: "Raptor bite infection", duration: 30, room: "Biosafety Lab 1" },
  { id: 822, doctorId: 16, patientId: 656, patientName: "Claire Dearing", time: "11:45 AM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Dino flu shot", duration: 20, room: "Biosafety Lab 1" },
  { id: 823, doctorId: 16, patientId: 657, patientName: "Maisie Lockwood", time: "01:00 PM", date: "2025-11-19", type: "Lab Review", status: "Completed", notes: "Clone virus susceptibility", duration: 30, room: "Biosafety Lab 1" },
  { id: 824, doctorId: 16, patientId: 658, patientName: "Alan Grant", time: "10:00 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Ancient bacteria", duration: 20, room: "Biosafety Lab 1" },
  { id: 825, doctorId: 16, patientId: 659, patientName: "Ellie Sattler", time: "02:30 PM", date: "2025-11-28", type: "Lab Review", status: "Completed", notes: "Plant virus", duration: 30, room: "Biosafety Lab 1" },

  { id: 826, doctorId: 16, patientId: 660, patientName: "Ian Malcolm", time: "09:00 AM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Chaos theory cold", duration: 20, room: "Biosafety Lab 1" },
  { id: 827, doctorId: 16, patientId: 661, patientName: "John Hammond", time: "11:30 AM", date: "2025-12-10", type: "Lab Review", status: "Completed", notes: "Amber dust cough", duration: 30, room: "Biosafety Lab 1" },
  { id: 828, doctorId: 16, patientId: 662, patientName: "Ray Arnold", time: "03:00 PM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "IT virus (human)", duration: 20, room: "Biosafety Lab 1" },
  { id: 829, doctorId: 16, patientId: 663, patientName: "Robert Muldoon", time: "10:15 AM", date: "2025-12-24", type: "Lab Review", status: "Completed", notes: "Clever girl flu", duration: 30, room: "Biosafety Lab 1" },
  { id: 830, doctorId: 16, patientId: 664, patientName: "Lewis Dodgson", time: "01:45 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Corporate espionage virus", duration: 20, room: "Biosafety Lab 1" },

  { id: 831, doctorId: 16, patientId: 665, patientName: "Indominus Rex", time: "08:30 AM", date: "2026-01-07", type: "Lab Review", status: "Pending", notes: "Chameleon virus", duration: 30, room: "Biosafety Lab 1" },
  { id: 832, doctorId: 16, patientId: 666, patientName: "Indoraptor", time: "10:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Modified flu", duration: 20, room: "Biosafety Lab 1" },
  { id: 833, doctorId: 16, patientId: 667, patientName: "Mosasaurus", time: "02:00 PM", date: "2026-01-21", type: "Lab Review", status: "Pending", notes: "Sea lice", duration: 30, room: "Biosafety Lab 1" },
  { id: 834, doctorId: 16, patientId: 668, patientName: "Pteranodon", time: "11:30 AM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Avian flu", duration: 20, room: "Biosafety Lab 1" },
  { id: 835, doctorId: 16, patientId: 669, patientName: "Stegoceratops", time: "03:30 PM", date: "2026-01-30", type: "Lab Review", status: "Pending", notes: "Hybrid virus", duration: 30, room: "Biosafety Lab 1" },

  { id: 836, doctorId: 16, patientId: 670, patientName: "Baryonyx", time: "09:00 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Fungal infection", duration: 20, room: "Biosafety Lab 1" },
  { id: 837, doctorId: 16, patientId: 671, patientName: "Carnotaurus", time: "10:45 AM", date: "2026-02-11", type: "Lab Review", status: "Pending", notes: "Bull virus", duration: 30, room: "Biosafety Lab 1" },
  { id: 838, doctorId: 16, patientId: 672, patientName: "Allosaurus", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Old world virus", duration: 20, room: "Biosafety Lab 1" },
  { id: 839, doctorId: 16, patientId: 673, patientName: "Giganotosaurus", time: "02:30 PM", date: "2026-02-25", type: "Lab Review", status: "Pending", notes: "Giga virus", duration: 30, room: "Biosafety Lab 1" },
  { id: 840, doctorId: 16, patientId: 674, patientName: "Tyrannosaurus Rex", time: "11:00 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Rexy virus", duration: 20, room: "Biosafety Lab 1" },

  { id: 841, doctorId: 16, patientId: 675, patientName: "Velociraptor Beta", time: "08:00 AM", date: "2026-03-06", type: "Lab Review", status: "Pending", notes: "Scout virus", duration: 30, room: "Biosafety Lab 1" },
  { id: 842, doctorId: 16, patientId: 676, patientName: "Baby Raptor", time: "10:30 AM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Hatchling virus", duration: 20, room: "Biosafety Lab 1" },
  { id: 843, doctorId: 16, patientId: 677, patientName: "Compy", time: "01:15 PM", date: "2026-03-20", type: "Lab Review", status: "Pending", notes: "Compsonagnathus virus", duration: 30, room: "Biosafety Lab 1" },
  { id: 844, doctorId: 16, patientId: 678, patientName: "Triceratops", time: "03:00 PM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Trike flu", duration: 20, room: "Biosafety Lab 1" },
  { id: 845, doctorId: 16, patientId: 679, patientName: "Brachiosaurus", time: "09:30 AM", date: "2026-03-30", type: "Lab Review", status: "Pending", notes: "Brachio virus", duration: 30, room: "Biosafety Lab 1" },

  // DOCTOR 17: Dr. Octavius (Surgery - Trauma)
  { id: 846, doctorId: 17, patientId: 680, patientName: "Silver Surfer", time: "06:00 AM", date: "2025-10-02", type: "Surgery", status: "Completed", notes: "Cosmic board injury", duration: 180, room: "OR 6" },
  { id: 847, doctorId: 17, patientId: 681, patientName: "Galactus", time: "08:00 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Planet indigestion", duration: 45, room: "Room 201" },
  { id: 848, doctorId: 17, patientId: 682, patientName: "Nova", time: "10:00 AM", date: "2025-10-16", type: "Surgery", status: "Completed", notes: "Centurion repair", duration: 120, room: "OR 6" },
  { id: 849, doctorId: 17, patientId: 683, patientName: "Firelord", time: "12:00 PM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Burn treatment", duration: 45, room: "Room 202" },
  { id: 850, doctorId: 17, patientId: 684, patientName: "Air-Walker", time: "02:00 PM", date: "2025-10-30", type: "Surgery", status: "Completed", notes: "Cybernetic repair", duration: 180, room: "OR 6" },

  { id: 851, doctorId: 17, patientId: 685, patientName: "Terrax", time: "06:00 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Axe wound", duration: 45, room: "Room 201" },
  { id: 852, doctorId: 17, patientId: 686, patientName: "Stardust", time: "08:00 AM", date: "2025-11-12", type: "Surgery", status: "Completed", notes: "Matter reassembly", duration: 240, room: "OR 6" },
  { id: 853, doctorId: 17, patientId: 687, patientName: "Red Shift", time: "10:00 AM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Gravity injury", duration: 45, room: "Room 202" },
  { id: 854, doctorId: 17, patientId: 688, patientName: "Morg", time: "12:00 PM", date: "2025-11-26", type: "Surgery", status: "Completed", notes: "Berserker repair", duration: 180, room: "OR 6" },
  { id: 855, doctorId: 17, patientId: 689, patientName: "Titanus", time: "02:00 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Giant trauma", duration: 45, room: "Room 201" },

  { id: 856, doctorId: 17, patientId: 690, patientName: "Fallen One", time: "06:00 AM", date: "2025-12-03", type: "Surgery", status: "Completed", notes: "Angel wing repair", duration: 120, room: "OR 6" },
  { id: 857, doctorId: 17, patientId: 691, patientName: "Doom (Galan)", time: "08:00 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Existential crisis", duration: 45, room: "Room 202" },
  { id: 858, doctorId: 17, patientId: 692, patientName: "Thanos (Titan)", time: "10:00 AM", date: "2025-12-17", type: "Surgery", status: "Completed", notes: "Deviant syndrome", duration: 180, room: "OR 6" },
  { id: 859, doctorId: 17, patientId: 693, patientName: "Eros", time: "12:00 PM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Love sick", duration: 45, room: "Room 201" },
  { id: 860, doctorId: 17, patientId: 694, patientName: "Thena", time: "02:00 PM", date: "2025-12-31", type: "Surgery", status: "Completed", notes: "Mahd Wy'ry", duration: 240, room: "OR 6" },

  { id: 861, doctorId: 17, patientId: 695, patientName: "Kro", time: "06:00 AM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Deviant mutation", duration: 45, room: "Room 201" },
  { id: 862, doctorId: 17, patientId: 696, patientName: "Ikaris", time: "08:00 AM", date: "2026-01-14", type: "Surgery", status: "Confirmed", notes: "Eye beam removal", duration: 120, room: "OR 6" },
  { id: 863, doctorId: 17, patientId: 697, patientName: "Sersi", time: "10:00 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Transmutation fatigue", duration: 45, room: "Room 202" },
  { id: 864, doctorId: 17, patientId: 698, patientName: "Sprite", time: "12:00 PM", date: "2026-01-28", type: "Surgery", status: "Confirmed", notes: "Illusion surgery", duration: 180, room: "OR 6" },
  { id: 865, doctorId: 17, patientId: 699, patientName: "Phastos", time: "02:00 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Invention injury", duration: 45, room: "Room 201" },

  { id: 866, doctorId: 17, patientId: 700, patientName: "Makkari", time: "06:00 AM", date: "2026-02-04", type: "Surgery", status: "Confirmed", notes: "Speed friction burns", duration: 120, room: "OR 6" },
  { id: 867, doctorId: 17, patientId: 701, patientName: "Druig", time: "08:00 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Mind control burnout", duration: 45, room: "Room 202" },
  { id: 868, doctorId: 17, patientId: 702, patientName: "Gilgamesh", time: "10:00 AM", date: "2026-02-18", type: "Surgery", status: "Confirmed", notes: "Fist repair", duration: 180, room: "OR 6" },
  { id: 869, doctorId: 17, patientId: 703, patientName: "Ajak", time: "12:00 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Healing hands fatigue", duration: 45, room: "Room 201" },
  { id: 870, doctorId: 17, patientId: 704, patientName: "Kingo", time: "02:00 PM", date: "2026-02-27", type: "Surgery", status: "Confirmed", notes: "Cosmic discharge", duration: 120, room: "OR 6" },

  { id: 871, doctorId: 17, patientId: 705, patientName: "Black Knight", time: "06:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Ebony blade curse", duration: 45, room: "Room 202" },
  { id: 872, doctorId: 17, patientId: 706, patientName: "Sersi (Post)", time: "08:00 AM", date: "2026-03-13", type: "Surgery", status: "Confirmed", notes: "Memory restore", duration: 240, room: "OR 6" },
  { id: 873, doctorId: 17, patientId: 707, patientName: "Starfox", time: "10:00 AM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Eros infection", duration: 45, room: "Room 201" },
  { id: 874, doctorId: 17, patientId: 708, patientName: "Pip the Troll", time: "12:00 PM", date: "2026-03-27", type: "Surgery", status: "Confirmed", notes: "Troll regen", duration: 120, room: "OR 6" },
  { id: 875, doctorId: 17, patientId: 709, patientName: "Tiamut", time: "02:00 PM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Emergence pain", duration: 45, room: "Room 202" },

  // DOCTOR 18: Dr. Connors (Dermatology/Genetics)
  { id: 876, doctorId: 18, patientId: 710, patientName: "The Lizard", time: "09:30 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Scale shedding", duration: 30, room: "Room 220" },
  { id: 877, doctorId: 18, patientId: 711, patientName: "Iguana", time: "11:00 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Cold blooded skin", duration: 30, room: "Room 221" },
  { id: 878, doctorId: 18, patientId: 712, patientName: "Stegron", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Dino skin graft", duration: 30, room: "Room 220" },
  { id: 879, doctorId: 18, patientId: 713, patientName: "Klara", time: "02:30 PM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Plant skin", duration: 20, room: "Lab 5" },
  { id: 880, doctorId: 18, patientId: 714, patientName: "Man-Thing", time: "09:30 AM", date: "2025-10-30", type: "Video Call", status: "Completed", notes: "Swamp burn", duration: 15, room: "Virtual" },

  { id: 881, doctorId: 18, patientId: 715, patientName: "Howard the Duck", time: "11:00 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Feather molting", duration: 30, room: "Room 220" },
  { id: 882, doctorId: 18, patientId: 716, patientName: "Rocket Raccoon", time: "01:00 PM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Fur loss", duration: 30, room: "Room 221" },
  { id: 883, doctorId: 18, patientId: 717, patientName: "Groot", time: "02:30 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Bark beetles", duration: 30, room: "Room 220" },
  { id: 884, doctorId: 18, patientId: 718, patientName: "Cosmo", time: "09:30 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Space dog mange", duration: 20, room: "Lab 5" },
  { id: 885, doctorId: 18, patientId: 719, patientName: "Lockjaw", time: "11:00 AM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Paw pad infection", duration: 30, room: "Room 221" },

  { id: 886, doctorId: 18, patientId: 720, patientName: "Ms. Lion", time: "01:00 PM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Teleportation rash", duration: 30, room: "Room 220" },
  { id: 887, doctorId: 18, patientId: 721, patientName: "Throg", time: "02:30 PM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Toad skin", duration: 30, room: "Room 221" },
  { id: 888, doctorId: 18, patientId: 722, patientName: "Kitty Pryde (Lockheed)", time: "09:30 AM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Dragon scales", duration: 20, room: "Lab 5" },
  { id: 889, doctorId: 18, patientId: 723, patientName: "Bucky Barnes (Arm)", time: "11:00 AM", date: "2025-12-24", type: "Check-up", status: "Completed", notes: "Metal skin", duration: 30, room: "Room 220" },
  { id: 890, doctorId: 18, patientId: 724, patientName: "Aldrich Killian", time: "01:00 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Extremis rash", duration: 30, room: "Room 221" },

  { id: 891, doctorId: 18, patientId: 725, patientName: "Mandarin", time: "02:30 PM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Chimera virus skin", duration: 30, room: "Room 220" },
  { id: 892, doctorId: 18, patientId: 726, patientName: "Tobias Ford", time: "09:30 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Interdimensional rock", duration: 20, room: "Lab 5" },
  { id: 893, doctorId: 18, patientId: 727, patientName: "Dakota North", time: "11:00 AM", date: "2026-01-21", type: "Check-up", status: "Pending", notes: "Investigator bruising", duration: 30, room: "Room 221" },
  { id: 894, doctorId: 18, patientId: 728, patientName: "Jack Russell", time: "01:00 PM", date: "2026-01-28", type: "Consultation", status: "Confirmed", notes: "Werewolf fur", duration: 30, room: "Room 220" },
  { id: 895, doctorId: 18, patientId: 729, patientName: "Ninja", time: "02:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Hand rash", duration: 30, room: "Room 221" },

  { id: 896, doctorId: 18, patientId: 730, patientName: "Elektra", time: "09:30 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Scar tissue", duration: 20, room: "Lab 5" },
  { id: 897, doctorId: 18, patientId: 731, patientName: "Stick", time: "11:00 AM", date: "2026-02-11", type: "Check-up", status: "Pending", notes: "Blind skin sensitivity", duration: 30, room: "Room 220" },
  { id: 898, doctorId: 18, patientId: 732, patientName: "Typhoid Mary", time: "01:00 PM", date: "2026-02-18", type: "Consultation", status: "Confirmed", notes: "Split personality skin", duration: 30, room: "Room 221" },
  { id: 899, doctorId: 18, patientId: 733, patientName: "Kingpin", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Chafing", duration: 30, room: "Room 220" },
  { id: 900, doctorId: 18, patientId: 734, patientName: "Bullseye", time: "09:30 AM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Target mark", duration: 20, room: "Lab 5" },

  { id: 901, doctorId: 18, patientId: 735, patientName: "Echo", time: "11:00 AM", date: "2026-03-06", type: "Check-up", status: "Pending", notes: "Leg amputation scar", duration: 30, room: "Room 221" },
  { id: 902, doctorId: 18, patientId: 736, patientName: "White Tiger", time: "01:00 PM", date: "2026-03-13", type: "Consultation", status: "Confirmed", notes: "Tattoo rash", duration: 30, room: "Room 220" },
  { id: 903, doctorId: 18, patientId: 737, patientName: "Power Man", time: "02:30 PM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Steel skin rash", duration: 30, room: "Room 221" },
  { id: 904, doctorId: 18, patientId: 738, patientName: "Iron Fist", time: "09:30 AM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Chi burn", duration: 20, room: "Lab 5" },
  { id: 905, doctorId: 18, patientId: 739, patientName: "Shang-Chi", time: "11:00 AM", date: "2026-03-30", type: "Check-up", status: "Pending", notes: "Ten rings irritation", duration: 30, room: "Room 220" },

  // DOCTOR 19: Dr. Hamilton (Geriatrics)
  { id: 906, doctorId: 19, patientId: 740, patientName: "Captain America", time: "10:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Super soldier aging", duration: 45, room: "Room 600" },
  { id: 907, doctorId: 19, patientId: 741, patientName: "Black Widow", time: "11:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Red room aging", duration: 45, room: "Room 601" },
  { id: 908, doctorId: 19, patientId: 742, patientName: "Nick Fury", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Spy aging", duration: 30, room: "Room 600" },
  { id: 909, doctorId: 19, patientId: 743, patientName: "Peggy Carter", time: "02:30 PM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Old age", duration: 45, room: "Room 601" },
  { id: 910, doctorId: 19, patientId: 744, patientName: "Dum Dum Dugan", time: "10:00 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Commando aging", duration: 30, room: "Room 600" },

  { id: 911, doctorId: 19, patientId: 745, patientName: "Howling Commando", time: "11:30 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "WW2 veteran", duration: 45, room: "Room 601" },
  { id: 912, doctorId: 19, patientId: 746, patientName: "Bucky Barnes (Old)", time: "01:00 PM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Winter soldier aging", duration: 30, room: "Room 600" },
  { id: 913, doctorId: 19, patientId: 747, patientName: "Zola (Old)", time: "02:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Robotic aging", duration: 45, room: "Room 601" },
  { id: 914, doctorId: 19, patientId: 748, patientName: "Hydra Agent", time: "10:00 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Cult aging", duration: 30, room: "Room 600" },
  { id: 915, doctorId: 19, patientId: 749, patientName: "Baron Strucker", time: "11:30 AM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Hand aging", duration: 45, room: "Room 601" },

  { id: 916, doctorId: 19, patientId: 750, patientName: "Wolverine (Old)", time: "01:00 PM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Old Man Logan", duration: 30, room: "Room 600" },
  { id: 917, doctorId: 19, patientId: 751, patientName: "Professor X (Old)", time: "02:30 PM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Old mentor", duration: 45, room: "Room 601" },
  { id: 918, doctorId: 19, patientId: 752, patientName: "Magneto (Old)", time: "10:00 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Old villain", duration: 30, room: "Room 600" },
  { id: 919, doctorId: 19, patientId: 753, patientName: "Kingpin (Old)", time: "11:30 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Old crime lord", duration: 45, room: "Room 601" },
  { id: 920, doctorId: 19, patientId: 754, patientName: "J. Jonah Jameson", time: "01:00 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Old editor", duration: 30, room: "Room 600" },

  { id: 921, doctorId: 19, patientId: 755, patientName: "Aunt May", time: "02:30 PM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Sweet old aunt", duration: 45, room: "Room 601" },
  { id: 922, doctorId: 19, patientId: 756, patientName: "Uncle Ben (Ghost)", time: "10:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Memory", duration: 30, room: "Room 600" },
  { id: 923, doctorId: 19, patientId: 757, patientName: "Obi-Wan Kenobi", time: "11:30 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Old wizard", duration: 45, room: "Room 601" },
  { id: 924, doctorId: 19, patientId: 758, patientName: "Yoda", time: "01:00 PM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "900 years old", duration: 30, room: "Room 600" },
  { id: 925, doctorId: 19, patientId: 759, patientName: "Mace Windu", time: "02:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Fallen master", duration: 45, room: "Room 601" },

  { id: 926, doctorId: 19, patientId: 760, patientName: "Darth Vader", time: "10:00 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Cyborg aging", duration: 30, room: "Room 600" },
  { id: 927, doctorId: 19, patientId: 761, patientName: "The Emperor", time: "11:30 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Sith aging", duration: 45, room: "Room 601" },
  { id: 928, doctorId: 19, patientId: 762, patientName: "Dooku", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Count aging", duration: 30, room: "Room 600" },
  { id: 929, doctorId: 19, patientId: 763, patientName: "Grievous", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Droid aging", duration: 45, room: "Room 601" },
  { id: 930, doctorId: 19, patientId: 764, patientName: "Tarkin", time: "10:00 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Grand Moff aging", duration: 30, room: "Room 600" },

  { id: 931, doctorId: 19, patientId: 765, patientName: "Ackbar", time: "11:30 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Admiral aging", duration: 45, room: "Room 601" },
  { id: 932, doctorId: 19, patientId: 766, patientName: "Mon Mothma", time: "01:00 PM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Chancellor aging", duration: 30, room: "Room 600" },
  { id: 933, doctorId: 19, patientId: 767, patientName: "Leia (Old)", time: "02:30 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "General aging", duration: 45, room: "Room 601" },
  { id: 934, doctorId: 19, patientId: 768, patientName: "Han (Old)", time: "10:00 AM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Smuggler aging", duration: 30, room: "Room 600" },
  { id: 935, doctorId: 19, patientId: 769, patientName: "Lando (Old)", time: "11:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Baron aging", duration: 45, room: "Room 601" },

  // DOCTOR 20: Dr. Storm (Obstetrics/Gynecology)
  { id: 936, doctorId: 20, patientId: 770, patientName: "Wasp (Janet)", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Shrinking uterus", duration: 30, room: "Room 700" },
  { id: 937, doctorId: 20, patientId: 771, patientName: "Wasp (Hope)", time: "11:00 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Future pregnancy", duration: 30, room: "Room 700" },
  { id: 938, doctorId: 20, patientId: 772, patientName: "Mockingbird", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Spy wellness", duration: 30, room: "Room 700" },
  { id: 939, doctorId: 20, patientId: 773, patientName: "Phantom Rider", time: "02:30 PM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Ghost check", duration: 30, room: "Room 700" },
  { id: 940, doctorId: 20, patientId: 774, patientName: "Sharon Carter", time: "09:00 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Agent wellness", duration: 30, room: "Room 700" },

  { id: 941, doctorId: 20, patientId: 775, patientName: "Maria Hill", time: "11:00 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Deputy wellness", duration: 30, room: "Room 700" },
  { id: 942, doctorId: 20, patientId: 776, patientName: "Black Widow (Yelena)", time: "01:00 PM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Red room survivor", duration: 30, room: "Room 700" },
  { id: 943, doctorId: 20, patientId: 777, patientName: "Melina", time: "02:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Mother widow", duration: 30, room: "Room 700" },
  { id: 944, doctorId: 20, patientId: 778, patientName: "Taskmaster", time: "09:00 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Copycat scan", duration: 30, room: "Room 700" },
  { id: 945, doctorId: 20, patientId: 779, patientName: "Red Guardian", time: "11:00 AM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Dad check", duration: 30, room: "Room 700" },

  { id: 946, doctorId: 20, patientId: 780, patientName: "Iron Maiden", time: "01:00 PM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Soviet suit", duration: 30, room: "Room 700" },
  { id: 947, doctorId: 20, patientId: 781, patientName: "Ursa Major", time: "02:30 PM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Bear shift", duration: 30, room: "Room 700" },
  { id: 948, doctorId: 20, patientId: 782, patientName: "Darkstar", time: "09:00 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Dark force", duration: 30, room: "Room 700" },
  { id: 949, doctorId: 20, patientId: 783, patientName: "Valkyrie", time: "11:00 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Asgardian health", duration: 30, room: "Room 700" },
  { id: 950, doctorId: 20, patientId: 784, patientName: "Sif", time: "01:00 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Warrior health", duration: 30, room: "Room 700" },

  { id: 951, doctorId: 20, patientId: 785, patientName: "Hela", time: "02:30 PM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Goddess health", duration: 30, room: "Room 700" },
  { id: 952, doctorId: 20, patientId: 786, patientName: "Amora", time: "09:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Enchantress health", duration: 30, room: "Room 700" },
  { id: 953, doctorId: 20, patientId: 787, patientName: "Lorelei", time: "11:00 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Siren health", duration: 30, room: "Room 700" },
  { id: 954, doctorId: 20, patientId: 788, patientName: "Lady Sif", time: "01:00 PM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Lady health", duration: 30, room: "Room 700" },
  { id: 955, doctorId: 20, patientId: 789, patientName: "Brunnhilde", time: "02:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Valkyrie check", duration: 30, room: "Room 700" },

  { id: 956, doctorId: 20, patientId: 790, patientName: "Wanda (Mom)", time: "09:00 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Mom health", duration: 30, room: "Room 700" },
  { id: 957, doctorId: 20, patientId: 791, patientName: "Wiccan", time: "11:00 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Teen witch health", duration: 30, room: "Room 700" },
  { id: 958, doctorId: 20, patientId: 792, patientName: "Speed", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Speedster health", duration: 30, room: "Room 700" },
  { id: 959, doctorId: 20, patientId: 793, patientName: "Cassie Lang (Stature)", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Growth health", duration: 30, room: "Room 700" },
  { id: 960, doctorId: 20, patientId: 794, patientName: "Kate Bishop", time: "09:00 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Archer health", duration: 30, room: "Room 700" },

  { id: 961, doctorId: 20, patientId: 795, patientName: "America Chavez", time: "11:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Star health", duration: 30, room: "Room 700" },
  { id: 962, doctorId: 20, patientId: 796, patientName: "Kamala Khan", time: "01:00 PM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Ms Marvel health", duration: 30, room: "Room 700" },
  { id: 963, doctorId: 20, patientId: 797, patientName: "Monica Rambeau", time: "02:30 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Photon health", duration: 30, room: "Room 700" },
  { id: 964, doctorId: 20, patientId: 798, patientName: "Maria Rambeau (Captain)", time: "09:00 AM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Binary health", duration: 30, room: "Room 700" },
  { id: 965, doctorId: 20, patientId: 799, patientName: "Okoye", time: "11:00 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Dora health", duration: 30, room: "Room 700" },

  // =========================================================
  // BATCH 3: ADDITIONAL PATIENTS (DOCTORS 21-30)
  // =========================================================

  // DOCTOR 21: Dr. Lensherr (Hematology)
  { id: 966, doctorId: 21, patientId: 800, patientName: "Blade", time: "08:30 AM", date: "2025-10-02", type: "Lab Review", status: "Completed", notes: "Vampire blood count", duration: 30, room: "Room 800" },
  { id: 967, doctorId: 21, patientId: 801, patientName: "Dracula", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Ancient blood", duration: 45, room: "Room 801" },
  { id: 968, doctorId: 21, patientId: 802, patientName: "Morbius", time: "01:00 PM", date: "2025-10-16", type: "Lab Review", status: "Completed", notes: "Living vampire blood", duration: 30, room: "Room 800" },
  { id: 969, doctorId: 21, patientId: 803, patientName: "Hannibal King", time: "11:00 AM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Cured vampire blood", duration: 45, room: "Room 801" },
  { id: 970, doctorId: 21, patientId: 804, patientName: "Kingpin", time: "02:30 PM", date: "2025-10-30", type: "Lab Review", status: "Completed", notes: "Type A negative", duration: 30, room: "Room 800" },

  { id: 971, doctorId: 21, patientId: 805, patientName: "Punisher", time: "08:30 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "War blood", duration: 45, room: "Room 801" },
  { id: 972, doctorId: 21, patientId: 806, patientName: "Daredevil", time: "10:30 AM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Radar blood", duration: 30, room: "Room 800" },
  { id: 973, doctorId: 21, patientId: 807, patientName: "Elektra", time: "01:00 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Assassin blood", duration: 45, room: "Room 801" },
  { id: 974, doctorId: 21, patientId: 808, patientName: "Stick", time: "11:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Ninja blood", duration: 30, room: "Room 800" },
  { id: 975, doctorId: 21, patientId: 809, patientName: "Stone", time: "02:30 PM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Chaste blood", duration: 45, room: "Room 801" },

  { id: 976, doctorId: 21, patientId: 810, patientName: "Iron Fist", time: "08:30 AM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Chi blood", duration: 30, room: "Room 800" },
  { id: 977, doctorId: 21, patientId: 811, patientName: "Luke Cage", time: "10:30 AM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Power Man blood", duration: 45, room: "Room 801" },
  { id: 978, doctorId: 21, patientId: 812, patientName: "Iron Man", time: "01:00 PM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Shrapnel count", duration: 30, room: "Room 800" },
  { id: 979, doctorId: 21, patientId: 813, patientName: "War Machine", time: "11:00 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Pilot blood", duration: 45, room: "Room 801" },
  { id: 980, doctorId: 21, patientId: 814, patientName: "Spider-Man", time: "02:30 PM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Radioactive blood", duration: 30, room: "Room 800" },

  { id: 981, doctorId: 21, patientId: 815, patientName: "Venom", time: "08:30 AM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Symbiote blood", duration: 45, room: "Room 801" },
  { id: 982, doctorId: 21, patientId: 816, patientName: "Carnage", time: "10:30 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Red blood", duration: 30, room: "Room 800" },
  { id: 983, doctorId: 21, patientId: 817, patientName: "Toxin", time: "01:00 PM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Blue blood", duration: 45, room: "Room 801" },
  { id: 984, doctorId: 21, patientId: 818, patientName: "Scream", time: "11:00 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Yellow blood", duration: 30, room: "Room 800" },
  { id: 985, doctorId: 21, patientId: 819, patientName: "Riot", time: "02:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Grey blood", duration: 45, room: "Room 801" },

  { id: 986, doctorId: 21, patientId: 820, patientName: "Lasher", time: "08:30 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Green blood", duration: 30, room: "Room 800" },
  { id: 987, doctorId: 21, patientId: 821, patientName: "Phage", time: "10:30 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Orange blood", duration: 45, room: "Room 801" },
  { id: 988, doctorId: 21, patientId: 822, patientName: "Agony", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Purple blood", duration: 30, room: "Room 800" },
  { id: 989, doctorId: 21, patientId: 823, patientName: "Hybrid", time: "11:00 AM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Mixed blood", duration: 45, room: "Room 801" },
  { id: 990, doctorId: 21, patientId: 824, patientName: "Scorn", time: "02:30 PM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Symbiote spawn blood", duration: 30, room: "Room 800" },

  { id: 991, doctorId: 21, patientId: 825, patientName: "Mania", time: "08:30 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Crazed blood", duration: 45, room: "Room 801" },
  { id: 992, doctorId: 21, patientId: 826, patientName: "Anti-Venom", time: "10:30 AM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "White blood", duration: 30, room: "Room 800" },
  { id: 993, doctorId: 21, patientId: 827, patientName: "Toxin (Pat)", time: "01:00 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Good blood", duration: 45, room: "Room 801" },
  { id: 994, doctorId: 21, patientId: 828, patientName: "Sleeper", time: "11:00 AM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Sleepy blood", duration: 30, room: "Room 800" },
  { id: 995, doctorId: 21, patientId: 829, patientName: "Grendel", time: "02:30 PM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Monster blood", duration: 45, room: "Room 801" },

  // DOCTOR 22: Dr. Mccoy (General Practice)
  { id: 996, doctorId: 22, patientId: 830, patientName: "Hikaru Sulu", time: "09:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Fencing injury", duration: 30, room: "Room 101" },
  { id: 997, doctorId: 22, patientId: 831, patientName: "Pavel Chekov", time: "11:00 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Headache", duration: 30, room: "Room 102" },
  { id: 998, doctorId: 22, patientId: 832, patientName: "Uhura", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Ear infection", duration: 30, room: "Room 101" },
  { id: 999, doctorId: 22, patientId: 833, patientName: "Christine Chapel", time: "02:30 PM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Nurse fatigue", duration: 30, room: "Room 102" },
  { id: 1000, doctorId: 22, patientId: 834, patientName: "Janice Rand", time: "09:00 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Yeoman check", duration: 30, room: "Room 101" },

  { id: 1001, doctorId: 22, patientId: 835, patientName: "Scotty", time: "11:00 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Engineer burn", duration: 30, room: "Room 102" },
  { id: 1002, doctorId: 22, patientId: 836, patientName: "Khan Noonien Singh", time: "01:00 PM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Augment health", duration: 30, room: "Room 101" },
  { id: 1003, doctorId: 22, patientId: 837, patientName: "Joachim", time: "02:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Augment check", duration: 30, room: "Room 102" },
  { id: 1004, doctorId: 22, patientId: 838, patientName: "Marla McGivers", time: "09:00 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Love sickness", duration: 30, room: "Room 101" },
  { id: 1005, doctorId: 22, patientId: 839, patientName: "Carol Marcus", time: "11:00 AM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Scientist stress", duration: 30, room: "Room 102" },

  { id: 1006, doctorId: 22, patientId: 840, patientName: "David Marcus", time: "01:00 PM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Genesis project", duration: 30, room: "Room 101" },
  { id: 1007, doctorId: 22, patientId: 841, patientName: "Kruge", time: "02:30 PM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Klingon flu", duration: 30, room: "Room 102" },
  { id: 1008, doctorId: 22, patientId: 842, patientName: "Maltz", time: "09:00 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Traitor pain", duration: 30, room: "Room 101" },
  { id: 1009, doctorId: 22, patientId: 843, patientName: "T'Lar", time: "11:00 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Vulcan ritual", duration: 30, room: "Room 102" },
  { id: 1010, doctorId: 22, patientId: 844, patientName: "Sarek", time: "01:00 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Ambassador health", duration: 30, room: "Room 101" },

  { id: 1011, doctorId: 22, patientId: 845, patientName: "Amanda Grayson", time: "02:30 PM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Human logic", duration: 30, room: "Room 102" },
  { id: 1012, doctorId: 22, patientId: 846, patientName: "Sybok", time: "09:00 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Half brother", duration: 30, room: "Room 101" },
  { id: 1013, doctorId: 22, patientId: 847, patientName: "Valeris", time: "11:00 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Traitor spy", duration: 30, room: "Room 102" },
  { id: 1014, doctorId: 22, patientId: 848, patientName: "Gorkon", time: "01:00 PM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Chancellor peace", duration: 30, room: "Room 101" },
  { id: 1015, doctorId: 22, patientId: 849, patientName: "Azetbur", time: "02:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Daughter peace", duration: 30, room: "Room 102" },

  { id: 1016, doctorId: 22, patientId: 850, patientName: "Chang", time: "09:00 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "General pain", duration: 30, room: "Room 101" },
  { id: 1017, doctorId: 22, patientId: 851, patientName: "Martia", time: "11:00 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Shapeshifter pain", duration: 30, room: "Room 102" },
  { id: 1018, doctorId: 22, patientId: 852, patientName: "Cartwright", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Admiral plot", duration: 30, room: "Room 101" },
  { id: 1019, doctorId: 22, patientId: 853, patientName: "Nexus", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "God complex", duration: 30, room: "Room 102" },
  { id: 1020, doctorId: 22, patientId: 854, patientName: "Guinan", time: "09:00 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Listener health", duration: 30, room: "Room 101" },

  { id: 1021, doctorId: 22, patientId: 855, patientName: "Ro Laren", time: "11:00 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Maquis health", duration: 30, room: "Room 102" },
  { id: 1022, doctorId: 22, patientId: 856, patientName: "Tomas Riker", time: "01:00 PM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Clone health", duration: 30, room: "Room 101" },
  { id: 1023, doctorId: 22, patientId: 857, patientName: "Soren", time: "02:30 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Genderless health", duration: 30, room: "Room 102" },
  { id: 1024, doctorId: 22, patientId: 858, patientName: "K'Ehleyr", time: "09:00 AM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Half Klingon", duration: 30, room: "Room 101" },
  { id: 1025, doctorId: 22, patientId: 859, patientName: "Alexander Rozhenko", time: "11:00 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Little Klingon", duration: 30, room: "Room 102" },

  // DOCTOR 23: Dr. Crusher (Internal Medicine)
  { id: 1026, doctorId: 23, patientId: 860, patientName: "Deanna Troi", time: "08:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Empathy headache", duration: 60, room: "Room 110" },
  { id: 1027, doctorId: 23, patientId: 861, patientName: "Data", time: "10:00 AM", date: "2025-10-09", type: "Check-up", status: "Completed", notes: "Positronic subroutine", duration: 30, room: "Room 111" },
  { id: 1028, doctorId: 23, patientId: 862, patientName: "Geordi La Forge", time: "01:00 PM", date: "2025-10-16", type: "Consultation", status: "Completed", notes: "Visor neural pain", duration: 45, room: "Room 110" },
  { id: 1029, doctorId: 23, patientId: 863, patientName: "Worf", time: "02:30 PM", date: "2025-10-23", type: "Check-up", status: "Completed", notes: "Klingon spine", duration: 30, room: "Room 111" },
  { id: 1030, doctorId: 23, patientId: 864, patientName: "Tasha Yar", time: "08:00 AM", date: "2025-10-30", type: "Consultation", status: "Completed", notes: "Security stress", duration: 60, room: "Room 110" },

  { id: 1031, doctorId: 23, patientId: 865, patientName: "Wesley Crusher", time: "10:00 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Genius metabolism", duration: 30, room: "Room 111" },
  { id: 1032, doctorId: 23, patientId: 866, patientName: "Q", time: "01:00 PM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Omnipotence flu", duration: 60, room: "Room 110" },
  { id: 1033, doctorId: 23, patientId: 867, patientName: "Lwaxana Troi", time: "02:30 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Mother stress", duration: 30, room: "Room 111" },
  { id: 1034, doctorId: 23, patientId: 868, patientName: "Miles O'Brien", time: "08:00 AM", date: "2025-11-26", type: "Consultation", status: "Completed", notes: "Transporter trauma", duration: 45, room: "Room 110" },
  { id: 1035, doctorId: 23, patientId: 869, patientName: "Keiko O'Brien", time: "10:00 AM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Botanist lung", duration: 30, room: "Room 111" },

  { id: 1036, doctorId: 23, patientId: 870, patientName: "Molly O'Brien", time: "01:00 PM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Child time loop", duration: 60, room: "Room 110" },
  { id: 1037, doctorId: 23, patientId: 871, patientName: "Yoshi O'Brien", time: "02:30 PM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Baby scan", duration: 30, room: "Room 111" },
  { id: 1038, doctorId: 23, patientId: 872, patientName: "Guinan", time: "08:00 AM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "El Aurian health", duration: 45, room: "Room 110" },
  { id: 1039, doctorId: 23, patientId: 873, patientName: "Ro Laren", time: "10:00 AM", date: "2025-12-24", type: "Check-up", status: "Completed", notes: "Bajoran scar", duration: 30, room: "Room 111" },
  { id: 1040, doctorId: 23, patientId: 874, patientName: "K'Ehleyr", time: "01:00 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Diplomat stress", duration: 60, room: "Room 110" },

  { id: 1041, doctorId: 23, patientId: 875, patientName: "Alexander Rozhenko", time: "02:30 PM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Young Klingon", duration: 30, room: "Room 111" },
  { id: 1042, doctorId: 23, patientId: 876, patientName: "B'Etor", time: "08:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Duras sister", duration: 45, room: "Room 110" },
  { id: 1043, doctorId: 23, patientId: 877, patientName: "Lursa", time: "10:00 AM", date: "2026-01-21", type: "Check-up", status: "Pending", notes: "Duras sister", duration: 30, room: "Room 111" },
  { id: 1044, doctorId: 23, patientId: 878, patientName: "Gowron", time: "01:00 PM", date: "2026-01-28", type: "Consultation", status: "Confirmed", notes: "Chancellor back pain", duration: 60, room: "Room 110" },
  { id: 1045, doctorId: 23, patientId: 879, patientName: "Torghn", time: "02:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Klingon council", duration: 30, room: "Room 111" },

  { id: 1046, doctorId: 23, patientId: 880, patientName: "Hugh", time: "08:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Borg individual", duration: 45, room: "Room 110" },
  { id: 1047, doctorId: 23, patientId: 881, patientName: "Lore", time: "10:00 AM", date: "2026-02-11", type: "Check-up", status: "Pending", notes: "Evil twin", duration: 30, room: "Room 111" },
  { id: 1048, doctorId: 23, patientId: 882, patientName: "Juliana Tainer", time: "01:00 PM", date: "2026-02-18", type: "Consultation", status: "Confirmed", notes: "Android wife", duration: 60, room: "Room 110" },
  { id: 1049, doctorId: 23, patientId: 883, patientName: "Dr. Soong", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Android father", duration: 30, room: "Room 111" },
  { id: 1050, doctorId: 23, patientId: 884, patientName: "Spiner", time: "08:00 AM", date: "2026-02-27", type: "Consultation", status: "Confirmed", notes: "Actor virus", duration: 45, room: "Room 110" },

  { id: 1051, doctorId: 23, patientId: 885, patientName: "Vash", time: "10:00 AM", date: "2026-03-06", type: "Check-up", status: "Pending", notes: "Archaeologist rash", duration: 30, room: "Room 111" },
  { id: 1052, doctorId: 23, patientId: 886, patientName: "Riker (Thomas)", time: "01:00 PM", date: "2026-03-13", type: "Consultation", status: "Confirmed", notes: "Transporter clone", duration: 60, room: "Room 110" },
  { id: 1053, doctorId: 23, patientId: 887, patientName: "Minuet", time: "02:30 PM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Holodeck virus", duration: 30, room: "Room 111" },
  { id: 1054, doctorId: 23, patientId: 888, patientName: "Reginald Barclay", time: "08:00 AM", date: "2026-03-27", type: "Consultation", status: "Confirmed", notes: "Hypochondriac", duration: 45, room: "Room 110" },
  { id: 1055, doctorId: 23, patientId: 889, patientName: "Broccoli", time: "10:00 AM", date: "2026-03-30", type: "Check-up", status: "Pending", notes: "Spider mutation", duration: 30, room: "Room 111" },

  // DOCTOR 24: Dr. Bashir (Pediatrics)
  { id: 1056, doctorId: 24, patientId: 890, patientName: "Alexander Rozhenko", time: "09:30 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Klingon shots", duration: 30, room: "Room 212" },
  { id: 1057, doctorId: 24, patientId: 891, patientName: "Molly O'Brien", time: "11:00 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Toddler time", duration: 20, room: "Room 213" },
  { id: 1058, doctorId: 24, patientId: 892, patientName: "Yoshi O'Brien", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Baby wellness", duration: 30, room: "Room 212" },
  { id: 1059, doctorId: 24, patientId: 893, patientName: "Jake Sisko", time: "02:30 PM", date: "2025-10-23", type: "Follow-up", status: "Completed", notes: "Writing hand", duration: 20, room: "Room 213" },
  { id: 1060, doctorId: 24, patientId: 894, patientName: "Nog", time: "09:30 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Ferengi lobes", duration: 30, room: "Room 212" },

  { id: 1061, doctorId: 24, patientId: 895, patientName: "Keiko O'Brien", time: "11:00 AM", date: "2025-11-05", type: "Follow-up", status: "Completed", notes: "Plants in class", duration: 20, room: "Room 213" },
  { id: 1062, doctorId: 24, patientId: 896, patientName: "Kira Nerys", time: "01:00 PM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Resistance stress", duration: 30, room: "Room 212" },
  { id: 1063, doctorId: 24, patientId: 897, patientName: "Odo", time: "02:30 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Changeling bucket", duration: 20, room: "Room 213" },
  { id: 1064, doctorId: 24, patientId: 898, patientName: "Quark", time: "09:30 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Greed virus", duration: 30, room: "Room 212" },
  { id: 1065, doctorId: 24, patientId: 899, patientName: "Rom", time: "11:00 AM", date: "2025-11-28", type: "Follow-up", status: "Completed", notes: "Engineer ears", duration: 20, room: "Room 213" },

  { id: 1066, doctorId: 24, patientId: 900, patientName: "Leeta", time: "01:00 PM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Dabo girl arms", duration: 30, room: "Room 212" },
  { id: 1067, doctorId: 24, patientId: 901, patientName: "Garak", time: "02:30 PM", date: "2025-12-10", type: "Follow-up", status: "Completed", notes: "Tailor fit", duration: 20, room: "Room 213" },
  { id: 1068, doctorId: 24, patientId: 902, patientName: "Dukat", time: "09:30 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Gul ego", duration: 30, room: "Room 212" },
  { id: 1069, doctorId: 24, patientId: 903, patientName: "Damar", time: "11:00 AM", date: "2025-12-24", type: "Follow-up", status: "Completed", notes: "Leg bite", duration: 20, room: "Room 213" },
  { id: 1070, doctorId: 24, patientId: 904, patientName: "Weyoun", time: "01:00 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Vorta clone", duration: 30, room: "Room 212" },

  { id: 1071, doctorId: 24, patientId: 905, patientName: "Female Changeling", time: "02:30 PM", date: "2026-01-07", type: "Follow-up", status: "Pending", notes: "Great Link", duration: 20, room: "Room 213" },
  { id: 1072, doctorId: 24, patientId: 906, patientName: "Winn Adami", time: "09:30 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Kai stress", duration: 30, room: "Room 212" },
  { id: 1073, doctorId: 24, patientId: 907, patientName: "Bareil Antos", time: "11:00 AM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Vedek injury", duration: 20, room: "Room 213" },
  { id: 1074, doctorId: 24, patientId: 908, patientName: "Kai Opaka", time: "01:00 PM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Prophet vision", duration: 30, room: "Room 212" },
  { id: 1075, doctorId: 24, patientId: 909, patientName: "Ziyal", time: "02:30 PM", date: "2026-01-30", type: "Follow-up", status: "Pending", notes: "Half Bajoran", duration: 20, room: "Room 213" },

  { id: 1076, doctorId: 24, patientId: 910, patientName: "Gul Evek", time: "09:30 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Cardassian flu", duration: 30, room: "Room 212" },
  { id: 1077, doctorId: 24, patientId: 911, patientName: "Seska", time: "11:00 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Bajoran spy", duration: 20, room: "Room 213" },
  { id: 1078, doctorId: 24, patientId: 912, patientName: "Lon Suder", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Betazoid violence", duration: 30, room: "Room 212" },
  { id: 1079, doctorId: 24, patientId: 913, patientName: "Michael Eddington", time: "02:30 PM", date: "2026-02-25", type: "Follow-up", status: "Pending", notes: "Maquis traitor", duration: 20, room: "Room 213" },
  { id: 1080, doctorId: 24, patientId: 914, patientName: "Kasidy Yates", time: "09:30 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Cargo Captain", duration: 30, room: "Room 212" },

  { id: 1081, doctorId: 24, patientId: 915, patientName: "Zek", time: "11:00 AM", date: "2026-03-06", type: "Follow-up", status: "Pending", notes: "Nagus health", duration: 20, room: "Room 213" },
  { id: 1082, doctorId: 24, patientId: 916, patientName: "Ishka", time: "01:00 PM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Moogie clothes", duration: 30, room: "Room 212" },
  { id: 1083, doctorId: 24, patientId: 917, patientName: "Brunt", time: "02:30 PM", date: "2026-03-20", type: "Follow-up", status: "Pending", notes: "FCPA stress", duration: 20, room: "Room 213" },
  { id: 1084, doctorId: 24, patientId: 918, patientName: "Grilka", time: "09:30 AM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Klingon ex-wife", duration: 30, room: "Room 212" },
  { id: 1085, doctorId: 24, patientId: 919, patientName: "Pel", time: "11:00 AM", date: "2026-03-30", type: "Follow-up", status: "Pending", notes: "Female Ferengi", duration: 20, room: "Room 213" },

  // DOCTOR 25: Dr. Phlox (Exobiology/Allergy)
  { id: 1086, doctorId: 25, patientId: 920, patientName: "Hoshi Sato", time: "07:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Translator virus", duration: 45, room: "Room 320" },
  { id: 1087, doctorId: 25, patientId: 921, patientName: "Travis Mayweather", time: "09:30 AM", date: "2025-10-09", type: "Lab Review", status: "Completed", notes: "Boomer rash", duration: 20, room: "Room 321" },
  { id: 1088, doctorId: 25, patientId: 922, patientName: "Malcolm Reed", time: "11:00 AM", date: "2025-10-16", type: "Consultation", status: "Completed", notes: "Explosion burn", duration: 45, room: "Room 320" },
  { id: 1089, doctorId: 25, patientId: 923, patientName: "Mayweather (Travis)", time: "01:30 PM", date: "2025-10-23", type: "Lab Review", status: "Completed", notes: "Space allergy", duration: 20, room: "Room 321" },
  { id: 1090, doctorId: 25, patientId: 924, patientName: "Porthos", time: "02:00 PM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Beagle shots", duration: 30, room: "Room 320" },

  { id: 1091, doctorId: 25, patientId: 925, patientName: "Shran", time: "09:30 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Andorian antenna", duration: 45, room: "Room 321" },
  { id: 1092, doctorId: 25, patientId: 926, patientName: "Talas", time: "11:00 AM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Andorian flu", duration: 20, room: "Room 320" },
  { id: 1093, doctorId: 25, patientId: 927, patientName: "Vissian Captain", time: "01:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Cogenitor health", duration: 45, room: "Room 321" },
  { id: 1094, doctorId: 25, patientId: 928, patientName: "Sim", time: "02:00 PM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Sim clone", duration: 20, room: "Room 320" },
  { id: 1095, doctorId: 25, patientId: 929, patientName: "Eriksson", time: "09:30 AM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Engineer worm", duration: 45, room: "Room 321" },

  { id: 1096, doctorId: 25, patientId: 930, patientName: "Silik", time: "11:00 AM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Suliban DNA", duration: 20, room: "Room 320" },
  { id: 1097, doctorId: 25, patientId: 931, patientName: "Future Guy", time: "01:30 PM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Temporal sickness", duration: 45, room: "Room 321" },
  { id: 1098, doctorId: 25, patientId: 932, patientName: "Rajiin", time: "02:00 PM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Xindi spy", duration: 20, room: "Room 320" },
  { id: 1099, doctorId: 25, patientId: 933, patientName: "Degra", time: "09:30 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Xindi weapon guilt", duration: 45, room: "Room 321" },
  { id: 1100, doctorId: 25, patientId: 934, patientName: "Dolim", time: "11:00 AM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Reptilian bite", duration: 20, room: "Room 320" },

  { id: 1101, doctorId: 25, patientId: 935, patientName: "Hoshi (Future)", time: "01:30 PM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Alternate timeline", duration: 45, room: "Room 321" },
  { id: 1102, doctorId: 25, patientId: 936, patientName: "Daniels", time: "02:00 PM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "Time agent", duration: 20, room: "Room 320" },
  { id: 1103, doctorId: 25, patientId: 937, patientName: "Crewman Daniels", time: "09:30 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Future corpse", duration: 45, room: "Room 321" },
  { id: 1104, doctorId: 25, patientId: 938, patientName: "Kovich", time: "11:00 AM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "31st century cold", duration: 20, room: "Room 320" },
  { id: 1105, doctorId: 25, patientId: 939, patientName: "Booker", time: "01:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Courier rash", duration: 45, room: "Room 321" },

  { id: 1106, doctorId: 25, patientId: 940, patientName: "Grudge", time: "02:00 PM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Cat scan", duration: 20, room: "Room 320" },
  { id: 1107, doctorId: 25, patientId: 941, patientName: "Michael Burnham", time: "09:30 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Red angel strain", duration: 45, room: "Room 321" },
  { id: 1108, doctorId: 25, patientId: 942, patientName: "Saru", time: "11:00 AM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Kelpien ganglia", duration: 20, room: "Room 320" },
  { id: 1109, doctorId: 25, patientId: 943, patientName: "Tilly", time: "01:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Stress eater", duration: 45, room: "Room 321" },
  { id: 1110, doctorId: 25, patientId: 944, patientName: "Stamets", time: "02:00 PM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "Spore drive rash", duration: 20, room: "Room 320" },

  { id: 1111, doctorId: 25, patientId: 945, patientName: "Culber", time: "09:30 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Doctor death recovery", duration: 45, room: "Room 321" },
  { id: 1112, doctorId: 25, patientId: 946, patientName: "Airiam", time: "11:00 AM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "Cybernetic virus", duration: 20, room: "Room 320" },
  { id: 1113, doctorId: 25, patientId: 947, patientName: "Ryn", time: "01:30 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Andorian pain", duration: 45, room: "Room 321" },
  { id: 1114, doctorId: 25, patientId: 948, patientName: "Zareh", time: "02:00 PM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Scavenger bite", duration: 20, room: "Room 320" },
  { id: 1115, doctorId: 25, patientId: 949, patientName: "Osyraa", time: "09:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Emerald chain toxicity", duration: 45, room: "Room 321" },

  // DOCTOR 26: Dr. Polaski (Pathology)
  { id: 1116, doctorId: 26, patientId: 950, patientName: "Q", time: "08:00 AM", date: "2025-10-02", type: "Lab Review", status: "Completed", notes: "De-aged cells", duration: 60, room: "Lab 6" },
  { id: 1117, doctorId: 26, patientId: 951, patientName: "Lore", time: "10:30 AM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Evil chips", duration: 30, room: "Room 330" },
  { id: 1118, doctorId: 26, patientId: 952, patientName: "Borg Queen", time: "01:00 PM", date: "2025-10-16", type: "Lab Review", status: "Completed", notes: "Nanoprobe count", duration: 60, room: "Lab 6" },
  { id: 1119, doctorId: 26, patientId: 953, patientName: "Hugh Borg", time: "02:30 PM", date: "2025-10-23", type: "Consultation", status: "Completed", notes: "Individuality", duration: 30, room: "Room 330" },
  { id: 1120, doctorId: 26, patientId: 954, patientName: "Locutus", time: "08:00 AM", date: "2025-10-30", type: "Lab Review", status: "Completed", notes: "Picard cells", duration: 60, room: "Lab 6" },

  { id: 1121, doctorId: 26, patientId: 955, patientName: "Data (Lore)", time: "10:30 AM", date: "2025-11-05", type: "Consultation", status: "Completed", notes: "Positronic brain", duration: 30, room: "Room 330" },
  { id: 1122, doctorId: 26, patientId: 956, patientName: "Juliana Soong", time: "01:00 PM", date: "2025-11-12", type: "Lab Review", status: "Completed", notes: "Transfer beam", duration: 60, room: "Lab 6" },
  { id: 1123, doctorId: 26, patientId: 957, patientName: "Dr. Soong Sr.", time: "02:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Old cells", duration: 30, room: "Room 330" },
  { id: 1124, doctorId: 26, patientId: 958, patientName: "Noonian Soong", time: "08:00 AM", date: "2025-11-26", type: "Lab Review", status: "Completed", notes: "Genius cells", duration: 60, room: "Lab 6" },
  { id: 1125, doctorId: 26, patientId: 959, patientName: "Ara Minos", time: "10:30 AM", date: "2025-11-28", type: "Consultation", status: "Completed", notes: "Space virus", duration: 30, room: "Room 330" },

  { id: 1126, doctorId: 26, patientId: 960, patientName: "Alexander (Riker)", time: "01:00 PM", date: "2025-12-03", type: "Lab Review", status: "Completed", notes: "Clone cells", duration: 60, room: "Lab 6" },
  { id: 1127, doctorId: 26, patientId: 961, patientName: "Thomas Riker", time: "02:30 PM", date: "2025-12-10", type: "Consultation", status: "Completed", notes: "Transporter cells", duration: 30, room: "Room 330" },
  { id: 1128, doctorId: 26, patientId: 962, patientName: "Will Riker", time: "08:00 AM", date: "2025-12-17", type: "Lab Review", status: "Completed", notes: "Commander cells", duration: 60, room: "Lab 6" },
  { id: 1129, doctorId: 26, patientId: 963, patientName: "Troi (Imzadi)", time: "10:30 AM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Bond cells", duration: 30, room: "Room 330" },
  { id: 1130, doctorId: 26, patientId: 964, patientName: "Worf (Son)", time: "01:00 PM", date: "2025-12-31", type: "Lab Review", status: "Completed", notes: "Honor cells", duration: 60, room: "Lab 6" },

  { id: 1131, doctorId: 26, patientId: 965, patientName: "Gowron", time: "02:30 PM", date: "2026-01-07", type: "Consultation", status: "Pending", notes: "Chancellor cells", duration: 30, room: "Room 330" },
  { id: 1132, doctorId: 26, patientId: 966, patientName: "Martok", time: "08:00 AM", date: "2026-01-14", type: "Lab Review", status: "Confirmed", notes: "General cells", duration: 60, room: "Lab 6" },
  { id: 1133, doctorId: 26, patientId: 967, patientName: "Kurn", time: "10:30 AM", date: "2026-01-21", type: "Consultation", status: "Pending", notes: "Brother cells", duration: 30, room: "Room 330" },
  { id: 1134, doctorId: 26, patientId: 968, patientName: "Duras", time: "01:00 PM", date: "2026-01-28", type: "Lab Review", status: "Confirmed", notes: "Traitor cells", duration: 60, room: "Lab 6" },
  { id: 1135, doctorId: 26, patientId: 969, patientName: "Torghn", time: "02:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Council cells", duration: 30, room: "Room 330" },

  { id: 1136, doctorId: 26, patientId: 970, patientName: "B'Etor", time: "08:00 AM", date: "2026-02-04", type: "Lab Review", status: "Confirmed", notes: "Duras sister cells", duration: 60, room: "Lab 6" },
  { id: 1137, doctorId: 26, patientId: 971, patientName: "Lursa", time: "10:30 AM", date: "2026-02-11", type: "Consultation", status: "Pending", notes: "Duras sister cells", duration: 30, room: "Room 330" },
  { id: 1138, doctorId: 26, patientId: 972, patientName: "Kahless", time: "01:00 PM", date: "2026-02-18", type: "Lab Review", status: "Confirmed", notes: "Clone Kahless", duration: 60, room: "Lab 6" },
  { id: 1139, doctorId: 26, patientId: 973, patientName: "Molor", time: "02:30 PM", date: "2026-02-25", type: "Consultation", status: "Pending", notes: "Ancient cells", duration: 30, room: "Room 330" },
  { id: 1140, doctorId: 26, patientId: 974, patientName: "Morath", time: "08:00 AM", date: "2026-02-27", type: "Lab Review", status: "Confirmed", notes: "First Klingon", duration: 60, room: "Lab 6" },

  { id: 1141, doctorId: 26, patientId: 975, patientName: "T'Kuvma", time: "10:30 AM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Uniter cells", duration: 30, room: "Room 330" },
  { id: 1142, doctorId: 26, patientId: 976, patientName: "Kol", time: "01:00 PM", date: "2026-03-13", type: "Lab Review", status: "Confirmed", notes: "House of Kor cells", duration: 60, room: "Lab 6" },
  { id: 1143, doctorId: 26, patientId: 977, patientName: "Kor", time: "02:30 PM", date: "2026-03-20", type: "Consultation", status: "Pending", notes: "Dahar master cells", duration: 30, room: "Room 330" },
  { id: 1144, doctorId: 26, patientId: 978, patientName: "Koloth", time: "08:00 AM", date: "2026-03-27", type: "Lab Review", status: "Confirmed", notes: "Dahar master cells", duration: 60, room: "Lab 6" },
  { id: 1145, doctorId: 26, patientId: 979, patientName: "Kang", time: "10:30 AM", date: "2026-03-30", type: "Consultation", status: "Pending", notes: "Dahar master cells", duration: 30, room: "Room 330" },

  // DOCTOR 27: Dr. Troi (Psychiatry)
  { id: 1146, doctorId: 27, patientId: 980, patientName: "Data", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Dream program", duration: 60, room: "Room 352" },
  { id: 1147, doctorId: 27, patientId: 981, patientName: "Spock", time: "11:00 AM", date: "2025-10-09", type: "Follow-up", status: "Completed", notes: "Logic vs emotion", duration: 30, room: "Room 353" },
  { id: 1148, doctorId: 27, patientId: 982, patientName: "Sarek", time: "01:00 PM", date: "2025-10-16", type: "Consultation", status: "Completed", notes: "Bendii Syndrome", duration: 60, room: "Room 352" },
  { id: 1149, doctorId: 27, patientId: 983, patientName: "Amanda", time: "02:30 PM", date: "2025-10-23", type: "Follow-up", status: "Completed", notes: "Human wife stress", duration: 30, room: "Room 353" },
  { id: 1150, doctorId: 27, patientId: 984, patientName: "Sybok", time: "09:00 AM", date: "2025-10-30", type: "Consultation", status: "Completed", notes: "Emotional release", duration: 60, room: "Room 352" },

  { id: 1151, doctorId: 27, patientId: 985, patientName: "Valeris", time: "11:00 AM", date: "2025-11-05", type: "Follow-up", status: "Completed", notes: "Logic extremism", duration: 30, room: "Room 353" },
  { id: 1152, doctorId: 27, patientId: 986, patientName: "Saavik", time: "01:00 PM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "Half Vulcan struggle", duration: 60, room: "Room 352" },
  { id: 1153, doctorId: 27, patientId: 987, patientName: "T'Pring", time: "02:30 PM", date: "2025-11-19", type: "Follow-up", status: "Completed", notes: "Ston divorce", duration: 30, room: "Room 353" },
  { id: 1154, doctorId: 27, patientId: 988, patientName: "Ston", time: "09:00 AM", date: "2025-11-26", type: "Consultation", status: "Completed", notes: "Pon Farr trauma", duration: 60, room: "Room 352" },
  { id: 1155, doctorId: 27, patientId: 989, patientName: "T'Pau", time: "11:00 AM", date: "2025-11-28", type: "Follow-up", status: "Completed", notes: "Matriarch burden", duration: 30, room: "Room 353" },

  { id: 1156, doctorId: 27, patientId: 990, patientName: "Tuvok", time: "01:00 PM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Maquis repression", duration: 60, room: "Room 352" },
  { id: 1157, doctorId: 27, patientId: 991, patientName: "Vorik", time: "02:30 PM", date: "2025-12-10", type: "Follow-up", status: "Completed", notes: "Pon Farr counseling", duration: 30, room: "Room 353" },
  { id: 1158, doctorId: 27, patientId: 992, patientName: "Neelix", time: "09:00 AM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Morale officer stress", duration: 60, room: "Room 352" },
  { id: 1159, doctorId: 27, patientId: 993, patientName: "Kes", time: "11:00 AM", date: "2025-12-24", type: "Follow-up", status: "Completed", notes: "Ocampa lifespan", duration: 30, room: "Room 353" },
  { id: 1160, doctorId: 27, patientId: 994, patientName: "Seven of Nine", time: "01:00 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Borg individuality", duration: 60, room: "Room 352" },

  { id: 1161, doctorId: 27, patientId: 995, patientName: "Chakotay", time: "02:30 PM", date: "2026-01-07", type: "Follow-up", status: "Pending", notes: "Maquis guilt", duration: 30, room: "Room 353" },
  { id: 1162, doctorId: 27, patientId: 996, patientName: "Janeway", time: "09:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Captain's burden", duration: 60, room: "Room 352" },
  { id: 1163, doctorId: 27, patientId: 997, patientName: "Paris", time: "11:00 AM", date: "2026-01-21", type: "Follow-up", status: "Pending", notes: "Rebel maturity", duration: 30, room: "Room 353" },
  { id: 1164, doctorId: 27, patientId: 998, patientName: "Torres", time: "01:00 PM", date: "2026-01-28", type: "Consultation", status: "Confirmed", notes: "Klingon rage", duration: 60, room: "Room 352" },
  { id: 1165, doctorId: 27, patientId: 999, patientName: "Kim", time: "02:30 PM", date: "2026-01-30", type: "Follow-up", status: "Pending", notes: "Ensign anxiety", duration: 30, room: "Room 353" },

  { id: 1166, doctorId: 27, patientId: 1000, patientName: "The Doctor", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Hologram rights", duration: 60, room: "Room 352" },
  { id: 1167, doctorId: 27, patientId: 1001, patientName: "Icheb", time: "11:00 AM", date: "2026-02-11", type: "Follow-up", status: "Pending", notes: "Borg teen", duration: 30, room: "Room 353" },
  { id: 1168, doctorId: 27, patientId: 1002, patientName: "Naomi Wildman", time: "01:00 PM", date: "2026-02-18", type: "Consultation", status: "Confirmed", notes: "Ktarian child", duration: 60, room: "Room 352" },
  { id: 1169, doctorId: 27, patientId: 1003, patientName: "Samantha Wildman", time: "02:30 PM", date: "2026-02-25", type: "Follow-up", status: "Pending", notes: "Single mom", duration: 30, room: "Room 353" },
  { id: 1170, doctorId: 27, patientId: 1004, patientName: "Neelix (Chef)", time: "09:00 AM", date: "2026-02-27", type: "Consultation", status: "Confirmed", notes: "Culinary critique", duration: 60, room: "Room 352" },

  { id: 1171, doctorId: 27, patientId: 1005, patientName: "Tuvix", time: "11:00 AM", date: "2026-03-06", type: "Follow-up", status: "Pending", notes: "Existential crisis", duration: 30, room: "Room 353" },
  { id: 1172, doctorId: 27, patientId: 1006, patientName: "Jetal", time: "01:00 PM", date: "2026-03-13", type: "Consultation", status: "Confirmed", notes: "Redshirt trauma", duration: 60, room: "Room 352" },
  { id: 1173, doctorId: 27, patientId: 1007, patientName: "Equinox Doctor", time: "02:30 PM", date: "2026-03-20", type: "Follow-up", status: "Pending", notes: "Ethics violation", duration: 30, room: "Room 353" },
  { id: 1174, doctorId: 27, patientId: 1008, patientName: "Ransom", time: "09:00 AM", date: "2026-03-27", type: "Consultation", status: "Confirmed", notes: "Dark captain", duration: 60, room: "Room 352" },
  { id: 1175, doctorId: 27, patientId: 1009, patientName: "Marla Gilmore", time: "11:00 AM", date: "2026-03-30", type: "Follow-up", status: "Pending", notes: "Disloyalty guilt", duration: 30, room: "Room 353" },

  // DOCTOR 28: Dr. The Doctor (Emergency Medicine - Hologram)
  { id: 1176, doctorId: 28, patientId: 1010, patientName: "Neelix", time: "08:30 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Lungs transplant", duration: 30, room: "Sickbay 1" },
  { id: 1177, doctorId: 28, patientId: 1011, patientName: "Kes", time: "10:00 AM", date: "2025-10-09", type: "Surgery", status: "Completed", notes: "Ocampa flu", duration: 60, room: "Sickbay OR" },
  { id: 1178, doctorId: 28, patientId: 1012, patientName: "Janeway", time: "01:00 PM", date: "2025-10-16", type: "Check-up", status: "Completed", notes: "Coffee toxicity", duration: 30, room: "Sickbay 1" },
  { id: 1179, doctorId: 28, patientId: 1013, patientName: "Chakotay", time: "02:30 PM", date: "2025-10-23", type: "Surgery", status: "Completed", notes: "Tattoo infection", duration: 60, room: "Sickbay OR" },
  { id: 1180, doctorId: 28, patientId: 1014, patientName: "Paris", time: "08:30 AM", date: "2025-10-30", type: "Check-up", status: "Completed", notes: "Delta Flyer crash", duration: 30, room: "Sickbay 1" },

  { id: 1181, doctorId: 28, patientId: 1015, patientName: "Torres", time: "10:00 AM", date: "2025-11-05", type: "Surgery", status: "Completed", notes: "Engine burn", duration: 60, room: "Sickbay OR" },
  { id: 1182, doctorId: 28, patientId: 1016, patientName: "Kim", time: "01:00 PM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Ensign bump", duration: 30, room: "Sickbay 1" },
  { id: 1183, doctorId: 28, patientId: 1017, patientName: "Tuvok", time: "02:30 PM", date: "2025-11-19", type: "Surgery", status: "Completed", notes: "Neural pinch strain", duration: 60, room: "Sickbay OR" },
  { id: 1184, doctorId: 28, patientId: 1018, patientName: "Seven of Nine", time: "08:30 AM", date: "2025-11-26", type: "Check-up", status: "Completed", notes: "Borg implant removal", duration: 30, room: "Sickbay 1" },
  { id: 1185, doctorId: 28, patientId: 1019, patientName: "The Doctor (Mobile)", time: "10:00 AM", date: "2025-11-28", type: "Surgery", status: "Completed", notes: "Holo-emitter repair", duration: 60, room: "Sickbay OR" },

  { id: 1186, doctorId: 28, patientId: 1020, patientName: "Harry Kim (Clone)", time: "01:00 PM", date: "2025-12-03", type: "Check-up", status: "Completed", notes: "Demon class clone", duration: 30, room: "Sickbay 1" },
  { id: 1187, doctorId: 28, patientId: 1021, patientName: "Noss", time: "02:30 PM", date: "2025-12-10", type: "Surgery", status: "Completed", notes: "Vidiian injury", duration: 60, room: "Sickbay OR" },
  { id: 1188, doctorId: 28, patientId: 1022, patientName: "Jaffen", time: "08:30 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Quarren memory", duration: 30, room: "Sickbay 1" },
  { id: 1189, doctorId: 28, patientId: 1023, patientName: "Kadi Ambassador", time: "10:00 AM", date: "2025-12-24", type: "Surgery", status: "Completed", notes: "Sacred plaque", duration: 60, room: "Sickbay OR" },
  { id: 1190, doctorId: 28, patientId: 1024, patientName: "Chaotica", time: "01:00 PM", date: "2025-12-31", type: "Check-up", status: "Completed", notes: "Holo villain", duration: 30, room: "Sickbay 1" },

  { id: 1191, doctorId: 28, patientId: 1025, patientName: "Arachnia", time: "02:30 PM", date: "2026-01-07", type: "Surgery", status: "Pending", notes: "Holo queen sting", duration: 60, room: "Sickbay OR" },
  { id: 1192, doctorId: 28, patientId: 1026, patientName: "Captain Proton", time: "08:30 AM", date: "2026-01-14", type: "Check-up", status: "Confirmed", notes: "Ray gun burn", duration: 30, room: "Sickbay 1" },
  { id: 1193, doctorId: 28, patientId: 1027, patientName: "Buster Kincaid", time: "10:00 AM", date: "2026-01-21", type: "Surgery", status: "Pending", notes: "Sidekick bruise", duration: 60, room: "Sickbay OR" },
  { id: 1194, doctorId: 28, patientId: 1028, patientName: "Dr. Chaotica", time: "01:00 PM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Evil laugh fatigue", duration: 30, room: "Sickbay 1" },
  { id: 1195, doctorId: 28, patientId: 1029, patientName: "Con artist", time: "02:30 PM", date: "2026-01-30", type: "Surgery", status: "Pending", notes: "Fortune teller scam", duration: 60, room: "Sickbay OR" },

  { id: 1196, doctorId: 28, patientId: 1030, patientName: "Gar", time: "08:30 AM", date: "2026-02-04", type: "Check-up", status: "Confirmed", notes: "Norcadian injury", duration: 30, room: "Sickbay 1" },
  { id: 1197, doctorId: 28, patientId: 1031, patientName: "Jaryn", time: "10:00 AM", date: "2026-02-11", type: "Surgery", status: "Pending", notes: "Telsian flu", duration: 60, room: "Sickbay OR" },
  { id: 1198, doctorId: 28, patientId: 1032, patientName: "Geg", time: "01:00 PM", date: "2026-02-18", type: "Check-up", status: "Confirmed", notes: "Peanut allergy", duration: 30, room: "Sickbay 1" },
  { id: 1199, doctorId: 28, patientId: 1033, patientName: "Gegis", time: "02:30 PM", date: "2026-02-25", type: "Surgery", status: "Pending", notes: "Anaphylactic shock", duration: 60, room: "Sickbay OR" },
  { id: 1200, doctorId: 28, patientId: 1034, patientName: "Monean", time: "08:30 AM", date: "2026-02-27", type:"Check-up", status: "Confirmed", notes: "Ocean depth", duration: 30, room: "Sickbay 1" },

  { id: 1201, doctorId: 28, patientId: 1035, patientName: "Ransom", time: "10:00 AM", date: "2026-03-06", type: "Surgery", status: "Pending", notes: "Equinox injuries", duration: 60, room: "Sickbay OR" },
  { id: 1202, doctorId: 28, patientId: 1036, patientName: "Maxwell Burke", time: "01:00 PM", date: "2026-03-13", type: "Check-up", status: "Confirmed", notes: "Old friend guilt", duration: 30, room: "Sickbay 1" },
  { id: 1203, doctorId: 28, patientId: 1037, patientName: "Marla Gilmore", time: "02:30 PM", date: "2026-03-20", type: "Surgery", status: "Pending", notes: "Traitor injury", duration: 60, room: "Sickbay OR" },
  { id: 1204, doctorId: 28, patientId: 1038, patientName: "Lessing", time: "08:30 AM", date: "2026-03-27", type: "Check-up", status: "Confirmed", notes: "Crewman anxiety", duration: 30, room: "Sickbay 1" },
  { id: 1205, doctorId: 28, patientId: 1039, patientName: "Noah Lessing", time: "10:00 AM", date: "2026-03-30", type: "Surgery", status: "Pending", notes: "Son of scientist", duration: 60, room: "Sickbay OR" },

  // DOCTOR 29: Dr. Zee (Neurology - Future)
  { id: 1206, doctorId: 29, patientId: 1040, patientName: "Will Robinson", time: "09:00 AM", date: "2025-10-02", type: "Consultation", status: "Completed", notes: "Lost in space stress", duration: 45, room: "Room 340" },
  { id: 1207, doctorId: 29, patientId: 1041, patientName: "Penny Robinson", time: "11:30 AM", date: "2025-10-09", type: "Check-up", status: "Completed", notes: "Geologist focus", duration: 30, room: "Room 341" },
  { id: 1208, doctorId: 29, patientId: 1042, patientName: "Judy Robinson", time: "01:00 PM", date: "2025-10-16", type: "Consultation", status: "Completed", notes: "Bio-med pressure", duration: 45, room: "Room 340" },
  { id: 1209, doctorId: 29, patientId: 1043, patientName: "Don West", time: "02:30 PM", date: "2025-10-23", type: "Check-up", status: "Completed", notes: "Vendor cynicism", duration: 30, room: "Room 341" },
  { id: 1210, doctorId: 29, patientId: 1044, patientName: "Maureen Robinson", time: "09:00 AM", date: "2025-10-30", type: "Consultation", status: "Completed", notes: "Mother worry", duration: 45, room: "Room 340" },

  { id: 1211, doctorId: 29, patientId: 1045, patientName: "John Robinson", time: "11:30 AM", date: "2025-11-05", type: "Check-up", status: "Completed", notes: "Pilot responsibility", duration: 30, room: "Room 341" },
  { id: 1212, doctorId: 29, patientId: 1046, patientName: "Robot (Scarecrow)", time: "01:00 PM", date: "2025-11-12", type: "Consultation", status: "Completed", notes: "AI logic loop", duration: 45, room: "Room 340" },
  { id: 1213, doctorId: 29, patientId: 1047, patientName: "Dr. Smith", time: "02:30 PM", date: "2025-11-19", type: "Check-up", status: "Completed", notes: "Pathological lying", duration: 30, room: "Room 341" },
  { id: 1214, doctorId: 29, patientId: 1048, patientName: "Jupiter 2", time: "09:00 AM", date: "2025-11-26", type: "Consultation", status: "Completed", notes: "Ship neuro-link", duration: 45, room: "Room 340" },
  { id: 1215, doctorId: 29, patientId: 1049, patientName: "Alien Visitor", time: "11:30 AM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Telepathic projection", duration: 30, room: "Room 341" },

  { id: 1216, doctorId: 29, patientId: 1050, patientName: "Seth", time: "01:00 PM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Synthetic telepathy", duration: 45, room: "Room 340" },
  { id: 1217, doctorId: 29, patientId: 1051, patientName: "Verda", time: "02:30 PM", date: "2025-12-10", type: "Check-up", status: "Completed", notes: "Android fear", duration: 30, room: "Room 341" },
  { id: 1218, doctorId: 29, patientId: 1052, patientName: "June Harris", time: "09:00 AM", date: "2025-12-17", type: "Consultation", status: "Completed", notes: "Dr. Smith alias", duration: 45, room: "Room 340" },
  { id: 1219, doctorId: 29, patientId: 1053, patientName: "Judy Robinson (Rescue)", time: "11:30 AM", date: "2025-12-24", type: "Check-up", status: "Completed", notes: "Hypothermia recovery", duration: 30, room: "Room 341" },
  { id: 1220, doctorId: 29, patientId: 1054, patientName: "Penny (Cave)", time: "01:00 PM", date: "2025-12-31", type: "Consultation", status: "Completed", notes: "Claustrophobia", duration: 45, room: "Room 340" },

  { id: 1221, doctorId: 29, patientId: 1055, patientName: "Will (Future)", time: "02:30 PM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Time paradox", duration: 30, room: "Room 341" },
  { id: 1222, doctorId: 29, patientId: 1056, patientName: "Future Robot", time: "09:00 AM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "Damaged memory", duration: 45, room: "Room 340" },
  { id: 1223, doctorId: 29, patientId: 1057, patientName: "Ben Adler", time: "11:30 AM", date: "2026-01-21", type: "Check-up", status: "Pending", notes: "Alpha center stress", duration: 30, room: "Room 341" },
  { id: 1224, doctorId: 29, patientId: 1058, patientName: "DINA", time: "01:00 PM", date: "2026-01-28", type: "Consultation", status: "Confirmed", notes: "Alien bond", duration: 45, room: "Room 340" },
  { id: 1225, doctorId: 29, patientId: 1059, patientName: "Serpent", time: "02:30 PM", date: "2026-01-30", type: "Check-up", status: "Pending", notes: "Robot shell", duration: 30, room: "Room 341" },

  { id: 1226, doctorId: 29, patientId: 1060, patientName: "Scarecrow (Body)", time: "09:00 AM", date: "2026-02-04", type: "Consultation", status: "Confirmed", notes: "Host rejection", duration: 45, room: "Room 340" },
  { id: 1227, doctorId: 29, patientId: 1061, patientName: "Will (Adult)", time: "11:30 AM", date: "2026-02-11", type: "Check-up", status: "Pending", notes: "Adult Will", duration: 30, room: "Room 341" },
  { id: 1228, doctorId: 29, patientId: 1062, patientName: "Dr. Smith (Punished)", time: "01:00 PM", date: "2026-02-18", type: "Consultation", status: "Confirmed", notes: "Tree anxiety", duration: 45, room: "Room 340" },
  { id: 1229, doctorId: 29, patientId: 1063, patientName: "Jupiter (Wrecked)", time: "02:30 PM", date: "2026-02-25", type: "Check-up", status: "Pending", notes: "Ship grief", duration: 30, room: "Room 341" },
  { id: 1230, doctorId: 29, patientId: 1064, patientName: "Frieda", time: "09:00 AM", date: "2026-02-27", type: "Consultation", status: "Confirmed", notes: "Hacker stress", duration: 45, room: "Room 340" },

  { id: 1231, doctorId: 29, patientId: 1065, patientName: "Vikram", time: "11:30 AM", date: "2026-03-06", type: "Check-up", status: "Pending", notes: "Physicist stress", duration: 30, room: "Room 341" },
  { id: 1232, doctorId: 29, patientId: 1066, patientName: "Aunt Clara", time: "01:00 PM", date: "2026-03-13", type: "Consultation", status: "Confirmed", notes: "Hologram confusion", duration: 45, room: "Room 340" },
  { id: 1233, doctorId: 29, patientId: 1067, patientName: "Grant Kelly", time: "02:30 PM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Bill's father", duration: 30, room: "Room 341" },
  { id: 1234, doctorId: 29, patientId: 1068, patientName: "June (Mother)", time: "09:00 AM", date: "2026-03-27", type: "Consultation", status: "Confirmed", notes: "Missing daughter", duration: 45, room: "Room 340" },
  { id: 1235, doctorId: 29, patientId: 1069, patientName: "Holly Robinson", time: "11:30 AM", date: "2026-03-30", type: "Check-up", status: "Pending", notes: "Another daughter", duration: 30, room: "Room 341" },

  // DOCTOR 30: Dr. Smith (General Practice - Sketchy)
  { id: 1236, doctorId: 30, patientId: 1070, patientName: "Dr. Smith (Himself)", time: "10:00 AM", date: "2025-10-02", type: "Check-up", status: "Completed", notes: "Hypochondriac", duration: 20, room: "Room 900" },
  { id: 1237, doctorId: 30, patientId: 1071, patientName: "Robot (Check)", time: "12:30 PM", date: "2025-10-09", type: "Consultation", status: "Completed", notes: "Sabotage plan", duration: 30, room: "Room 901" },
  { id: 1238, doctorId: 30, patientId: 1072, patientName: "Will (Victim)", time: "03:00 PM", date: "2025-10-16", type: "Video Call", status: "Completed", notes: "Manipulated", duration: 15, room: "Virtual" },
  { id: 1239, doctorId: 30, patientId: 1073, patientName: "Penny (Victim)", time: "10:00 AM", date: "2025-10-23", type: "Check-up", status: "Completed", notes: "Lied to", duration: 20, room: "Room 900" },
  { id: 1240, doctorId: 30, patientId: 1074, patientName: "The Robot", time: "12:30 PM", date: "2025-10-30", type: "Consultation", status: "Completed", notes: "Disable attempt", duration: 30, room: "Room 901" },

  { id: 1241, doctorId: 30, patientId: 1075, patientName: "Penny (Trapped)", time: "03:00 PM", date: "2025-11-05", type: "Video Call", status: "Completed", notes: "Left behind", duration: 15, room: "Virtual" },
  { id: 1242, doctorId: 30, patientId: 1076, patientName: "Don (Partner)", time: "10:00 AM", date: "2025-11-12", type: "Check-up", status: "Completed", notes: "Suspicious", duration: 20, room: "Room 900" },
  { id: 1243, doctorId: 30, patientId: 1077, patientName: "John (Threat)", time: "12:30 PM", date: "2025-11-19", type: "Consultation", status: "Completed", notes: "Caught lying", duration: 30, room: "Room 901" },
  { id: 1244, doctorId: 30, patientId: 1078, patientName: "Maureen (Fooling)", time: "03:00 PM", date: "2025-11-26", type: "Video Call", status: "Completed", notes: "Charm offense", duration: 15, room: "Virtual" },
  { id: 1245, doctorId: 30, patientId: 1079, patientName: "Judy (Fooling)", time: "10:00 AM", date: "2025-11-28", type: "Check-up", status: "Completed", notes: "Faked injury", duration: 20, room: "Room 900" },

  { id: 1246, doctorId: 30, patientId: 1080, patientName: "Space Trader", time: "12:30 PM", date: "2025-12-03", type: "Consultation", status: "Completed", notes: "Scammed", duration: 30, room: "Room 901" },
  { id: 1247, doctorId: 30, patientId: 1081, patientName: "Verda (Rob)", time: "03:00 PM", date: "2025-12-10", type: "Video Call", status: "Completed", notes: "Betrayal", duration: 15, room: "Virtual" },
  { id: 1248, doctorId: 30, patientId: 1082, patientName: "Seth (Ruse)", time: "10:00 AM", date: "2025-12-17", type: "Check-up", status: "Completed", notes: "Play along", duration: 20, room: "Room 900" },
  { id: 1249, doctorId: 30, patientId: 1083, patientName: "June (Imposter)", time: "12:30 PM", date: "2025-12-24", type: "Consultation", status: "Completed", notes: "Identity theft", duration: 30, room: "Room 901" },
  { id: 1250, doctorId: 30, patientId: 1084, patientName: "Wreckage Crew", time: "03:00 PM", date: "2025-12-31", type: "Video Call", status: "Completed", notes: "Stole ship", duration: 15, room: "Virtual" },

  { id: 1251, doctorId: 30, patientId: 1085, patientName: "Serpent (Manipulate)", time: "10:00 AM", date: "2026-01-07", type: "Check-up", status: "Pending", notes: "Blackmailed", duration: 20, room: "Room 900" },
  { id: 1252, doctorId: 30, patientId: 1086, patientName: "Penny (Tricked)", time: "12:30 PM", date: "2026-01-14", type: "Consultation", status: "Confirmed", notes: "False trust", duration: 30, room: "Room 901" },
  { id: 1253, doctorId: 30, patientId: 1087, patientName: "Will (Hostage)", time: "03:00 PM", date: "2026-01-21", type: "Video Call", status: "Pending", notes: "Leverage", duration: 15, room: "Virtual" },
  { id: 1254, doctorId: 30, patientId: 1088, patientName: "Robot (Enemy)", time: "10:00 AM", date: "2026-01-28", type: "Check-up", status: "Confirmed", notes: "Enemy robot", duration: 20, room: "Room 900" },
  { id: 1255, doctorId: 30, patientId: 1089, patientName: "Don (Angry)", time: "12:30 PM", date: "2026-01-30", type: "Consultation", status: "Pending", notes: "Confrontation", duration: 30, room: "Room 901" },

  { id: 1256, doctorId: 30, patientId: 1090, patientName: "Rescue Team", time: "03:00 PM", date: "2026-02-04", type: "Video Call", status: "Confirmed", notes: "Deception", duration: 15, room: "Virtual" },
  { id: 1257, doctorId: 30, patientId: 1091, patientName: "Alpha Team", time: "10:00 AM", date: "2026-02-11", type: "Check-up", status: "Pending", notes: "Infiltration", duration: 20, room: "Room 900" },
  { id: 1258, doctorId: 30, patientId: 1092, patientName: "Aliens (Friend)", time: "12:30 PM", date: "2026-02-18", type: "Consultation", status: "Confirmed", notes: "Faked alliance", duration: 30, room: "Room 901" },
  { id: 1259, doctorId: 30, patientId: 1093, patientName: "Fuel Rods", time: "03:00 PM", date: "2026-02-25", type: "Video Call", status: "Pending", notes: "Sold for parts", duration: 15, room: "Virtual" },
  { id: 1260, doctorId: 30, patientId: 1094, patientName: "Jupiter 2 (Stolen)", time: "10:00 AM", date: "2026-02-27", type: "Check-up", status: "Confirmed", notes: "Stole ship", duration: 20, room: "Room 900" },

  { id: 1261, doctorId: 30, patientId: 1095, patientName: "Wreck (Damage)", time: "12:30 PM", date: "2026-03-06", type: "Consultation", status: "Pending", notes: "Engine sabotage", duration: 30, room: "Room 901" },
  { id: 1262, doctorId: 30, patientId: 1096, patientName: "Captain (Fake)", time: "03:00 PM", date: "2026-03-13", type: "Video Call", status: "Confirmed", notes: "Imposter captain", duration: 15, room: "Virtual" },
  { id: 1263, doctorId: 30, patientId: 1097, patientName: "Will (Rescued)", time: "10:00 AM", date: "2026-03-20", type: "Check-up", status: "Pending", notes: "Saved by Robot", duration: 20, room: "Room 900" },
  { id: 1264, doctorId: 30, patientId: 1098, patientName: "Robot (Lost)", time: "12:30 PM", date: "2026-03-27", type: "Consultation", status: "Confirmed", notes: "Left behind", duration: 30, room: "Room 901" },
  { id: 1265, doctorId: 30, patientId: 1099, patientName: "Dr. Smith (Escape)", time: "03:00 PM", date: "2026-03-30", type: "Video Call", status: "Pending", notes: "Getaway plan", duration: 15, room: "Virtual" }


];