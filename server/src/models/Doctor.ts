import mongoose, { Schema, model, Types } from "mongoose";

export interface IDoctor {
  id: Types.ObjectId;        // reference to User (login/profile)
  username: string;
  doctorCode: number;
  email: string;
  picture?: string;
  hospital: string;
  role: 'doctor';
  status: 'Active' | 'On Leave' | 'Inactive';
  speciality: string;
  phone: string;
  experience: string;
  consultationFee: number;
  education: string;
  licenseNumber: string;
  availableDays: string[];
  nextAvailable: string;
  rating: string;
}

const DoctorSchema = new Schema<IDoctor>(
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true
    },
    username: {
      type: String,
      required: true,
      trim: true
    },
    doctorCode: {
      type: Number,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      trim: true
    },
    picture: {
      type: String
    },
    hospital: {
      type: String,
      required: true,
      index: true
    },
    role: {
      type: String,
      enum: ['doctor'],
      default: 'doctor'
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Inactive"],
      default: "Active"
    },
    speciality: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    experience: {
      type: String,
      required: true
    },
    consultationFee: {
      type: Number,
      required: true
    },
    education: {
      type: String,
      required: true
    },
    licenseNumber: {
      type: String,
      required: true,
      unique: true
    },
    availableDays: {
      type: [String],
      required: true
    },
    nextAvailable: {
      type: String,
      required: true
    },
    rating: {
      type: String,
      default: "0"
    }
  },
  { timestamps: true }
);

export const Doctor = mongoose.model<IDoctor>("Doctor", DoctorSchema);