import { Request, Response } from "express";
import { Problem } from "../models/Problem.js";

export const getProblemsByHospital = async (req: Request, res: Response) => {
  try {
    const { hospitalId } = req.query;

    if (!hospitalId) {
      return res.status(400).json({ message: "hospitalId is required" });
    }

    const problems = await Problem.find({ hospitalId })
      .sort({ createdAt: -1 });

    res.status(200).json(problems);
  } catch (error) {
    console.error("Error fetching problems:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const addProblem = async (req: Request, res: Response) => {
  try {
    const lastProblem = await Problem.findOne().sort({ id: -1 });
    const nextId = lastProblem ? lastProblem.id + 1 : 1;

    const problem = await Problem.create({
      ...req.body,
      id: nextId,
      reportedAt: new Date(),
      resolvedAt: null,
      resolution: null,
    });

    res.status(201).json({
      success: true,
      message: "Problem reported successfully",
      data: problem,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to create problem",
    });
  }
};


