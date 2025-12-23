import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Patient {
  id: number;
  doctorId: number;
  name: string;
  age: number;
  gender: string;
  condition: string;
  lastVisit: string;
  status: "Active" | "Recovered";
  tag: "critical" | "follow-up" | "normal" | "new" | "chronic";
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
