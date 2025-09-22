import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import Appointment from './pages/Appointment.jsx'
import Guide from './pages/Guide.jsx' // ✅ Import the new GUIDE page

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/guide" element={<Guide />} /> {/* ✅ Route for GUIDE */}
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
