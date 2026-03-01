import { Request, Response } from "express";
import { Admin } from "../models/Admin.js";
import mongoose from "mongoose";


export const getAdminDetails = async (req: Request, res: Response) => {
  try {
    const rawId = req.params.adminId;
    const adminId = Array.isArray(rawId) ? rawId[0] : rawId;
    if (adminId === undefined || adminId === null || adminId === "") {
      return res.status(400).json({ message: "doctorId is required" });
    }

    const idStr = String(adminId).trim();

    const admin = await Admin.findOne({ id: new mongoose.Types.ObjectId(adminId) });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};
