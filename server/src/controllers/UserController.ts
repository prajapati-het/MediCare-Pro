import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import { User } from "../models/User.js";

dotenv.config();

const googleClient = new OAuth2Client(process.env.VITE_CLIENT_ID!);

const emailProviderId = (email: string) =>
  crypto.createHash("sha256").update(email).digest("hex");

// ==================================================
// 🔐 GOOGLE SIGN-IN
// ==================================================
export const googleSignin = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body; // 👈 match frontend
    if (!idToken) return res.status(400).json({ message: "idToken is required" });

    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.VITE_CLIENT_ID!,
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

    

    const token = jwt.sign({ userId: user._id }, process.env.VITE_JWT_KEY!, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Google login successful", token, user });
  } catch (error) {
    console.error("Google Signin Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ==================================================
// 🔐 EMAIL + PASSWORD LOGIN
// ==================================================
export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.VITE_JWT_KEY!,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,   // dev
      sameSite: "lax",
      maxAge: 60 * 60 * 1000,
    });

    const { password: _, ...safeUser } = user.toObject();

    res.status(200).json({
      message: "Login successful",
      user: safeUser,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// ==================================================
// 👤 GET LOGGED-IN USER
// ==================================================
export const getUserDetails = async (req: Request, res: Response) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token found" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.VITE_JWT_KEY!
    ) as { userId: string };

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("JWT Verification Failed:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

// ==================================================
// 🚪 LOGOUT
// ==================================================
export const logout = async (_req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
};

