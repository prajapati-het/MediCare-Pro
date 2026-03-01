import { Schema, model } from "mongoose";
const AdminSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    picture: {
        type: String,
    },
    hospital: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin"],
        default: "admin",
    },
    status: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    experience: {
        type: String,
        required: true,
    },
    education: {
        type: String,
        required: true,
    },
    licenseNumber: {
        type: String,
        required: true,
        unique: true,
    },
    availableDays: {
        type: [String],
        default: [],
    },
    rating: {
        type: String,
        default: "0",
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true });
export const Admin = model("Admin", AdminSchema);
