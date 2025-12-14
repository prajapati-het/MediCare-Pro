export interface DoctorAppointment {
  id: number;
  doctorId: number;
  patient: string;
  time: string;
  date: string;
  type: string;
  status: string;
  notes: string;
}

export interface DoctorPatient {
  id: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  lastVisit: string;
  condition: string;
  status: string;
}

export const doctorAppointments: DoctorAppointment[] = [
  // City General Hospital doctors (doctorId: 1-5)
  { id: 1, doctorId: 1, patient: "Aarav Patel", time: "09:00 AM", date: "2024-01-15", type: "Consultation", status: "Confirmed", notes: "Follow-up for blood pressure" },
  { id: 2, doctorId: 2, patient: "Riya Sharma", time: "10:30 AM", date: "2024-01-15", type: "Check-up", status: "Confirmed", notes: "Annual health check" },
  { id: 3, doctorId: 3, patient: "Kunal Mehta", time: "11:00 AM", date: "2024-01-15", type: "Video Call", status: "Upcoming", notes: "Telemedicine consultation" },
  { id: 4, doctorId: 4, patient: "Isha Verma", time: "02:00 PM", date: "2024-01-15", type: "Consultation", status: "Upcoming", notes: "New patient consultation" },
  { id: 5, doctorId: 5, patient: "Rajesh Kumar", time: "03:30 PM", date: "2024-01-15", type: "Follow-up", status: "Upcoming", notes: "Post-surgery follow-up" },

  // Metro Health Center doctors (doctorId: 6-10)
  { id: 6, doctorId: 6, patient: "Neha Desai", time: "09:45 AM", date: "2024-01-16", type: "Consultation", status: "Confirmed", notes: "Thyroid imbalance review" },
  { id: 7, doctorId: 7, patient: "Vikas Singh", time: "10:15 AM", date: "2024-01-16", type: "Emergency", status: "Critical", notes: "Severe chest pain" },
  { id: 8, doctorId: 8, patient: "Ananya Joshi", time: "11:45 AM", date: "2024-01-16", type: "Check-up", status: "Completed", notes: "Routine blood test review" },
  { id: 9, doctorId: 9, patient: "Manish Patel", time: "01:00 PM", date: "2024-01-16", type: "Consultation", status: "Upcoming", notes: "Migraine treatment" },
  { id: 10, doctorId: 10, patient: "Kritika Shah", time: "02:30 PM", date: "2024-01-16", type: "Video Call", status: "Upcoming", notes: "Anxiety therapy session" },

  // Sunrise Medical Complex doctors (doctorId: 11-15)
  { id: 11, doctorId: 11, patient: "Harshil Soni", time: "09:20 AM", date: "2024-01-17", type: "Follow-up", status: "Confirmed", notes: "Recovering from viral fever" },
  { id: 12, doctorId: 12, patient: "Priya Nair", time: "10:50 AM", date: "2024-01-17", type: "Consultation", status: "Completed", notes: "Skin allergy check" },
  { id: 13, doctorId: 13, patient: "Dhruv Rana", time: "12:00 PM", date: "2024-01-17", type: "Consultation", status: "Upcoming", notes: "Back pain evaluation" },
  { id: 14, doctorId: 14, patient: "Aditi Thakkar", time: "01:40 PM", date: "2024-01-17", type: "Check-up", status: "Upcoming", notes: "General health check" },
  { id: 15, doctorId: 15, patient: "Yuvraj Singh", time: "03:00 PM", date: "2024-01-17", type: "Follow-up", status: "Upcoming", notes: "Post-physical therapy review" },

  // Valley Regional Hospital doctors (doctorId: 16-20)
  { id: 16, doctorId: 16, patient: "Sneha Jain", time: "09:10 AM", date: "2024-01-18", type: "Consultation", status: "Confirmed", notes: "Pregnancy-related consultation" },
  { id: 17, doctorId: 17, patient: "Rohan Gupta", time: "10:20 AM", date: "2024-01-18", type: "Consultation", status: "Upcoming", notes: "High cholesterol evaluation" },
  { id: 18, doctorId: 18, patient: "Shruti Menon", time: "11:40 AM", date: "2024-01-18", type: "Video Call", status: "Upcoming", notes: "Diet counseling" },
  { id: 19, doctorId: 19, patient: "Abhishek Kumar", time: "01:10 PM", date: "2024-01-18", type: "Emergency", status: "Critical", notes: "Accidental injury" },
  { id: 20, doctorId: 20, patient: "Natasha Verma", time: "03:20 PM", date: "2024-01-18", type: "Check-up", status: "Confirmed", notes: "Routine heart check-up" },

  // Additional appointments to ensure all doctors have at least 1
  { id: 21, doctorId: 1, patient: "Aman Sharma", time: "04:00 PM", date: "2024-01-19", type: "Consultation", status: "Upcoming", notes: "Blood pressure follow-up" },
  { id: 22, doctorId: 6, patient: "Meera Patel", time: "09:30 AM", date: "2024-01-19", type: "Check-up", status: "Confirmed", notes: "Cholesterol review" },
  { id: 23, doctorId: 11, patient: "Kavya Reddy", time: "11:00 AM", date: "2024-01-19", type: "Video Call", status: "Upcoming", notes: "Skin consultation" },
  { id: 24, doctorId: 16, patient: "Arjun Singh", time: "01:00 PM", date: "2024-01-19", type: "Consultation", status: "Upcoming", notes: "Routine check-up" }
];



export const doctorPatients: DoctorPatient[] = [
  { id: 1, name: "Aarav Patel", age: 42, gender: "Male", phone: "+91 98234 11001", email: "aarav.patel@example.com", lastVisit: "2024-01-10", condition: "Hypertension", status: "Active" },
  { id: 2, name: "Riya Sharma", age: 30, gender: "Female", phone: "+91 98234 11002", email: "riya.sharma@example.com", lastVisit: "2024-01-08", condition: "Diabetes Type 2", status: "Active" },
  { id: 3, name: "Kunal Mehta", age: 55, gender: "Male", phone: "+91 98234 11003", email: "kunal.mehta@example.com", lastVisit: "2024-01-05", condition: "Post-surgery recovery", status: "Follow-up" },
  { id: 4, name: "Isha Verma", age: 26, gender: "Female", phone: "+91 98234 11004", email: "isha.verma@example.com", lastVisit: "2024-01-03", condition: "Anxiety disorder", status: "Active" },
  { id: 5, name: "Rajesh Kumar", age: 60, gender: "Male", phone: "+91 98234 11005", email: "rajesh.kumar@example.com", lastVisit: "2023-12-28", condition: "Cardiac monitoring", status: "Critical" },

  { id: 6, name: "Neha Desai", age: 34, gender: "Female", phone: "+91 98234 11006", email: "neha.desai@example.com", lastVisit: "2024-01-11", condition: "Thyroid imbalance", status: "Active" },
  { id: 7, name: "Vikas Singh", age: 48, gender: "Male", phone: "+91 98234 11007", email: "vikas.singh@example.com", lastVisit: "2024-01-09", condition: "Chest pain", status: "Critical" },
  { id: 8, name: "Ananya Joshi", age: 29, gender: "Female", phone: "+91 98234 11008", email: "ananya.joshi@example.com", lastVisit: "2024-01-04", condition: "Routine check", status: "Recovered" },
  { id: 9, name: "Manish Patel", age: 39, gender: "Male", phone: "+91 98234 11009", email: "manish.patel@example.com", lastVisit: "2024-01-06", condition: "Migraine", status: "Active" },
  { id: 10, name: "Kritika Shah", age: 24, gender: "Female", phone: "+91 98234 11010", email: "kritika.shah@example.com", lastVisit: "2023-12-30", condition: "Anxiety", status: "Follow-up" },

  { id: 11, name: "Harshil Soni", age: 22, gender: "Male", phone: "+91 98234 11011", email: "harshil.soni@example.com", lastVisit: "2024-01-14", condition: "Viral fever", status: "Recovered" },
  { id: 12, name: "Priya Nair", age: 33, gender: "Female", phone: "+91 98234 11012", email: "priya.nair@example.com", lastVisit: "2024-01-05", condition: "Skin allergy", status: "Active" },
  { id: 13, name: "Dhruv Rana", age: 45, gender: "Male", phone: "+91 98234 11013", email: "dhruv.rana@example.com", lastVisit: "2023-12-27", condition: "Back pain", status: "Active" },
  { id: 14, name: "Aditi Thakkar", age: 28, gender: "Female", phone: "+91 98234 11014", email: "aditi.thakkar@example.com", lastVisit: "2024-01-02", condition: "General checkup", status: "Active" },
  { id: 15, name: "Yuvraj Singh", age: 36, gender: "Male", phone: "+91 98234 11015", email: "yuvraj.singh@example.com", lastVisit: "2024-01-07", condition: "Muscle injury", status: "Follow-up" },

  { id: 16, name: "Sneha Jain", age: 27, gender: "Female", phone: "+91 98234 11016", email: "sneha.jain@example.com", lastVisit: "2024-01-12", condition: "Pregnancy consultation", status: "Active" },
  { id: 17, name: "Rohan Gupta", age: 50, gender: "Male", phone: "+91 98234 11017", email: "rohan.gupta@example.com", lastVisit: "2023-12-29", condition: "High cholesterol", status: "Active" },
  { id: 18, name: "Shruti Menon", age: 31, gender: "Female", phone: "+91 98234 11018", email: "shruti.menon@example.com", lastVisit: "2024-01-09", condition: "Obesity", status: "Active" },
  { id: 19, name: "Abhishek Kumar", age: 41, gender: "Male", phone: "+91 98234 11019", email: "abhishek.kumar@example.com", lastVisit: "2024-01-13", condition: "Accidental injury", status: "Critical" },
  { id: 20, name: "Natasha Verma", age: 37, gender: "Female", phone: "+91 98234 11020", email: "natasha.verma@example.com", lastVisit: "2024-01-11", condition: "Heart check-up", status: "Active" },

  { id: 21, name: "Krish Patel", age: 19, gender: "Male", phone: "+91 98234 11021", email: "krish.patel@example.com", lastVisit: "2024-01-12", condition: "Seasonal flu", status: "Recovered" },
  { id: 22, name: "Mansi Shah", age: 25, gender: "Female", phone: "+91 98234 11022", email: "mansi.shah@example.com", lastVisit: "2024-01-07", condition: "PCOS", status: "Active" },
  { id: 23, name: "Om Thakkar", age: 52, gender: "Male", phone: "+91 98234 11023", email: "om.thakkar@example.com", lastVisit: "2024-01-05", condition: "Arthritis", status: "Active" },
  { id: 24, name: "Jhanvi Patel", age: 21, gender: "Female", phone: "+91 98234 11024", email: "jhanvi.patel@example.com", lastVisit: "2023-12-31", condition: "Anemia", status: "Follow-up" },
  { id: 25, name: "Viraj Shukla", age: 47, gender: "Male", phone: "+91 98234 11025", email: "viraj.shukla@example.com", lastVisit: "2024-01-01", condition: "Diabetes Type 1", status: "Active" },

  { id: 26, name: "Pooja Chopra", age: 32, gender: "Female", phone: "+91 98234 11026", email: "pooja.chopra@example.com", lastVisit: "2024-01-08", condition: "Thyroid", status: "Active" },
  { id: 27, name: "Karan Bhatt", age: 40, gender: "Male", phone: "+91 98234 11027", email: "karan.bhatt@example.com", lastVisit: "2024-01-10", condition: "Blood pressure", status: "Active" },
  { id: 28, name: "Meera Iyer", age: 35, gender: "Female", phone: "+91 98234 11028", email: "meera.iyer@example.com", lastVisit: "2024-01-06", condition: "Chronic headache", status: "Active" },
  { id: 29, name: "Tejas Kothari", age: 38, gender: "Male", phone: "+91 98234 11029", email: "tejas.kothari@example.com", lastVisit: "2024-01-03", condition: "Kidney stones", status: "Follow-up" },
  { id: 30, name: "Riddhi Desai", age: 27, gender: "Female", phone: "+91 98234 11030", email: "riddhi.desai@example.com", lastVisit: "2024-01-05", condition: "Vitamin deficiency", status: "Active" },

  { id: 31, name: "Nisarg Patel", age: 23, gender: "Male", phone: "+91 98234 11031", email: "nisarg.patel@example.com", lastVisit: "2024-01-09", condition: "Stomach infection", status: "Recovered" },
  { id: 32, name: "Shreya Shah", age: 29, gender: "Female", phone: "+91 98234 11032", email: "shreya.shah@example.com", lastVisit: "2024-01-04", condition: "Migraine", status: "Active" },
  { id: 33, name: "Arnav Suri", age: 46, gender: "Male", phone: "+91 98234 11033", email: "arnav.suri@example.com", lastVisit: "2023-12-29", condition: "Hypertension", status: "Active" },
  { id: 34, name: "Sanya Kapoor", age: 24, gender: "Female", phone: "+91 98234 11034", email: "sanya.kapoor@example.com", lastVisit: "2024-01-02", condition: "Allergy", status: "Follow-up" },
  { id: 35, name: "Aditya Rana", age: 56, gender: "Male", phone: "+91 98234 11035", email: "aditya.rana@example.com", lastVisit: "2023-12-30", condition: "Heart disease", status: "Critical" },

  { id: 36, name: "Vidhi Patel", age: 22, gender: "Female", phone: "+91 98234 11036", email: "vidhi.patel@example.com", lastVisit: "2024-01-11", condition: "Flu", status: "Recovered" },
  { id: 37, name: "Harshit Shah", age: 33, gender: "Male", phone: "+91 98234 11037", email: "harshit.shah@example.com", lastVisit: "2024-01-10", condition: "Diabetes", status: "Active" },
  { id: 38, name: "Nikita Rathod", age: 41, gender: "Female", phone: "+91 98234 11038", email: "nikita.rathod@example.com", lastVisit: "2024-01-06", condition: "Blood pressure", status: "Active" },
  { id: 39, name: "Tushar Goel", age: 38, gender: "Male", phone: "+91 98234 11039", email: "tushar.goel@example.com", lastVisit: "2024-01-05", condition: "Cholesterol", status: "Active" },
  { id: 40, name: "Ayesha Khan", age: 28, gender: "Female", phone: "+91 98234 11040", email: "ayesha.khan@example.com", lastVisit: "2024-01-08", condition: "Skin rash", status: "Active" }
];
