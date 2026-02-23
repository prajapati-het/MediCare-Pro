import { Schema, model } from "mongoose";
const AdminSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    hospitalId: {
        type: String,
        required: true,
        index: true,
    },
    role: {
        type: String,
        enum: ["Super Admin", "Hospital Admin"],
        default: "Hospital Admin",
    },
    permissions: {
        type: [String],
        default: [],
    },
    active: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
export const Admin = model("Admin", AdminSchema);
