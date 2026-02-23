import { Patient } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define initial state
interface PatientsState {
  allPatients: Patient[];
}

const initialState: PatientsState = {
  allPatients: [],
};

const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setPatients: (state, action: PayloadAction<Patient[]>) => {
      state.allPatients = action.payload;
    },
    addPatient: (state, action: PayloadAction<Patient>) => {
      state.allPatients.push(action.payload);
    },
    updatePatient: (state, action: PayloadAction<{ id: number; changes: Partial<Patient> }>) => {
      const index = state.allPatients.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.allPatients[index] = { ...state.allPatients[index], ...action.payload.changes };
      }
    },
    removePatient: (state, action: PayloadAction<number>) => {
      state.allPatients = state.allPatients.filter((p) => p.id !== action.payload);
    },
  },
});

export const { setPatients, addPatient, updatePatient, removePatient } = patientsSlice.actions;

// Selector to get all patients
export const selectAllPatients = (state) => state.patients.allPatients;

// Selector to get patient by numeric ID
export const selectPatientById = (id: number) => (state) =>
  state.patients.allPatients.find((p: Patient) => p.id === id);

export default patientsSlice.reducer;