import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorType, AdminType } from "@/types/type";

/* ------------------ TYPES ------------------ */

export type AuthUserPayload = {
  user: DoctorType | AdminType;
};

/* ------------------ STATE ------------------ */

interface AppState {
  doctorUser: DoctorType | null;
  adminUser: AdminType | null;
  loginMethod: "email" | "google" | null;
  isLoggedIn: boolean;
}

/* ------------------ INITIAL STATE ------------------ */

const initialState: AppState = {
  doctorUser: null,
  adminUser: null,
  loginMethod: null,
  isLoggedIn: false,
};

/* ------------------ SLICE ------------------ */

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    appendUser: (state, action: PayloadAction<AuthUserPayload>) => {
      const { user } = action.payload;

      if (user.role === "doctor") {
        state.doctorUser = user;
      } else if (user.role === "admin") {
        state.adminUser = user;
      }

      state.isLoggedIn = true;
    },

    updateLoginMethod: (
      state,
      action: PayloadAction<"email" | "google" | null>
    ) => {
      state.loginMethod = action.payload;
    },

    logout: state => {
      state.doctorUser = null;
      state.adminUser = null;
      state.isLoggedIn = false;
      state.loginMethod = null;
    },

    updateDoctorStatus: (state, action: PayloadAction<"active" | "on-leave" | "busy">) => {
      if (state.doctorUser) {
        state.doctorUser.status = action.payload;
      }
    },
  },
});

/* ------------------ EXPORTS ------------------ */

export const {
  appendUser,
  updateLoginMethod,
  logout,
  updateDoctorStatus,
} = appSlice.actions;

export default appSlice.reducer;
