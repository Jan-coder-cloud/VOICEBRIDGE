import React from 'react'

export default function SosModal({ onClose }){
  const speak = (text) => {
    const utter = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
  const sendAlert = () => {
    const msg = 'I need help. Please assist me now.'
    speak(msg)
    alert('SOS message spoken. (Integrate SMS/Email/Push in backend.)')
    onClose()
  }
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <h3>SOS Alert</h3>
        <p>This will speak an emergency request aloud to people nearby.</p>
        <div className="modal-actions">
          <button className="btn danger" onClick={sendAlert}>Speak SOS</button>
          <button className="btn" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}
