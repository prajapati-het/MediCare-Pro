// Appointments data mapped to specific doctors
export interface Appointment {
  id: number;
  doctorId: number;
  patientId: number;
  patientName: string;
  time: string;
  date: string;
  type: 'Consultation' | 'Check-up' | 'Follow-up' | 'Video Call' | 'Surgery' | 'Lab Review';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled' | 'No Show';
  notes: string;
  duration: number; // in minutes
  room: string;
}

export const appointmentsData: Appointment[] = [
  // Dr. Sarah Mitchell (id: 1) - Cardiologist - December 2025
  { id: 1, doctorId: 1, patientId: 1, patientName: "John Smith", time: "09:00 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Blood pressure follow-up", duration: 30, room: "Room 401" },
  { id: 2, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "10:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Cardiac rhythm check", duration: 45, room: "Room 401" },
  { id: 3, doctorId: 1, patientId: 3, patientName: "Patricia Anderson", time: "11:30 AM", date: "2025-12-16", type: "Consultation", status: "Pending", notes: "New symptom discussion", duration: 30, room: "Room 402" },
  { id: 4, doctorId: 1, patientId: 1, patientName: "John Smith", time: "02:00 PM", date: "2025-12-17", type: "Lab Review", status: "Pending", notes: "Review blood work results", duration: 20, room: "Room 401" },
  { id: 5, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "03:30 PM", date: "2025-12-18", type: "Video Call", status: "Confirmed", notes: "Telemedicine follow-up", duration: 20, room: "Virtual" },
  { id: 24, doctorId: 1, patientId: 3, patientName: "Patricia Anderson", time: "09:30 AM", date: "2025-12-19", type: "Follow-up", status: "Pending", notes: "Heart failure monitoring", duration: 30, room: "Room 401" },
  { id: 25, doctorId: 1, patientId: 1, patientName: "John Smith", time: "11:00 AM", date: "2025-12-20", type: "Check-up", status: "Confirmed", notes: "Medication review", duration: 30, room: "Room 402" },
  { id: 26, doctorId: 1, patientId: 2, patientName: "Robert Wilson", time: "02:30 PM", date: "2025-12-22", type: "Surgery", status: "Pending", notes: "Pacemaker adjustment", duration: 60, room: "OR 2" },
  { id: 27, doctorId: 1, patientId: 3, patientName: "Patricia Anderson", time: "10:00 AM", date: "2025-12-23", type: "Consultation", status: "Confirmed", notes: "Treatment plan review", duration: 45, room: "Room 401" },

  // Dr. Michael Chen (id: 2) - Neurologist
  { id: 6, doctorId: 2, patientId: 4, patientName: "Emily Martinez", time: "09:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Migraine treatment review", duration: 30, room: "Room 403" },
  { id: 7, doctorId: 2, patientId: 5, patientName: "David Thompson", time: "11:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Parkinson's assessment", duration: 45, room: "Room 403" },
  { id: 8, doctorId: 2, patientId: 6, patientName: "Jennifer Lee", time: "02:30 PM", date: "2025-12-17", type: "Consultation", status: "Pending", notes: "MS treatment options", duration: 60, room: "Room 404" },
  { id: 9, doctorId: 2, patientId: 4, patientName: "Emily Martinez", time: "10:00 AM", date: "2025-12-18", type: "Video Call", status: "Pending", notes: "Medication adjustment discussion", duration: 20, room: "Virtual" },
  { id: 28, doctorId: 2, patientId: 5, patientName: "David Thompson", time: "09:00 AM", date: "2025-12-19", type: "Follow-up", status: "Confirmed", notes: "Tremor evaluation", duration: 30, room: "Room 403" },
  { id: 29, doctorId: 2, patientId: 6, patientName: "Jennifer Lee", time: "03:00 PM", date: "2025-12-20", type: "Lab Review", status: "Pending", notes: "MRI results review", duration: 30, room: "Room 404" },

  // Dr. Emily Davis (id: 3) - Orthopedics
  { id: 10, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "08:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Post-surgery check", duration: 30, room: "Room 201" },
  { id: 11, doctorId: 3, patientId: 8, patientName: "Karen White", time: "10:30 AM", date: "2025-12-16", type: "Consultation", status: "Confirmed", notes: "Knee replacement discussion", duration: 45, room: "Room 201" },
  { id: 12, doctorId: 3, patientId: 7, patientName: "Michael Brown", time: "09:00 AM", date: "2025-12-18", type: "Check-up", status: "Pending", notes: "Physical therapy progress", duration: 30, room: "Room 202" },
  { id: 30, doctorId: 3, patientId: 8, patientName: "Karen White", time: "02:00 PM", date: "2025-12-19", type: "Follow-up", status: "Confirmed", notes: "Pain management review", duration: 30, room: "Room 201" },

  // Dr. James Wilson (id: 4) - Pediatrics
  { id: 13, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "09:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Asthma management review", duration: 30, room: "Room 210" },
  { id: 14, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "10:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Ear infection follow-up", duration: 20, room: "Room 210" },
  { id: 15, doctorId: 4, patientId: 9, patientName: "Tommy Garcia", time: "11:00 AM", date: "2025-12-19", type: "Consultation", status: "Pending", notes: "Vaccination consultation", duration: 20, room: "Room 211" },
  { id: 31, doctorId: 4, patientId: 10, patientName: "Sophia Chen", time: "09:30 AM", date: "2025-12-20", type: "Check-up", status: "Confirmed", notes: "General wellness check", duration: 30, room: "Room 210" },

  // Dr. Lisa Anderson (id: 5) - Dermatology
  { id: 16, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "09:30 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Acne treatment progress", duration: 20, room: "Room 220" },
  { id: 17, doctorId: 5, patientId: 12, patientName: "George Miller", time: "11:00 AM", date: "2025-12-17", type: "Check-up", status: "Confirmed", notes: "Skin cancer screening", duration: 30, room: "Room 220" },
  { id: 18, doctorId: 5, patientId: 11, patientName: "Amanda Taylor", time: "02:00 PM", date: "2025-12-20", type: "Consultation", status: "Pending", notes: "Treatment adjustment", duration: 20, room: "Room 221" },

  // Dr. Robert Taylor (id: 6) - Oncology
  { id: 19, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "08:00 AM", date: "2025-12-16", type: "Check-up", status: "Confirmed", notes: "Chemotherapy response review", duration: 45, room: "Room 501" },
  { id: 20, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "10:00 AM", date: "2025-12-16", type: "Follow-up", status: "Confirmed", notes: "Post-radiation assessment", duration: 30, room: "Room 501" },
  { id: 21, doctorId: 6, patientId: 15, patientName: "William Clark", time: "11:30 AM", date: "2025-12-17", type: "Consultation", status: "Confirmed", notes: "Surveillance scan review", duration: 30, room: "Room 502" },
  { id: 22, doctorId: 6, patientId: 13, patientName: "Richard Davis", time: "09:00 AM", date: "2025-12-18", type: "Lab Review", status: "Pending", notes: "Blood count results", duration: 20, room: "Room 501" },
  { id: 23, doctorId: 6, patientId: 14, patientName: "Sandra Johnson", time: "10:00 AM", date: "2025-12-22", type: "Video Call", status: "Pending", notes: "Hormone therapy check-in", duration: 20, room: "Virtual" }
];