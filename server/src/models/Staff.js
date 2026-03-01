import { Schema, model } from "mongoose";
const StaffSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        trim: true,
    },
    department: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hospital: {
        type: String,
        required: true,
        index: true,
    },
    shift: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["on-duty", "off-duty", "on-leave"],
        default: "on-duty",
    },
    joinDate: {
        type: Date, // better than string
        required: true,
    },
    employeeId: {
        type: String,
        required: true,
        unique: true,
    },
    salary: {
        type: Number,
        required: true,
        min: 0,
    },
    emergencyContact: {
        type: String,
        required: true,
    },
}, { timestamps: true });
export const Staff = model("Staff", StaffSchema);
