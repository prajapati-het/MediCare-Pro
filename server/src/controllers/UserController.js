import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { User } from "../models/User.js";
dotenv.config();
const googleClient = new OAuth2Client(process.env.VITE_CLIENT_ID);
// --------------------------------------------------
// helper → stable providerId for email-password users
// --------------------------------------------------
const emailProviderId = (email) => crypto.createHash("sha256").update(email).digest("hex");
// ==================================================
// 🔐 GOOGLE SIGN-IN
// ==================================================
export const googleSignin = async (req, res) => {
    try {
        const { idToken } = req.body; // 👈 match frontend
        if (!idToken)
            return res.status(400).json({ message: "idToken is required" });
        const ticket = await googleClient.verifyIdToken({
            idToken,
            audience: process.env.VITE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        if (!payload || !payload.email) {
            return res.status(400).json({ message: "Invalid Google token" });
        }
        // continue: find or create user
        let user = await User.findOne({ email: payload.email });
        console.log(user);
        if (!user) {
            user = await User.create({
                username: payload.name,
                email: payload.email,
                picture: payload.picture,
                provider: "google",
                providerId: payload.sub,
            });
        }
        const token = jwt.sign({ userId: user._id }, process.env.VITE_JWT_KEY, {
            expiresIn: "1h",
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({ message: "Google login successful", token, user });
    }
    catch (error) {
        console.error("Google Signin Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// ==================================================
// 🔐 EMAIL + PASSWORD LOGIN
// ==================================================
export const login = async (req, res) => {
    console.log("LOGIN CONTROLLER HIT");
    try {
        const { email } = req.body;
        console.log("Email:", email);
        if (!email) {
            return res.status(400).json({ message: "Email is required" });
        }
        const user = await User.findOne({ email });
        console.log("USER:", user);
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }
        // Skip password verification
        const token = jwt.sign({ id: user.id }, process.env.VITE_JWT_KEY, { expiresIn: "1h" });
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 1000,
        });
        res.status(200).json({
            message: "Login successful",
            user,
        });
    }
    catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// ==================================================
// 👤 GET LOGGED-IN USER
// ==================================================
export const getUserDetails = async (req, res) => {
    const token = req.cookies?.token; // <- cookie-parser fills this
    //console.log("Token from cookie:", token);
    if (!token)
        return res.status(401).json({ message: "No token found" });
    try {
        const decoded = jwt.verify(token, process.env.VITE_JWT_KEY);
        const user = await User.findOne({ id: decoded.id }).select("-password");
        console.log(user);
        res.status(200).json({ user });
    }
    catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
// ==================================================
// 🚪 LOGOUT
// ==================================================
export const logout = async (_req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logged out successfully" });
};
