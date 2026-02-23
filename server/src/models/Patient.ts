import { Schema, model, Types } from "mongoose";

export interface IPatient {
  id: number;
  doctorCode?: number;
  doctorId?: Types.ObjectId | null;
  name: string;
  age: number;
  gender: string;
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  lastVisit: string;
  nextAppointment: string;
  condition: string;
  diagnosis: string;
  status: "Active" | "Critical" | "Follow-up" | "Recovered";
  tag: "critical" | "follow-up" | "normal" | "new" | "chronic";
  allergies: string[];
  medications: string[];
  medicalHistory: string[];
  insuranceProvider: string;
  insuranceNumber: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  vitals: {
    bloodPressure: string;
    heartRate: string;
    temperature: string;
    weight: string;
    height: string;
    bmi: string;
    oxygenSaturation: string;
    respiratoryRate: string;
  };
  bodyCharacteristics: {
    skinType: string;
    eyeColor: string;
    hairColor: string;
    bodyType: string;
  };
  lifestyle: {
    smokingStatus: string;
    alcoholConsumption: string;
    exerciseFrequency: string;
    dietType: string;
    sleepHours: string;
  };
  labResults: {
    testName: string;
    value: string;
    normalRange: string;
    date: string;
    status: "Normal" | "Abnormal" | "Critical";
  }[];
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate: string;
    prescribedBy: string;
  }[];
  visitHistory: {
    date: string;
    reason: string;
    diagnosis: string;
    treatment: string;
  }[];
  notes: string;
}

const PatientSchema = new Schema<IPatient>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    doctorCode: {
      type: Number,
      required: true,
      index: true
    },

    doctorId: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: false,   // ✅ MUST be false
      default: null,
      index: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 0,
    },
    gender: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
    },
    bloodGroup: {
      type: String,
      required: true,
    },
    lastVisit: String,
    nextAppointment: String,
    condition: {
      type: String,
      required: true,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "Critical", "Follow-up", "Recovered"],
      default: "Active",
    },
    tag: {
      type: String,
      enum: ["critical", "follow-up", "normal", "new", "chronic"],
      default: "new",
    },
    allergies: {
      type: [String],
      default: [],
    },
    medications: {
      type: [String],
      default: [],
    },
    medicalHistory: {
      type: [String],
      default: [],
    },
    insuranceProvider: {
      type: String,
      default: "",
    },
    insuranceNumber: {
      type: String,
      default: "",
    },
    emergencyContact: {
      name: { type: String, required: true },
      relation: { type: String, required: true },
      phone: { type: String, required: true },
    },
    vitals: {
      bloodPressure: String,
      heartRate: String,
      temperature: String,
      weight: String,
      height: String,
      bmi: String,
      oxygenSaturation: String,
      respiratoryRate: String,
    },
    bodyCharacteristics: {
      skinType: String,
      eyeColor: String,
      hairColor: String,
      bodyType: String,
    },
    lifestyle: {
      smokingStatus: String,
      alcoholConsumption: String,
      exerciseFrequency: String,
      dietType: String,
      sleepHours: String,
    },
    labResults: [
      {
        testName: String,
        value: String,
        normalRange: String,
        date: String,
        status: {
          type: String,
          enum: ["Normal", "Abnormal", "Critical"],
        },
      },
    ],
    prescriptions: [
      {
        medication: String,
        dosage: String,
        frequency: String,
        startDate: String,
        endDate: String,
        prescribedBy: String,
      },
    ],
    visitHistory: [
      {
        date: String,
        reason: String,
        diagnosis: String,
        treatment: String,
      },
    ],
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Patient = model<IPatient>("Patient", PatientSchema);
