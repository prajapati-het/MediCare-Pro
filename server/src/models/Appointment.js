import { Schema, model } from "mongoose";
const AppointmentSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    doctorCode: {
        type: Number,
        required: true,
    },
    patientId: {
        type: Number,
        required: true,
    },
    patientName: {
        type: String,
        required: true,
        trim: true,
    },
    time: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
        default: "",
    },
    duration: {
        type: Number,
        required: true,
    },
    room: {
        type: String,
        required: true,
    },
    cancelReason: {
        type: String,
    },
}, { timestamps: true });
export const Appointment = model("Appointment", AppointmentSchema);
