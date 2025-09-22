// src/components/Signup.jsx
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Signup(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Signing up...')
    try {
      const res = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      })
      const data = await res.json()
      if (res.ok) {
        // Save token + user locally
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        setStatus('Signup successful')
        navigate('/') // or appointment page
      } else {
        setStatus(data.error || 'Failed to signup')
      }
    } catch (err) {
      console.error(err)
      setStatus('Error signing up')
    }
  }

  return (
    <div className="container narrow">
      <h2>Sign Up</h2>
      <form className="card form" onSubmit={submit}>
        <label>
          Name
          <input type="text" value={name} onChange={e => setName(e.target.value)} required />
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="btn primary">Sign Up</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
