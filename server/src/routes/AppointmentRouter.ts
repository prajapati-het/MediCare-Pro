import express from "express";
import { getTodayAppointments, getMonthlyAppointments, getAllAppointments, getAppointmentsWithPatientInfo, addAppointment, updateAppointmentStatus, updateAppointment } from "../controllers/AppointmentController.js";

export const AppointmentRouter = express.Router();

AppointmentRouter.get("/doctor/:doctorCode/day/:date", getTodayAppointments);
AppointmentRouter.get("/doctor/:doctorCode/month/:yearMonth", getMonthlyAppointments);
AppointmentRouter.get("/doctor/:doctorCode/with-patients", getAppointmentsWithPatientInfo);
AppointmentRouter.get("/", getAllAppointments);
AppointmentRouter.post("/", addAppointment);
AppointmentRouter.patch("/:id/status", updateAppointmentStatus);
AppointmentRouter.put("/:id", updateAppointment);