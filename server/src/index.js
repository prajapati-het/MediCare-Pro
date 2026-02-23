import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { config } from "dotenv";
import { UserAuthRouter } from "./routes/UserAuthRouter.js";
import { dbConnect } from "../lib/dbConnect.js";
import mongoose from "mongoose";
config();
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use("/user", UserAuthRouter);
await dbConnect();
console.log("MongoDB connected:", mongoose.connection.readyState);
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});
