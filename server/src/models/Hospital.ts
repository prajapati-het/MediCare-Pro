import { Schema, model } from "mongoose";

export interface IHospital {
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

const HospitalSchema = new Schema<IHospital>(
  {
    hospitalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
    },
    type: {
      type: String,
      enum: ["General", "Specialty", "Clinic", "Teaching"],
      default: "General",
    },
    address: {
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, default: "India" },
      pincode: { type: String, required: true },
    },
    contact: {
      phone: { type: String, required: true },
      email: { type: String, required: true },
      emergency: { type: String, required: true },
    },
    departments: {
      type: [String],
      default: [],
    },
    totalBeds: {
      type: Number,
      min: 0,
      default: 0,
    },
    status: {
      type: String,
      enum: ["Operational", "Maintenance", "Closed"],
      default: "Operational",
    },
    establishedYear: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Hospital = model<IHospital>("Hospital", HospitalSchema);
