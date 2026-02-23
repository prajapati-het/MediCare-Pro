import { Schema, model, Types } from "mongoose";

export interface IAdmin {
  userId: Types.ObjectId;        // login identity
  hospitalId: string;            // hospital they manage
  role: "Super Admin" | "Hospital Admin";
  permissions: string[];
  active: boolean;
}

const AdminSchema = new Schema<IAdmin>(
  {
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
  },
  { timestamps: true }
);

export const Admin = model<IAdmin>("Admin", AdminSchema);
