import { Schema, model } from "mongoose";
const StaffSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    staffCode: {
        type: Number,
        required: true,
        unique: true,
    },
    hospitalId: {
        type: String,
        required: true,
        index: true,
    },
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Nurse", "Receptionist", "Technician", "Support"],
        required: true,
    },
    department: String,
    phone: String,
    shift: {
        type: String,
        enum: ["Morning", "Evening", "Night"],
        default: "Morning",
    },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active",
    },
}, { timestamps: true });
export const Staff = model("Staff", StaffSchema);
