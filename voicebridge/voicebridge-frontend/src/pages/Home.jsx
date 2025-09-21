import React, { useEffect, useMemo, useState } from 'react'
import TileBoard from '../components/TileBoard.jsx'
import SentenceBar from '../components/SentenceBar.jsx'
import SosModal from '../components/SosModal.jsx'
import VoiceSettings from '../components/VoiceSettings.jsx'

export default function Home(){
  const [sentence, setSentence] = useState('')
  const [showSOS, setShowSOS] = useState(false)
  const [voices, setVoices] = useState([])
  const [voiceId, setVoiceId] = useState('')
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)

  useEffect(() => {
    // Load available voices
    function loadVoices(){
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
      if (v.length && !voiceId) {
        const preferred = v.find(x => /(en-GB|en-US)/i.test(x.lang)) || v[0]
        setVoiceId(preferred?.name || '')
      }
    }
    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const handleTileClick = (word) => {
    setSentence(prev => (prev ? prev + ' ' : '') + word)
  }

  const handleClear = () => setSentence('')

  const handleSpeak = () => {
    if (!sentence.trim()) return
    const utter = new SpeechSynthesisUtterance(sentence.trim())
    const v = voices.find(x => x.name === voiceId)
    if (v) utter.voice = v
    utter.rate = rate
    utter.pitch = pitch
    utter.onend = () => {}
    window.speechSynthesis.cancel()
    window.speechSynthesis.speak(utter)
  }

  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <h1>VoiceBridge</h1>
          <p>AI-assisted communication for non-verbal users. Build sentences with tiles and speak them out instantly.</p>
        </div>
      </section>

      <SentenceBar
        sentence={sentence}
        onSpeak={handleSpeak}
        onClear={handleClear}
      />

      <div className="board-and-settings">
        <TileBoard onTileClick={handleTileClick} onSOS={() => setShowSOS(true)} />
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
