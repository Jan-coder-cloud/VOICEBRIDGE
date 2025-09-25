// backend/server.js
/*require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
*/
// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const nodemailer = require("nodemailer");
// const textToSpeech = require("@google-cloud/text-to-speech");
// const gTTS = require("gtts");

// const User = require("./models/User");
// const Appointment = require("./models/Appointment");
// const { default: connectToDataBase } = require("./configs/db.js");

import "dotenv/config"; // loads .env automatically
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
// import textToSpeech from "@google-cloud/text-to-speech";
import gTTS from "gtts";

import User from "./models/User.js";
import Appointment from "./models/Appointment.js";
// import connectToDatabase from "./configs/db.js"; // ES module import

import path from "path";
import { fileURLToPath } from "url";
import connectToDataBase from "./configs/db.js";

const app = express();
// STEP 1: Manual OPTIONS handler (ADD THIS FIRST - before everything else)
app.use((req, res, next) => {
  // Only handle preflight OPTIONS requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS preflight for:", req.path); // Debug log - watch backend console
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173"); // Your frontend origin
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS"); // Allowed methods
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    ); // Allowed headers
    res.setHeader("Access-Control-Allow-Credentials", "true"); // For auth if needed
    res.setHeader("Access-Control-Max-Age", "86400"); // Cache for 24h
    return res.status(204).end(); // Success - no body needed
  }
  next(); // Let non-OPTIONS requests continue
});
// STEP 2: Now add your cors middleware (for the actual POST responses)
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};
app.use(cors(corsOptions));

// app.use(cors({ origin: 'http://localhost:5173' })) // <-- allow your frontend
app.use(express.json());

// Set Google credentials
// if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
//   process.env.GOOGLE_APPLICATION_CREDENTIALS =
//     __dirname + "/google-credentials.json";
// }

//new :
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // Set Google credentials
// if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
//   process.env.GOOGLE_APPLICATION_CREDENTIALS = path.join(
//     __dirname,
//     "google-credentials.json"
//   );
// }
// MongoDB connection
// mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error(err));

// Nodemailer transporter (optional)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Auth middleware
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No auth token" });
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
};
// Signup
app.post("/api/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: "Email already used" });
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hash });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ error: "Missing fields" });
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

app.options("/api/appointment", cors(corsOptions));

// Appointment endpoint (requires auth)
// app.post("/api/appointment", async (req, res) => {
//   const { reason, date, time, message, doctorEmail, userEmail } = req.body;
//   if (!doctorEmail || !date || !time)
//     return res.status(400).json({ error: "Missing required fields" });
//   try {
//     const appointment = new Appointment({
//       user: req.user.id,
//       userEmail: userEmail || "",
//       doctorEmail,
//       reason,
//       date,
//       time,
//       notes: message || "",
//     });
//     await appointment.save();

//     const mailOpts = {
//       from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
//       to: doctorEmail,
//       subject: `New Appointment Request - ${date} ${time}`,
//       text: `Hello,

// You have received a new appointment request.

// Patient: ${userEmail || "Unknown"}
// Reason: ${reason}
// Date: ${date}
// Time: ${time}

// Notes:
// ${message || "None"}

// Please reply to this email or login to the system to respond.

// Thank you.`,
//     };

//     transporter.sendMail(mailOpts, (err, info) => {
//       if (err) {
//         console.error("Mail error", err);
//         return res.status(500).json({ error: "Failed to send email" });
//       }
//       res.json({ ok: true, info });
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

//BLACK:
app.post(
  "/api/appointment",
  /* auth, */ async (req, res) => {
    // Temp: No auth
    console.log("POST /api/appointment hit"); // Debug
    console.log("Body:", req.body); // Check data

    const { reason, date, time, message, doctorEmail, userEmail } = req.body;
    if (!doctorEmail || !date || !time) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    try {
      // Use userEmail since no auth yet
      const appointment = new Appointment({
        user: null, // Temp: Skip ref; or use a dummy if schema requires it
        userEmail: userEmail || "anonymous",
        doctorEmail,
        reason,
        date,
        time,
        notes: message || "",
        status: "pending", // If your schema has this
      });
      await appointment.save();
      console.log("Saved appointment:", appointment._id);

      // Email (assuming transporter is set up)
      const mailOpts = {
        from: process.env.EMAIL_USER,
        to: doctorEmail,
        subject: `New Appointment - ${date} ${time}`,
        text: `Patient: ${userEmail}\nReason: ${reason}\nDate: ${date}\nTime: ${time}\nNotes: ${
          message || "None"
        }`,
      };
      transporter.sendMail(mailOpts, (err, info) => {
        if (err) {
          console.error("Email failed:", err.message);
          return res.status(500).json({ error: "Saved but email failed" });
        }
        console.log("Email sent");
        res.json({ ok: true, message: "Appointment sent!" });
      });
    } catch (err) {
      console.error("Error:", err.message);
      res.status(500).json({ error: err.message });
    }
  }
);
// Google TTS endpoint for Tamil
// original
// app.post("/api/tts-tamil", async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: "Text is required" });

//   const client = new textToSpeech.TextToSpeechClient();
//   const request = {
//     input: { text },
//     voice: { languageCode: "ta-IN", ssmlGender: "FEMALE" },
//     audioConfig: { audioEncoding: "MP3" },
//   };

//   try {
//     const [response] = await client.synthesizeSpeech(request);
//     res.json({ audioContent: response.audioContent.toString("base64") });
//   } catch (err) {
//     console.error("TTS Error:", err);
//     res.status(500).json({ error: "Failed to get Tamil audio." });
//   }
// });

// app.post("/api/tts-tamil", async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: "Text is required" });

//   try {
//     const gtts = new gTTS(text, "ta");
//     res.setHeader("Content-Type", "audio/mpeg");
//     gtts.stream().pipe(res);
//   } catch (err) {
//     console.error("TTS Error:", err);
//     res.status(500).json({ error: "Failed to generate Tamil audio" });
//   }
// });

app.post("/api/tts-tamil", async (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  try {
    const gtts = new gTTS(text, "ta"); // "ta" = Tamil
    res.setHeader("Content-Type", "audio/mpeg");

    // Stream audio back to frontend
    gtts.stream().pipe(res);
  } catch (err) {
    console.error("Tamil TTS error:", err);
    res.status(500).json({ error: "Failed to generate Tamil audio" });
  }
});

//updated code
// app.post("/api/tts-tamil", async (req, res) => {
//   const { text } = req.body;
//   if (!text) return res.status(400).json({ error: "Text is required" });

//   try {
//     const gtts = new gTTS(text, "ta");
//     res.setHeader("Content-Type", "audio/mpeg");
//     gtts.stream().pipe(res);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Failed to generate Tamil audio" });
//   }
// });

// Test
app.get("/", (req, res) => res.send("VoiceBridge Backend running!"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await connectToDataBase();
});
