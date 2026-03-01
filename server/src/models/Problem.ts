import { Schema, model } from "mongoose";

export interface IProblem {
  id: number;
  hospitalId: string;
  title: string;
  department: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  reportedBy: string;
  reportedAt: Date;
  assignedTo: string;
  resolvedAt: Date | null;
  description: string;
  resolution: string | null;
  category:
    | "Equipment"
    | "Staffing"
    | "Supply"
    | "Infrastructure"
    | "Patient Care"
    | "Other";
}

const ProblemSchema = new Schema<IProblem>(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },

    hospitalId: {
      type: String,
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    department: {
      type: String,
      required: true,
    },

    priority: {
      type: String,
      enum: ["Critical", "High", "Medium", "Low"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    reportedBy: {
      type: String,
      required: true,
    },

    reportedAt: {
      type: Date,
      default: Date.now,
    },

    assignedTo: {
      type: String,
      required: true,
    },

    resolvedAt: {
      type: Date,
      default: null,
    },

    description: {
      type: String,
      required: true,
    },

    resolution: {
      type: String,
      default: null,
    },

    category: {
      type: String,
      enum: [
        "Equipment",
        "Staffing",
        "Supply",
        "Infrastructure",
        "Patient Care",
        "Other",
      ],
      required: true,
    },
  },
  { timestamps: true }
);

export const Problem = model<IProblem>("Problem", ProblemSchema);