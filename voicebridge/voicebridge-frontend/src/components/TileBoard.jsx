import React from 'react'

const categories = [
  { name: 'Basics', tiles: ['Hello', 'Please', 'Thank you', 'Yes', 'No'] },
  { name: 'Needs', tiles: ['Water', 'Food', 'Bathroom', 'Rest', 'Medicine'] },
  { name: 'Feelings', tiles: ['Pain', 'Anxious', 'Happy', 'Sad', 'Confused'] },
  { name: 'Places', tiles: ['Home', 'Clinic', 'Class', 'Canteen', 'Library'] },
  { name: 'Actions', tiles: ['I', 'Need', 'Want', 'Go', 'Help','am','in','to','of'] },
]

function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utter)
  }
}

export default function TileBoard({ onTileClick, onSOS }){
  const handleTileClick = (t) => {
    if (onTileClick) onTileClick(t)
    speak(t)
  }

  return (
    <section className="tile-section">
      <div className="tile-header">
        <h2>Tap tiles to build a sentence</h2>
        <button className="btn danger" onClick={onSOS}>SOS</button>
      </div>
      {categories.map((cat, i) => (
        <div key={i} className="category">
          <h3>{cat.name}</h3>
          <div className="tiles">
            {cat.tiles.map((t, idx) => (
              <button
                key={idx}
                className="tile"
                onClick={() => handleTileClick(t)}
                aria-label={`Insert word ${t}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}