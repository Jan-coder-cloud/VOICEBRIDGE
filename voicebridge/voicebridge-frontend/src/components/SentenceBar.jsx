import React from 'react'

export default function SentenceBar({ sentence, onSpeak, onClear }){
  return (
    <div className="card sentence-bar" role="region" aria-live="polite">
      <div className="sentence-text">{sentence || 'Tap tiles to form a sentence...'}</div>
      <div className="bar-actions">
        <button className="btn" onClick={onClear} aria-label="Clear sentence">Clear</button>
        <button className="btn primary" onClick={onSpeak} aria-label="Speak sentence">Speak</button>
      </div>
    </div>
  )
}
