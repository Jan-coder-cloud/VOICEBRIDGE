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
  const [chatVisible, setChatVisible] = useState(false)

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
        { name: 'Places', tiles: ['Home', 'RestRoom', 'Clinic', 'Class', 'Canteen', 'Library'] },
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
        { name: 'இடங்கள்', tiles: ['வீடு', 'கழிப்பிடம்', 'மருத்துவமனை', 'வகுப்பு', 'கன்டீன்', 'நூலகம்'] },
      ],
    },
  }

  // Load voices
  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
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

  const handleTileClick = word => {
    setSentence(prev => (prev ? prev + ' ' : '') + word)
  }
  const handleClear = () => setSentence('')
  const handleSpeak = () => {
    if (!sentence.trim()) return
    const utter = new SpeechSynthesisUtterance(sentence.trim())
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

  const toggleChat = () => setChatVisible(!chatVisible)

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <h1>VoiceBridge</h1>
          <p>{translations[language].heroText}</p>

          {/* Language Selector */}
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

      <div className="board-and-settings" style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
        <TileBoard
          onTileClick={handleTileClick}
          onSOS={() => setShowSOS(true)}
          categories={translations[language].categories}
        />

        <div style={{ position: 'relative' }}>
          <VoiceSettings
            voices={voices}
            voiceId={voiceId}
            setVoiceId={setVoiceId}
            rate={rate}
            setRate={setRate}
            pitch={pitch}
            setPitch={setPitch}
          />
          <button
            onClick={toggleChat}
            style={{
              position: 'fixed',
              bottom: '80px',     // push it up from the bottom
              right: '30px',      // move to bottom-right corner
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              backgroundColor: '#2563eb',
              border: 'none',
              cursor: 'pointer',
              color: 'white',
              fontSize: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)', // nice shadow
              zIndex: 1001
            }}
            title="Open Chat"
          >
            💬
          </button>

        </div>
      </div>

      {showSOS && <SosModal onClose={() => setShowSOS(false)} />}

      {chatVisible && (
        <iframe
          src="https://cdn.botpress.cloud/webchat/v3.2/shareable.html?configUrl=https://files.bpcontent.cloud/2025/09/22/17/20250922172603-MHNBCZH9.json"
          style={{
            position: "fixed",
            bottom: "100px",
            right: "20px",
            width: "350px",
            height: "500px",
            border: "1px solid #ccc",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000,
          }}
          title="VoiceBridge Chat"
        />
      )}
    </div>
  )
}
