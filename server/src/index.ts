import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";

import { UserAuthRouter } from "./routes/UserAuthRouter.js";
import { dbConnect } from "../lib/dbConnect.js";
import mongoose from "mongoose";
import { DoctorRouter } from "./routes/DoctorRouter.js";
import { AppointmentRouter } from "./routes/AppointmentRouter.js";
import { PatientRouter } from "./routes/PatientRouter.js";
import { AdminRouter } from "./routes/AdminRouter.js";
import { HospitalRouter } from "./routes/HospitalRouter.js";

config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));


app.use((req, res, next) => {
  console.log("Incoming request:", req.method, req.url);
  next();
});

app.use("/user", UserAuthRouter);
app.use("/doctor", DoctorRouter);
app.use("/appointments", AppointmentRouter);
app.use("/patients", PatientRouter);
app.use("/admin", AdminRouter);
app.use("/hospitals", HospitalRouter);



await dbConnect();
console.log("MongoDB connected:", mongoose.connection.readyState);

app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});