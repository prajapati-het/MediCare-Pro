import { Schema, model } from "mongoose";
const ProblemSchema = new Schema({
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
    title: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
        trim: true,
    },
    priority: {
        type: String,
        enum: ["Critical", "High", "Medium", "Low"],
        default: "Medium",
    },
    status: {
        type: String,
        enum: ["Open", "In Progress", "Resolved", "Closed"],
        default: "Open",
    },
    reportedBy: {
        type: String,
        required: true,
        trim: true,
    },
    reportedAt: {
        type: String,
        required: true,
    },
    assignedTo: {
        type: String,
        trim: true,
    },
    resolvedAt: {
        type: String,
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
}, { timestamps: true });
export const Problem = model("Problem", ProblemSchema);
