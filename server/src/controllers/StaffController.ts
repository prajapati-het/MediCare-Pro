import { Request, Response } from "express";
import { Staff } from "../models/Staff.js";

export const getAllStaff = async (req: Request, res: Response) => {
  try {
    const { hospital } = req.query;

    if (!hospital) {
      return res.status(400).json({
        message: "Hospital name is required",
      });
    }

    const staff = await Staff.find({ hospital })
      .sort({ createdAt: -1 });

    res.status(200).json(staff);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch staff",
    });
  }
};

export const createStaff = async (req: Request, res: Response) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      role,
      department,
      hospital,
      shift,
      employeeId,
      joiningDate,
      salary,
      emergencyContact,
    } = req.body;

    const lastStaff = await Staff.findOne().sort({ id: -1 });

    

    const newStaff = await Staff.create({
      id: lastStaff ? lastStaff.id + 1 : 1,
      name: `${firstName} ${lastName}`,
      firstName,
      lastName,
      email,
      phone,
      role,
      department,
      hospital,
      shift,
      employeeId,
      joinDate: new Date(joiningDate),
      salary,
      emergencyContact,
    });

    res.status(201).json(newStaff);
  } catch (error: any) {
        if (error.code === 11000) {
            return res.status(400).json({
            message: "Email or Employee ID already exists",
            });
        }

        res.status(400).json({
            message: error.message || "Failed to create staff",
        });
    }
};

export const deleteStaff = async (req: Request, res: Response) => {
  try {
    await Staff.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: "Delete failed" });
  }
};

export const updateStaff = async (req: Request, res: Response) => {
  try {
    const updated = await Staff.findByIdAndUpdate(
      req.params.id,
      req.body,
      { returnDocument: "after" }
    );

    res.status(200).json(updated);
  } catch (error) {
    res.status(400).json({ message: "Update failed" });
  }
};