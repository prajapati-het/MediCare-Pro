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
      default:0
    },
    gender: {
      type: String,
      default: ""
    },
    phone: {
      type: String,
      trim: true,
      default: ""
    },
    email: {
      type: String,
      trim: true,
      default: ""
    },
    address: {
      type: String,
      default: ""
    },
    bloodGroup: {
      type: String,
      default: ""
    },
    lastVisit: String,
    nextAppointment: String,
    condition: {
      type: String,
      default: ""
    },
    diagnosis: {
      type: String,
      default: ""
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
      type: {
        name: { type: String, default: "" },
        relation: { type: String, default: "" },
        phone: { type: String, default: "" },
      },
      default: () => ({
        name: "",
        relation: "",
        phone: "",
      }),
    },
    vitals: {
      type: {
        bloodPressure: { type: String, default: "" },
        heartRate: { type: String, default: "" },
        temperature: { type: String, default: "" },
        weight: { type: String, default: "" },
        height: { type: String, default: "" },
        bmi: { type: String, default: "" },
        oxygenSaturation: { type: String, default: "" },
        respiratoryRate: { type: String, default: "" },
      },
      default: () => ({
        bloodPressure: "",
        heartRate: "",
        temperature: "",
        weight: "",
        height: "",
        bmi: "",
        oxygenSaturation: "",
        respiratoryRate: "",
      }),
    },

    bodyCharacteristics: {
      type: {
        skinType: { type: String, default: "" },
        eyeColor: { type: String, default: "" },
        hairColor: { type: String, default: "" },
        bodyType: { type: String, default: "" },
      },
      default: () => ({
        skinType: "",
        eyeColor: "",
        hairColor: "",
        bodyType: "",
      }),
    },

    lifestyle: {
      type: {
        smokingStatus: { type: String, default: "" },
        alcoholConsumption: { type: String, default: "" },
        exerciseFrequency: { type: String, default: "" },
        dietType: { type: String, default: "" },
        sleepHours: { type: String, default: "" },
      },
      default: () => ({
        smokingStatus: "",
        alcoholConsumption: "",
        exerciseFrequency: "",
        dietType: "",
        sleepHours: "",
      }),
    },

    labResults: {
      type: [
        {
          testName: { type: String, default: "" },
          value: { type: String, default: "" },
          normalRange: { type: String, default: "" },
          date: { type: String, default: "" },
          status: {
            type: String,
            enum: ["Normal", "Abnormal", "Critical"],
            default: "Normal",
          },
        },
      ],
      default: [],
    },

    prescriptions: {
      type: [
        {
          medication: { type: String, default: "" },
          dosage: { type: String, default: "" },
          frequency: { type: String, default: "" },
          startDate: { type: String, default: "" },
          endDate: { type: String, default: "" },
          prescribedBy: { type: String, default: "" },
        },
      ],
      default: [],
    },

    visitHistory: {
      type: [
        {
          date: { type: String, default: "" },
          reason: { type: String, default: "" },
          diagnosis: { type: String, default: "" },
          treatment: { type: String, default: "" },
        },
      ],
      default: [],
    },
    notes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export const Patient = model<IPatient>("Patient", PatientSchema);
