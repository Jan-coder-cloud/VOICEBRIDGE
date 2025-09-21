import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar(){
  return (
    <header className="navbar">
      <div className="nav-left">
        <img src="/voicebridge.svg" alt="" width="28" height="28" />
        <Link to="/" className="brand">VoiceBridge</Link>
      </div>
      <nav className="nav-right">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/appointment">Appointment</NavLink>
        <a href="https://example.com" target="_blank" rel="noreferrer">Docs</a>
      </nav>
    </header>
  )
}
