import React, { useState } from 'react'

// Define main tiles with nested sub-tiles (English + Tamil)
const guideData = {
  en: [
    {
      title: 'How to Use VoiceBridge',
      subTiles: [
        { title: 'Building Sentences', content: 'Tap tiles to form sentences. Press speak to hear them.' },
        { title: 'Clearing Sentences', content: 'Use the clear button to reset the sentence.' },
        { title: 'SOS Feature', content: 'Press SOS to alert caregivers immediately.' }
      ]
    },
    {
      title: 'Soothing Sounds',
      subTiles: [
        { title: 'Nature', content: 'Play gentle forest or river sounds.', audio: '/sounds/nature.mp3' },
        { title: 'Music', content: 'Play soft, calming music.', audio: '/sounds/music.mp3' },
        { title: 'Meditation', content: 'Relaxing meditation sounds.', audio: '/sounds/meditation.mp3' }
      ]
    },
    {
      title: 'Daily Tips',
      subTiles: [
        { title: 'Hydration', content: 'Drink water regularly to stay healthy.' },
        { title: 'Rest', content: 'Take short breaks and sleep well.' },
        { title: 'Communication', content: 'Use VoiceBridge daily for practice.' }
      ]
    },
    {
      title: 'Emergency Info',
      subTiles: [
        { title: 'Medical Help', content: 'Call your doctor or nearby clinic in emergencies.' },
        { title: 'Fire or Danger', content: 'Press SOS and inform authorities immediately.' }
      ]
    },
    {
      title: 'Motivational Quotes',
      subTiles: [
        { title: 'Quote 1', content: 'You are capable of amazing things.' },
        { title: 'Quote 2', content: 'Keep trying, every day is a new opportunity.' },
        { title: 'Quote 3', content: 'Your voice matters. Speak confidently.' }
      ]
    }
  ],
  ta: [
    {
      title: 'VoiceBridge பயன்பாடு',
      subTiles: [
        { title: 'வாக்கியங்கள் உருவாக்குதல்', content: 'Tiles-ஐ தட்டவும். பேச அழுத்தவும்.' },
        { title: 'வாக்கியங்களை அழிக்க', content: 'Clear பொத்தானை அழுத்தி மீண்டும் தொடங்கவும்.' },
        { title: 'SOS அம்சம்', content: 'SOS அழுத்தி கவனிப்பவர்களை அறிவிக்கவும்.' }
      ]
    },
    {
      title: 'ஆராமமான ஒலிகள்',
      subTiles: [
        { title: 'நேச்சர்', content: 'காடுகள் அல்லது ஆற்றின் மென்மையான ஒலிகளை கேளுங்கள்.', audio: '/sounds/nature.mp3' },
        { title: 'இசை', content: 'மென்மையான இசை கேளுங்கள்.', audio: '/sounds/music.mp3' },
        { title: 'தியானம்', content: 'ஆராமமான தியான ஒலிகள்.', audio: '/sounds/meditation.mp3' }
      ]
    },
    {
      title: 'தினசரி குறிப்புகள்',
      subTiles: [
        { title: 'தண்ணீர்', content: 'நீங்கள் ஆரோக்கியமாக இருக்க தண்ணீர் பருகுங்கள்.' },
        { title: 'ஓய்வு', content: 'சிறிய ஓய்வுகளை எடுத்துக்கொள் மற்றும் நல்ல தூக்கம் எடு.' },
        { title: 'தொடர்பு', content: 'VoiceBridge-ஐ தினமும் பயிற்சிக்க பயன்படுத்தவும்.' }
      ]
    },
    {
      title: 'அவசர தகவல்',
      subTiles: [
        { title: 'மருத்துவ உதவி', content: 'அவசரத்தில் உங்கள் மருத்துவரை அழைக்கவும்.' },
        { title: 'தீ அல்லது ஆபத்து', content: 'SOS அழுத்தி அதிகாரிகளுக்கு அறிவிக்கவும்.' }
      ]
    },
    {
      title: 'மோட்டிவேஷன் மேற்கோள்கள்',
      subTiles: [
        { title: 'மெருக்கம் 1', content: 'நீங்கள் அற்புதமான காரியங்களை செய்யக்கூடியவர்.' },
        { title: 'மெருக்கம் 2', content: 'ஒவ்வொரு நாளும் புதிய வாய்ப்பாகும். முயற்சி செய்க.' },
        { title: 'மெருக்கம் 3', content: 'உங்கள் குரல் முக்கியம். நம்பிக்கையுடன் பேசவும்.' }
      ]
    }
  ]
}

// Function to play audio + speech
function playContent(text, audio) {
  if (audio) {
    const sound = new Audio(audio)
    sound.play()
  }
  if ('speechSynthesis' in window) {
    const utter = new SpeechSynthesisUtterance(text)
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }
}

export default function Guide() {
  const [language, setLanguage] = useState('en')
  const [selectedMainTile, setSelectedMainTile] = useState(null)
  const [selectedSubTile, setSelectedSubTile] = useState(null)

  const tiles = guideData[language]

  return (
    <div className="container guide-page" style={{ padding: '2rem', backgroundColor: '#e6f0ff', minHeight: '100vh' }}>
      <h1 style={{ color: '#004080', textAlign: 'center' }}>GUIDE</h1>
      <label style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
        Language:{' '}
        <select value={language} onChange={e => { setLanguage(e.target.value); setSelectedMainTile(null); setSelectedSubTile(null) }}>
          <option value="en">English</option>
          <option value="ta">தமிழ்</option>
        </select>
      </label>

      {/* Main tiles */}
      {!selectedMainTile && (
        <div className="tiles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {tiles.map((tile, idx) => (
            <button
              key={idx}
              className="tile"
              style={{
                padding: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#66a3ff',
                color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', minHeight: '100px'
              }}
              onClick={() => { setSelectedMainTile(tile); setSelectedSubTile(null) }}
            >
              {tile.title}
            </button>
          ))}
        </div>
      )}

      {/* Sub-tiles */}
      {selectedMainTile && (
        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setSelectedMainTile(null)}
            style={{ marginBottom: '1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', backgroundColor: '#004080', color: 'white' }}
          >
            ← Back
          </button>
          <h2 style={{ color: '#004080' }}>{selectedMainTile.title}</h2>
          <div className="tiles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginTop: '1rem' }}>
            {selectedMainTile.subTiles.map((sub, idx) => (
              <button
                key={idx}
                className="tile"
                style={{
                  padding: '1rem', borderRadius: '10px', border: 'none', backgroundColor: '#3399ff',
                  color: 'white', fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 2px 5px rgba(0,0,0,0.2)', minHeight: '80px'
                }}
                onClick={() => { setSelectedSubTile(sub); playContent(sub.content, sub.audio) }}
              >
                {sub.title}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Display sub-tile content */}
      {selectedSubTile && (
        <div style={{
          marginTop: '2rem', padding: '1rem', backgroundColor: '#cce0ff',
          borderRadius: '10px', color: '#004080'
        }}>
          <h3>{selectedSubTile.title}</h3>
          <p>{selectedSubTile.content}</p>
        </div>
      )}
    </div>
  )
}
