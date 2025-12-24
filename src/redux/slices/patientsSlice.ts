import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
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

interface PatientsState {
  list: Patient[];
}

const initialState: PatientsState = {
  list: [],
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatients(state, action: PayloadAction<Patient[]>) {
      state.list = action.payload;
    },
    updatePatient(
      state,
      action: PayloadAction<{ id: number; changes: Partial<Patient> }>
    ) {
      const idx = state.list.findIndex(p => p.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = {
          ...state.list[idx],
          ...action.payload.changes,
        };
      }
    },
  },
});

export const { setPatients, updatePatient } = patientsSlice.actions;
export default patientsSlice.reducer;
