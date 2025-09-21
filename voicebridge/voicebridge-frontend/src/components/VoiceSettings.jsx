import React from 'react'

export default function VoiceSettings({ voices, voiceId, setVoiceId, rate, setRate, pitch, setPitch }){
  return (
    <aside className="card settings">
      <h3>Voice Settings</h3>
      <label>
        Voice
        <select value={voiceId} onChange={e => setVoiceId(e.target.value)}>
          {voices.map(v => (
            <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
          ))}
        </select>
      </label>
      <label>
        Rate
        <input type="range" min="0.5" max="1.5" step="0.1" value={rate} onChange={e => setRate(parseFloat(e.target.value))} />
      </label>
      <label>
        Pitch
        <input type="range" min="0.5" max="1.5" step="0.1" value={pitch} onChange={e => setPitch(parseFloat(e.target.value))} />
      </label>
      <p className="hint">Note: Available voices vary by browser and OS.</p>
    </aside>
  )
}
