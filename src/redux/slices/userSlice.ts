import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DoctorType, AdminType } from "@/types/type";
import { doctorsData } from "@/data/doctorData";

export type AppUser = DoctorType | AdminType;

interface UserState {
  users: AppUser[];
}

const initialState: UserState = {
  users: doctorsData
};
