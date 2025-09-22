import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/voicebridge.svg" alt="VoiceBridge Logo" width="28" height="28" />
        <Link to="/" className="brand">VoiceBridge</Link>
      </div>
      <nav className="nav-right">
        <NavLink to="/home" end>Home</NavLink>
        <NavLink to="/appointment">Appointment</NavLink>
        <NavLink to="/guide">Guide</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink> {/* Added Dashboard */}
      </nav>
    </header>
  )
}
