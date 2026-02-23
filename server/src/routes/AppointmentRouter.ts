import express from "express";
import { getTodayAppointments, getMonthlyAppointments, getAllAppointments, getAppointmentsWithPatientInfo } from "../controllers/AppointmentController.js";

export const AppointmentRouter = express.Router();

AppointmentRouter.get("/doctor/:doctorCode/day/:date", getTodayAppointments);
AppointmentRouter.get(  "/doctor/:doctorCode/month/:yearMonth",getMonthlyAppointments);
AppointmentRouter.get("/doctor/:doctorCode/with-patients", getAppointmentsWithPatientInfo);
AppointmentRouter.get("/", getAllAppointments);