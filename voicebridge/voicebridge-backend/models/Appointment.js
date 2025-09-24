// // backend/models/Appointment.js
// const mongoose = require('mongoose')
// const AppointmentSchema = new mongoose.Schema({
//   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//   userEmail: { type: String },
//   doctorEmail: { type: String, required: true },
//   reason: { type: String, required: true },
//   date: { type: String, required: true }, // store ISO date or string
//   time: { type: String, required: true },
//   notes: { type: String },
//   createdAt: { type: Date, default: Date.now }
// })
// module.exports = mongoose.model('Appointment', AppointmentSchema)

// backend/models/Appointment.js
import mongoose from "mongoose";

const AppointmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  userEmail: { type: String },
  doctorEmail: { type: String, required: true },
  reason: { type: String, required: true },
  date: { type: String, required: true }, // store ISO date or string
  time: { type: String, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Appointment", AppointmentSchema);
