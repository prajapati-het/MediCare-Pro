import { Schema, model } from "mongoose";

export interface IStaff {
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
  joinDate: Date;
  employeeId: string;
  salary: number;
  emergencyContact: string;
}

const StaffSchema = new Schema<IStaff>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    firstName: {
      type: String,
      required: true,
      trim: true,
    },

    lastName: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    hospital: {
      type: String,
      required: true,
      index: true,
    },

    shift: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["on-duty", "off-duty", "on-leave"],
      default: "on-duty",
    },

    joinDate: {
      type: Date, // better than string
      required: true,
    },

    employeeId: {
      type: String,
      required: true,
      unique: true,
    },

    salary: {
      type: Number,
      required: true,
      min: 0,
    },

    emergencyContact: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Staff = model<IStaff>("Staff", StaffSchema);