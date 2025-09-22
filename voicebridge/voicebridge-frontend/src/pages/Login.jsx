// src/components/Login.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Logging in...')
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      const data = await res.json()
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setStatus('Logged in')
        navigate('/') // go wherever
      } else {
        setStatus(data.error || 'Login failed')
      }
    } catch (err) {
      console.error(err)
      setStatus('Error logging in')
    }
  }

  return (
    <div className="container narrow">
      <h2>Login</h2>
      <form className="card form" onSubmit={submit}>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn primary">Login</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
