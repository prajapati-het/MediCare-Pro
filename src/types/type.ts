export interface DoctorType {
    id: number;
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

export interface Appointment {
  id: number;
  doctorCode: number;
  patientId: number;
  patientName: string;
  time: string;
  date: string;
  type: string;
  status: string;
  notes?: string;
  duration: number;
  room: string;
  cancelReason?: string;
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