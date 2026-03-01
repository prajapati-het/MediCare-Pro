import { Schema, model } from "mongoose";

export interface IFacility {
  id: number;
  hospitalId: string;
  name: string;
  type: "Ward" | "Department" | "Lab" | "Surgical" | "Emergency" | "Support";
  totalBeds: number;
  occupied: number;
  equipment: number;
  status: "Operational" | "Maintenance" | "Closed";
  floor: string;
  headOfDepartment: string;
  contact: string;
  description: string;
  lastMaintenance: Date;
  nextMaintenance: Date;
}

const FacilitySchema = new Schema<IFacility>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    hospitalId: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ["Ward", "Department", "Lab", "Surgical", "Emergency", "Support"],
      required: true,
    },
    totalBeds: {
      type: Number,
      required: true,
      min: 0,
    },
    occupied: {
      type: Number,
      required: true,
      min: 0,
    },
    equipment: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["Operational", "Maintenance", "Closed"],
      default: "Operational",
    },
    floor: {
      type: String,
      required: true,
    },
    headOfDepartment: {
      type: String,
      required: true,
      trim: true,
    },
    contact: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    lastMaintenance: {
      type: Date,
      required: true,
    },
    nextMaintenance: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export const Facility = model<IFacility>("Facility", FacilitySchema);
