import { Schema, model } from "mongoose";
const FacilitySchema = new Schema({
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
}, { timestamps: true });
export const Facility = model("Facility", FacilitySchema);
