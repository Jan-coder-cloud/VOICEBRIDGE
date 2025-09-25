// src/components/Appointment.jsx
import React, { useState, useEffect } from "react";

export default function Appointment() {
  const [reason, setReason] = useState("General check-up");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [doctorEmail, setDoctorEmail] = useState(""); // new
  const [userEmail, setUserEmail] = useState(""); // optional: show user email if available

  useEffect(() => {
    // If you saved user email after login, load it (optional)
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.email) setUserEmail(user.email);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    // basic validation
    if (!doctorEmail) return setStatus("Please enter the doctor's email.");
    if (!date) return setStatus("Please select a date.");
    if (!time) return setStatus("Please select a time.");

    try {
      const token = localStorage.getItem("token"); // optional if you require auth
      const res = await fetch("http://localhost:3000/api/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          reason,
          date,
          time,
          message,
          doctorEmail,
          userEmail,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("Appointment request sent to doctor!");
        // clear form if you want:
        // setReason('General check-up'); setDate(''); setTime(''); setMessage(''); setDoctorEmail('');
      } else {
        setStatus(data.error || "Failed to send appointment. Try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("Error sending appointment. Check console.");
    }
  };

  return (
    <div className="container narrow">
      <h2>Appointment Request</h2>
      <p>Fill the minimal details and book your appointment.</p>
      <form className="card form" onSubmit={submit}>
        <label>
          Reason
          <select value={reason} onChange={(e) => setReason(e.target.value)}>
            <option>General check-up</option>
            <option>Stomach pain</option>
            <option>Fever</option>
            <option>Anxiety</option>
            <option>Other</option>
          </select>
        </label>

        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>

        <label>
          Time
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </label>

        <label>
          Doctor's Email
          <input
            type="email"
            placeholder="doctor@example.com"
            value={doctorEmail}
            onChange={(e) => setDoctorEmail(e.target.value)}
          />
        </label>

        <label>
          Notes (optional)
          <textarea
            rows="3"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="e.g., I need more time to explain"
          />
        </label>

        <button type="submit" className="btn primary">
          Book Appointment
        </button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
}
