import { Schema, model } from "mongoose";

export interface IAppointment {
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

const AppointmentSchema = new Schema<IAppointment>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    doctorCode: {
      type: Number,
      required: true,
    },
    patientId: {
      type: Number,
      required: true,
    },
    patientName: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    type: {
      type: String,
    },
    status: {
      type: String,
      default: "Pending"
    },
    notes: {
      type: String,
      default: "",
    },
    duration: {
      type: Number,
      default: 15
    },
    room: {
      type: String,
    },
    cancelReason: {
      type: String,
    },
  },
  { timestamps: true }
);

export const Appointment = model<IAppointment>(
  "Appointment",
  AppointmentSchema
);
