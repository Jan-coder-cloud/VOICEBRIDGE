import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { saveUser, setCurrentUser, getUser } from '../utils/localAuth'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState('')
  const navigate = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    setStatus('Signing up...')

    if (getUser(email)) {
      setStatus('User already exists. Please login.')
      setTimeout(() => navigate('/login'), 1500)
      return
    }

    const user = { name, email, password }
    saveUser(user)
    setCurrentUser(user)
    setStatus('Signup successful!')
    setTimeout(() => navigate('/dashboard'), 1000)
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
