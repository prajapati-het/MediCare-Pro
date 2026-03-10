export interface DoctorType {
    id: number;
    doctorCode:number;
    username: string;
    email: string;
    picture?: string;
    hospital: string;
    role: 'doctor';
    status: string;
    speciality: string;
    phone: string;
    experience: string;
    consultationFee: number;
    education: string;
    licenseNumber: string;
    availableDays: string[];
    nextAvailable: string;
    rating: string;
}

export interface AddDoctorRequest {
  username: string;
  email: string;
  hospital: string;
  speciality: string;
  phone: string;
  experience: string;
  consultationFee: number;
  education: string;
  licenseNumber: string;
  availableDays: string[];
}

export interface AddDoctorResponse {
  message: string;
  doctor: DoctorType;
}

export interface AdminType {
    id: number;
    username: string;
    email: string;
    picture?: string;
    hospital: string;
    role: 'admin';
    status: string;
    phone: string;
    experience: string;
    education: string;
    licenseNumber: string;
    availableDays: string[];
    rating: string;
}

export interface StaffType {
    id: number;
    username: string;
    hospital: string;
}


export interface AddStaffRequest {
  _id: string;
  id: number;
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  hospital: string;
  shift: string;
  status: "on-duty" | "off-duty" | "on-leave";
  joinDate: string;
  employeeId: string;
  salary: number;
  emergencyContact: string;
}

export interface googleSignInResponseType {
  token: string;
  user: DoctorType | AdminType;
}

export type LoginResponse = {
  token?: string;
  user: DoctorType | AdminType;
};

export interface loginCredentialsType {
  email: string;
  password: string;
}

export interface signupCredentialsType {
  username: string;
  email: string;
  password: string;
}

export interface Facility {
  id: number;
  hospitalId: string;
  name: string;
  type: 'Ward' | 'Department' | 'Lab' | 'Surgical' | 'Emergency' | 'Support';
  totalBeds: number;
  occupied: number;
  equipment: number;
  status: 'Operational' | 'Maintenance' | 'Closed';
  floor: string;
  headOfDepartment: string;
  contact: string;
  description: string;
  lastMaintenance: string;
  nextMaintenance: string;
}


export interface Patient {
  doctorCode: string;
  id: number;
  doctorId: number;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  lastVisit: string;
  nextAppointment: string;
  condition: string;
  diagnosis: string;
  status: 'Active' | 'Critical' | 'Follow-up' | 'Recovered';
  tag: 'critical' | 'follow-up' | 'normal' | 'new' | 'chronic';
  allergies: string[];
  medications: string[];
  medicalHistory: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
    bmi: string;
    oxygenSaturation: string;
    respiratoryRate: string;
  };
  bodyCharacteristics: {
    skinType: string;
    eyeColor: string;
    hairColor: string;
    bodyType: string;
  };
  lifestyle: {
    smokingStatus: string;
    alcoholConsumption: string;
    exerciseFrequency: string;
    dietType: string;
    sleepHours: string;
  };
  labResults: {
    testName: string;
    value: string;
    normalRange: string;
    date: string;
    status: 'Normal' | 'Abnormal' | 'Critical';
  }[];
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    prescribedBy: string;
  }[];
  visitHistory: {
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
  }[];
  notes: string;
}



export interface Hospital {
  hospitalId: string; // "city-general", "metro-health"
  name: string;
  code: string;       // short code like CGH, MHH
  type: "General" | "Specialty" | "Clinic" | "Teaching";
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  contact: {
    phone: string;
    email: string;
    emergency: string;
  };
  departments: string[];
  totalBeds: number;
  status: "Operational" | "Maintenance" | "Closed";
  establishedYear: number;
}

export interface Appointment {
  id: number;
  doctorCode: number;
  patientId: number;
  patientName: string;
  time: string;
  date: string;
  type?: string;
  status: string;
  notes?: string;
  duration: number;
  room?: string;
  cancelReason?: string;
}


export interface AppointmentWithPatientInfo extends Appointment {
  patientName: string;
  condition: string;
  age: number | string;     
  height: string;             
  weight: string;           
  contact: string;         
  email: string;           
  tag: string;               
}


export interface FacilityResponseType {
  _id: string;
  id: number;
  hospitalId: string;
  name: string;
  type: "Ward" | "Department" | "Lab" | "Surgical" | "Emergency" | "Support";
  totalBeds: number;
  occupied: number;
  equipment: number;
  status: "Operational" | "Maintenance" | "Closed";
  floor: string;
  headOfDepartment: string;
  contact: string;
  description: string;
  lastMaintenance: string;
  nextMaintenance: string;
  createdAt: string;
  updatedAt: string;
}


export interface ProblemType {
  id: number;
  hospitalId: string;
  title: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  reportedAt: string;
  assignedTo: string;
  resolvedAt: string | null;
  description: string;
  resolution: string | null;
  category:
    | "Equipment"
    | "Staffing"
    | "Supply"
    | "Infrastructure"
    | "Patient Care"
    | "Other";
}


export interface AddProblemPayload {
  hospitalId: string;
  title: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  assignedTo: string;
  description: string;
  category: "Equipment" | "Staffing" | "Supply" | "Infrastructure" | "Patient Care" | "Other";
}


export interface UpdateDoctorRequest {
  DoctorCode: string;
  data: Partial<
    Pick<
      DoctorType,
      | 'username'
      | 'email'
      | 'phone'
      | 'hospital'
      | 'speciality'
      | 'experience'
      | 'consultationFee'
      | 'education'
      | 'licenseNumber'
      | 'availableDays'
      | 'nextAvailable'
    >
  >;
}


// Add these to your @/types/type.ts

export interface WeeklyStat {
  name: string;           // 'Mon', 'Tue', etc.
  patients: number;
  appointments: number;
  admissions: number;
}

export interface StatusStat {
  name: string;
  value: number;
}

export interface DoctorStatusStat {
  status: string;
  count: number;
}

export interface UpcomingAppointmentStat {
  patient: string;
  time: string;
  date: string;
  type: string;
  status: string;
  room?: string;
}

// Doctor dashboard stats (from /doctor-stats/:doctorId)
export interface DoctorStatsResponse {
  doctorId: string;
  doctorCode: number;
  totalPatients: number;
  todayAppointments: number;
  weeklyStats: WeeklyStat[];
  statusStats: StatusStat[];
  upcomingAppointments: UpcomingAppointmentStat[];
}

// Admin dashboard stats (from /admin/:hospitalId/stats)
export interface AdminStatsResponse {
  hospitalId: string;
  hospitalName: string;

  // ── Totals ─────────────────────────────
  totalDoctors: number;
  totalStaff: number;
  totalPatients: number;
  staffOnDuty: number;
  occupiedBeds?: number;        // New: total beds currently occupied
  criticalPatients?: number;    // New: patients in critical condition

  // ── Appointments ───────────────────────
  todayAppointments: number;
  upcomingAppointments: UpcomingAppointmentStat[];

  // ── Weekly Stats ───────────────────────
  weeklyStats: WeeklyStat[];   // e.g., patients, appointments, staff, beds per day

  // ── Status Breakdown ───────────────────
  statusStats: StatusStat[];           // Patient status percentages
  doctorStatusStats: DoctorStatusStat[]; // Doctor availability / status breakdown

  // ── Department / Doctor Breakdown ─────
  departmentStats?: DepartmentStat[];   // Optional: per-department stats
}

// ── Supporting types ─────────────────────
export interface WeeklyStat {
  name: string;          // e.g., 'Mon', 'Tue', etc.
  patients: number;
  appointments: number;
  staffOnDuty?: number;      // Optional
  occupiedBeds?: number;     // Optional
}

export interface StatusStat {
  name: string;       // e.g., 'admitted', 'discharged'
  value: number;
}

export interface DoctorStatusStat {
  status: string;     // e.g., 'active', 'on-duty', 'off-duty'
  count: number;
}

export interface UpcomingAppointmentStat {
  patient: string;
  doctor: string;
  department: string;
  date: string;
  time: string;
  type: string;
  room?: string;
}

export interface DepartmentStat {
  department: string;
  doctors: number;
  patients: number;
  appointmentsToday: number;
  occupiedBeds: number;
}


// Appointments data mapped to specific doctors
export type AppointmentStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "Delayed"
  | "Rescheduled"
  | "No Show";




export type BadgeVariant = 'default' | 'destructive' | 'secondary' | 'outline';