import { Schema, Types, model } from "mongoose";

interface IUserSchema {
  id: Types.ObjectId; 
  username: string;
  email: string;
  role: string;
  picture?: string;
  provider: "google" | "github";
  providerId: string;
  password: string;
}

const UserSchema = new Schema<IUserSchema>(
  
  {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index:true
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
      index:true
    },
    role:{
      type: String,
      required: true
    },
    picture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg",
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
  },
  { timestamps: true }
);

export const User = model<IUserSchema>("User", UserSchema);
