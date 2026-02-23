import { Schema, model } from "mongoose";
const UserSchema = new Schema({
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
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true
    },
    role: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
    },
    provider: {
        type: String,
        enum: ["google", "github"],
        required: true,
    },
    providerId: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
}, { timestamps: true });
export const User = model("User", UserSchema);
