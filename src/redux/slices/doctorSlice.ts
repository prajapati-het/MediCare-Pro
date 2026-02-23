import { DoctorType, Patient } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DoctorState {
  info: DoctorType | null;
  patients: Patient[];
}

const initialState: DoctorState = {
  info: null,
  patients: [],
};

export const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    // Set doctor info
    setDoctorInfo: (state, action: PayloadAction<DoctorType>) => {
      state.info = action.payload;
    },

    // Set doctor patients
    setDoctorPatients: (state, action: PayloadAction<Patient[]>) => {
      state.patients = action.payload;

      // Optional: also update localStorage
      localStorage.removeItem("patients");
      localStorage.setItem("patients", JSON.stringify(action.payload));
    },

    // Clear all doctor data (logout or reset)
    clearDoctorData: (state) => {
      state.info = null;
      state.patients = [];
      localStorage.removeItem("patients");
    },

    

  },
});

export const { setDoctorInfo, setDoctorPatients, clearDoctorData } = doctorSlice.actions;

export default doctorSlice.reducer;