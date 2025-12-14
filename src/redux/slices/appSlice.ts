import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorType, AdminType } from "@/types/type";

interface AppState {
  user: DoctorType | AdminType | null;
  loginMethod: "email" | "google" | null;
  isLoggedIn: boolean;
}

const initialState: AppState = {
  user: null,
  loginMethod: null,
  isLoggedIn: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    updateCurrentUser: (
      state,
      action: PayloadAction<DoctorType | AdminType>
    ) => {
      state.user = action.payload;
    },
    updateIsLoggedIn: (state, action: PayloadAction<boolean>) => {
      state.isLoggedIn = action.payload;
    },
    updateLoginMethod: (
      state,
      action: PayloadAction<"email" | "google" | null>
    ) => {
      state.loginMethod = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.loginMethod = null;
    },
  },
});

export const {
  updateCurrentUser,
  updateIsLoggedIn,
  updateLoginMethod,
  logout,
} = appSlice.actions;

export default appSlice.reducer;
