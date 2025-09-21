import React, { useState } from 'react'

export default function Appointment(){
  const [reason, setReason] = useState('General check-up')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setStatus('Sending...')
    try {
      const res = await fetch('http://localhost:5000/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason, date, time, message })
      })
      if (res.ok) {
        setStatus('Appointment request sent to doctor!')
      } else {
        setStatus('Failed to send appointment. Try again.')
      }
    } catch (err) {
      setStatus('Error sending appointment.')
    }
  }

  return (
    <div className="container narrow">
      <h2>Appointment Request</h2>
      <p>Fill the minimal details and book your appointment.</p>
      <form className="card form" onSubmit={submit}>
        <label>
          Reason
          <select value={reason} onChange={e => setReason(e.target.value)}>
            <option>General check-up</option>
            <option>Stomach pain</option>
            <option>Fever</option>
            <option>Anxiety</option>
            <option>Other</option>
          </select>
        </label>
        <label>
          Date
          <input type="date" value={date} onChange={e => setDate(e.target.value)} />
        </label>
        <label>
          Time
          <input type="time" value={time} onChange={e => setTime(e.target.value)} />
        </label>
        <label>
          Notes (optional)
          <textarea rows="3" value={message} onChange={e => setMessage(e.target.value)} placeholder="e.g., I need more time to explain" />
        </label>
        <button type="submit" className="btn primary">Book Appointment</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  )
}
