import mongoose, { Schema } from "mongoose";
const DoctorSchema = new Schema({
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
}, { timestamps: true });
export const Doctor = mongoose.model("Doctor", DoctorSchema);
