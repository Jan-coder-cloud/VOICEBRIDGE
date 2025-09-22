// import React, { useEffect, useMemo, useState } from 'react'
// import TileBoard from '../components/TileBoard.jsx'
// import SentenceBar from '../components/SentenceBar.jsx'
// import SosModal from '../components/SosModal.jsx'
// import VoiceSettings from '../components/VoiceSettings.jsx'

// export default function Home(){
//   const [sentence, setSentence] = useState('')
//   const [showSOS, setShowSOS] = useState(false)
//   const [voices, setVoices] = useState([])
//   const [voiceId, setVoiceId] = useState('')
//   const [rate, setRate] = useState(1)
//   const [pitch, setPitch] = useState(1)

//   useEffect(() => {
//     // Load available voices
//     function loadVoices(){
//       const v = window.speechSynthesis.getVoices()
//       setVoices(v)
//       if (v.length && !voiceId) {
//         const preferred = v.find(x => /(en-GB|en-US)/i.test(x.lang)) || v[0]
//         setVoiceId(preferred?.name || '')
//       }
//     }
//     loadVoices()
//     window.speechSynthesis.onvoiceschanged = loadVoices
//   }, [])

//   const handleTileClick = (word) => {
//     setSentence(prev => (prev ? prev + ' ' : '') + word)
//   }

//   const handleClear = () => setSentence('')

//   const handleSpeak = () => {
//     if (!sentence.trim()) return
//     const utter = new SpeechSynthesisUtterance(sentence.trim())
//     const v = voices.find(x => x.name === voiceId)
//     if (v) utter.voice = v
//     utter.rate = rate
//     utter.pitch = pitch
//     utter.onend = () => {}
//     window.speechSynthesis.cancel()
//     window.speechSynthesis.speak(utter)
//   }

//   return (
//     <div className="container">
//       <section className="hero">
//         <div className="hero-text">
//           <h1>VoiceBridge</h1>
//           <p>AI-assisted communication for non-verbal users. Build sentences with tiles and speak them out instantly.</p>
//         </div>
//       </section>

//       <SentenceBar
//         sentence={sentence}
//         onSpeak={handleSpeak}
//         onClear={handleClear}
//       />

//       <div className="board-and-settings">
//         <TileBoard onTileClick={handleTileClick} onSOS={() => setShowSOS(true)} />
//         <VoiceSettings
//           voices={voices}
//           voiceId={voiceId}
//           setVoiceId={setVoiceId}
//           rate={rate}
//           setRate={setRate}
//           pitch={pitch}
//           setPitch={setPitch}
//         />
//       </div>

//       {showSOS && <SosModal onClose={() => setShowSOS(false)} />}
//     </div>
//   )
// }
import React, { useEffect, useState } from 'react'
import TileBoard from '../components/TileBoard.jsx'
import SentenceBar from '../components/SentenceBar.jsx'
import SosModal from '../components/SosModal.jsx'
import VoiceSettings from '../components/VoiceSettings.jsx'

export default function Home() {
  const [sentence, setSentence] = useState('')
  const [showSOS, setShowSOS] = useState(false)
  const [voices, setVoices] = useState([])
  const [voiceId, setVoiceId] = useState('')
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [language, setLanguage] = useState('en')

  // 🔹 Translations for English + Tamil
const translations = {
  en: {
    heroText:
      'AI-assisted communication for non-verbal users. Build sentences with tiles and speak them out instantly.',
    categories: [
      { name: 'Basics', tiles: ['Hello', 'Please', 'Thank you', 'Yes', 'No', 'Sorry', 'Good', 'Bad', 'Okay'] },
      { name: 'Needs', tiles: ['Water', 'Food', 'Toilet', 'Medicine', 'Pain', 'Hungry', 'Thirsty', 'Tired', 'Sleep', 'Help'] },
      { name: 'Actions', tiles: ['Open', 'Close', 'Give', 'Take', 'Come', 'Go', 'Sit', 'Stand', 'Stop', 'Start'] },
      { name: 'People / Relations', tiles: ['Mother', 'Father', 'Brother', 'Sister', 'Friend', 'Doctor', 'Teacher'] },
      { name: 'Common Objects', tiles: ['Phone', 'Book', 'Bag', 'Door', 'Light', 'Fan', 'Chair', 'Bed'] },
      { name: 'Emergency / Quick Phrases', tiles: ['Danger', 'Fire', 'Call', 'Ambulance', 'Police'] },
      { name: 'Feelings', tiles: ['Anxious', 'Happy', 'Sad', 'Confused'] },
      { name: 'Places', tiles: ['Home','RestRoom','Clinic', 'Class', 'Canteen', 'Library'] },
    ],
  },
  ta: {
    heroText:
      'பேச முடியாத பயனர்களுக்கான AI உதவியுடன் தொடர்பு. சொற்களைத் தேர்ந்தெடுத்து வாக்கியங்களை உருவாக்கி உடனடியாக பேசுங்கள்.',
    categories: [
      { name: 'அடிப்படை', tiles: ['வணக்கம்', 'தயவு செய்து', 'நன்றி', 'ஆம்', 'இல்லை', 'மன்னிக்கவும்', 'நல்லது', 'மோசம்', 'சரி'] },
      { name: 'தேவைகள்', tiles: ['தண்ணீர்', 'உணவு', 'கழிப்பிடம்', 'மருந்து', 'வலி', 'பசிக்கிறது', 'தாகம்', 'மலிவு', 'உறக்கம்', 'உதவி'] },
      { name: 'செயல்கள்', tiles: ['திறக்க', 'மூடு', 'கொடு', 'எடு', 'வா', 'போ', 'உற்கொள்', 'நின்று', 'நிறுத்து', 'தொடங்கு'] },
      { name: 'மக்கள் / உறவுகள்', tiles: ['அம்மா', 'அப்பா', 'சகோதர்', 'சகோதரி', 'நண்பர்', 'மருத்துவர்', 'ஆசிரியர்'] },
      { name: 'பொதுவான பொருட்கள்', tiles: ['தொலைபேசி', 'புத்தகம்', 'பை', 'திறப்பு', 'ஒளி', 'காற்றாடி', 'காசி', 'படுக்கை'] },
      { name: 'அவசர / விரைவு வாக்கியங்கள்', tiles: ['ஆபத்து', 'தீ', 'அழைப்பு', 'ஆம்புலன்ஸ்', 'போலீசார்'] },
      { name: 'உணர்வுகள்', tiles: ['கவலை', 'மகிழ்ச்சி', 'சோகம்', 'குழப்பம்'] },
      { name: 'இடங்கள்', tiles: ['வீடு','கழிப்பிடம்','மருத்துவமனை', 'வகுப்பு', 'கன்டீன்', 'நூலகம்'] },
    ],
  },
}

  // 🔹 Load available voices
  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)

      // pick default voice
      if (v.length && !voiceId) {
        let preferred
        if (language === 'ta') {
          preferred = v.find(x => x.lang.toLowerCase().startsWith('ta'))
        } else {
          preferred = v.find(x => /(en-GB|en-US)/i.test(x.lang))
        }
        setVoiceId(preferred?.name || v[0]?.name || '')
      }
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [language, voiceId])

  // 🔹 Handle tile click
  const handleTileClick = word => {
    setSentence(prev => (prev ? prev + ' ' : '') + word)
  }

  const handleClear = () => setSentence('')

  // 🔹 Speak text
  const handleSpeak = () => {
    if (!sentence.trim()) return
    const utter = new SpeechSynthesisUtterance(sentence.trim())

    // pick Tamil or English voice
    let v
    if (language === 'ta') {
      v = voices.find(x => x.lang.toLowerCase().startsWith('ta'))
    } else {
      v = voices.find(x => x.name === voiceId)
    }
    if (v) utter.voice = v

    utter.rate = rate
    utter.pitch = pitch

    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <h1>VoiceBridge</h1>
          <p>{translations[language].heroText}</p>

          {/* 🔹 Language Selector */}
          <label style={{ marginTop: '1rem', display: 'block' }}>
            Language:{' '}
            <select value={language} onChange={e => setLanguage(e.target.value)}>
              <option value="en">English</option>
              <option value="ta">தமிழ்</option>
            </select>
          </label>
        </div>
      </section>

      <SentenceBar
        sentence={sentence}
        onSpeak={handleSpeak}
        onClear={handleClear}
      />

      <div className="board-and-settings">
        <TileBoard
          onTileClick={handleTileClick}
          onSOS={() => setShowSOS(true)}
          categories={translations[language].categories}
        />
        <VoiceSettings
          voices={voices}
          voiceId={voiceId}
          setVoiceId={setVoiceId}
          rate={rate}
          setRate={setRate}
          pitch={pitch}
          setPitch={setPitch}
        />
      </div>

      {showSOS && <SosModal onClose={() => setShowSOS(false)} />}
    </div>
  )
}
