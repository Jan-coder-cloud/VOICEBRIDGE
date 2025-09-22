import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import TileBoard from '../components/TileBoard.jsx'
import SentenceBar from '../components/SentenceBar.jsx'
import SosModal from '../components/SosModal.jsx'
import VoiceSettings from '../components/VoiceSettings.jsx'

export default function Home() {
  const [sentence, setSentence] = useState('')
  const [showSOS, setShowSOS] = useState(false)
  const [voices, setVoices] = useState([])
  const [voiceId, setVoiceId] = useState(localStorage.getItem('voiceId') || '')
  const [rate, setRate] = useState(parseFloat(localStorage.getItem('rate')) || 1)
  const [pitch, setPitch] = useState(parseFloat(localStorage.getItem('pitch')) || 1)
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'en')
  const [history, setHistory] = useState(JSON.parse(localStorage.getItem('history')) || [])

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
        'பேச்சில்லா பயனர்களுக்கான செயற்கை நுண்ணறிவு ஆதரவு. வார்த்தை தொகுதிகளால் வாக்கியங்களை உருவாக்கி உடனே பேசவும்.',
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

  // 🔹 Load voices
  useEffect(() => {
    function loadVoices() {
      const v = window.speechSynthesis.getVoices()
      setVoices(v)

      let preferred
      if (language === 'ta') {
        preferred = v.find(x => x.lang.toLowerCase().startsWith('ta'))
      } else {
        preferred = v.find(x => /(en-GB|en-US)/i.test(x.lang))
      }
      setVoiceId(prev => prev || preferred?.name || v[0]?.name || '')
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [language])

  // 🔹 Persist settings
  useEffect(() => {
    localStorage.setItem('voiceId', voiceId)
    localStorage.setItem('rate', rate)
    localStorage.setItem('pitch', pitch)
    localStorage.setItem('language', language)
    localStorage.setItem('history', JSON.stringify(history))
  }, [voiceId, rate, pitch, language, history])

  // 🔹 Handle tile click
  const handleTileClick = word => {
    setSentence(prev => (prev ? prev + ' ' : '') + word)
  }

  const handleClear = () => setSentence('')

    // 🔹 Speak text (Google TTS for Tamil)
    const handleSpeak = async () => {
      if (!sentence.trim()) return;
      if (language === 'ta') {
        // Use Google TTS via backend
        try {
          const res = await fetch('http://localhost:5000/api/tts-tamil', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: sentence.trim() })
          });
          const data = await res.json();
          if (data.audioContent) {
            const audio = new window.Audio('data:audio/mp3;base64,' + data.audioContent);
            audio.play();
          } else {
            alert('Failed to get Tamil audio.');
          }
        } catch (err) {
          alert('Error with Google TTS: ' + err.message);
        }
      } else {
        // Use browser TTS for other languages
        const utter = new SpeechSynthesisUtterance(sentence.trim());
        let v = voices.find(x => x.name === voiceId);
        if (v) utter.voice = v;
        utter.rate = rate;
        utter.pitch = pitch;
        window.speechSynthesis.cancel();
        window.speechSynthesis.speak(utter);
      }
      // 🔹 Add to history
      setHistory(prev => [sentence.trim(), ...prev].slice(0, 10))
  }

  // 🔹 Reuse sentence from history
  const handleHistoryClick = sent => setSentence(sent)

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
        history={history}
        onHistoryClick={handleHistoryClick}
      />

      <div className="board-and-settings">
        <TileBoard
          onTileClick={handleTileClick}
          onSOS={() => setShowSOS(true)}
          categories={translations[language].categories}
          language={language}
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

      {showSOS && <SosModal onClose={() => setShowSOS(false)} language={language} />}
    </div>
  )
}
