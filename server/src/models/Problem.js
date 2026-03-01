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
}, { timestamps: true });
export const Problem = model("Problem", ProblemSchema);
