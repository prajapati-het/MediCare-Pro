import { Request, Response } from "express";
import { Hospital } from "../models/Hospital.js";



export const getHospitalById = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.params;

    const hospital = await Hospital.findOne({ hospitalId }).select("-__v");

    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    res.status(200).json(hospital);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};