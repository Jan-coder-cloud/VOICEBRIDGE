import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getUser, setCurrentUser } from '../utils/localAuth'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (current) navigate('/dashboard')
  }, [])

  const submit = (e) => {
    e.preventDefault()
    setStatus('Logging in...')

    const user = getUser(email)
    if (!user) {
      setStatus('User not found. Please sign up.')
      setTimeout(() => navigate('/signup'), 1500)
      return
    }

    if (user.password === password) {
      setCurrentUser(user)
      setStatus('Login successful!')
      setTimeout(() => navigate('/dashboard'), 1000)
    } else {
      setStatus('Incorrect password.')
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
