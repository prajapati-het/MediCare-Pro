import { Request, Response } from "express";
import { Facility } from "../models/Facility.js";

export const getFacilitiesByHospital = async (
  req: Request,
  res: Response
) => {
  try {
    const { hospitalId } = req.query;

    if (!hospitalId) {
      return res.status(400).json({
        success: false,
        message: "hospitalId is required",
      });
    }

    const facilities = await Facility.find({ hospitalId })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: facilities,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};



export const addFacility = async (req: Request, res: Response) => {
    console.log("Enetred in Facility")
  try {
    const {
      hospitalId,
      name,
      type,
      totalBeds,
      occupied,
      equipment,
      status,
      floor,
      headOfDepartment,
      contact,
      description,
      lastMaintenance,
      nextMaintenance,
    } = req.body;

    console.log(req.body)

    // Generate incremental numeric id
    const lastFacility = await Facility.findOne().sort({ id: -1 });
    const newId = lastFacility ? lastFacility.id + 1 : 1;

    const facility = await Facility.create({
      id: newId,
      hospitalId,
      name,
      type,
      totalBeds,
      occupied,
      equipment,
      status,
      floor,
      headOfDepartment,
      contact,
      description,
      lastMaintenance,
      nextMaintenance,
    });

    console.log("Saved facility:", facility);

    res.status(201).json({
      success: true,
      message: "Facility created successfully",
      data: facility,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};