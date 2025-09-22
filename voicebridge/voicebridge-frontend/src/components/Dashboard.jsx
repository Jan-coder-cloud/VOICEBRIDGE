import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, logoutUser } from '../utils/localAuth'

export default function Dashboard() {
  const navigate = useNavigate()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const current = getCurrentUser()
    if (!current) navigate('/login')
    else setUser(current)
  }, [])

  const logout = () => {
    logoutUser()
    navigate('/login')
  }

  return user ? (
    <div className="container">
      <h2>Welcome, {user.name}!</h2>
      <p>Email: {user.email}</p>
      <p>Password: {user.password}</p> {/* optional: usually avoid showing password */}
      <button className="btn danger" onClick={logout}>Logout</button>
    </div>
  ) : null
}
