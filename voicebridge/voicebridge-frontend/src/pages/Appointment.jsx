import React, { useState } from 'react'

export default function Appointment(){
  const [reason, setReason] = useState('General check-up')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [message, setMessage] = useState('')

  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  const submit = (e) => {
    e.preventDefault()
    const summary = `I need an appointment. Reason: ${reason}. Preferred date: ${date}. Time: ${time}. Note: ${message || 'No extra notes.'}`
    speak(summary)
    alert('Appointment request spoken aloud. (Integrate backend to send it.)')
  }

  return (
    <div className="container narrow">
      <h2>Appointment Request</h2>
      <p>Fill the minimal details and let the system speak your request.</p>
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
        <button type="submit" className="btn primary">Speak Request</button>
      </form>
    </div>
  )
}
