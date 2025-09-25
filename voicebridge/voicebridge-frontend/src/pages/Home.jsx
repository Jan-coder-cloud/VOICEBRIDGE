// src/pages/Home.jsx
<<<<<<< HEAD
import React, { useEffect, useState, useRef } from 'react'
import TileBoard from '../components/TileBoard.jsx'
import SentenceBar from '../components/SentenceBar.jsx'
import SosModal from '../components/SosModal.jsx'
import VoiceSettings from '../components/VoiceSettings.jsx'
=======
import React, { useEffect, useState } from "react";
import TileBoard from "../components/TileBoard.jsx";
import SentenceBar from "../components/SentenceBar.jsx";
import SosModal from "../components/SosModal.jsx";
import VoiceSettings from "../components/VoiceSettings.jsx";
>>>>>>> my-part

export default function Home() {
  // 🔹 States
  const [sentence, setSentence] = useState("");
  const [showSOS, setShowSOS] = useState(false);
  const [voices, setVoices] = useState([]);
  const [voiceId, setVoiceId] = useState(localStorage.getItem("voiceId") || "");
  const [rate, setRate] = useState(
    parseFloat(localStorage.getItem("rate")) || 1
  );
  const [pitch, setPitch] = useState(
    parseFloat(localStorage.getItem("pitch")) || 1
  );
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || []
  );
  const [chatVisible, setChatVisible] = useState(false);

  // 🔹 Ref for Botpress iframe
  const chatIframeRef = useRef(null)

  // 🔹 Translations
  const translations = {
    en: {
      heroText:
        "AI-assisted communication for non-verbal users. Build sentences with tiles and speak them out instantly.",
      categories: [
        {
          name: "Basics",
          tiles: [
            "Hello",
            "Please",
            "Thank you",
            "Yes",
            "No",
            "Sorry",
            "Good",
            "Bad",
            "Okay",
          ],
        },
        {
          name: "Needs",
          tiles: [
            "Water",
            "Food",
            "Toilet",
            "Medicine",
            "Pain",
            "Hungry",
            "Thirsty",
            "Tired",
            "Sleep",
            "Help",
          ],
        },
        {
          name: "Actions",
          tiles: [
            "Open",
            "Close",
            "Give",
            "Take",
            "Come",
            "Go",
            "Sit",
            "Stand",
            "Stop",
            "Start",
          ],
        },
        {
          name: "People / Relations",
          tiles: [
            "Mother",
            "Father",
            "Brother",
            "Sister",
            "Friend",
            "Doctor",
            "Teacher",
          ],
        },
        {
          name: "Common Objects",
          tiles: [
            "Phone",
            "Book",
            "Bag",
            "Door",
            "Light",
            "Fan",
            "Chair",
            "Bed",
          ],
        },
        {
          name: "Emergency / Quick Phrases",
          tiles: ["Danger", "Fire", "Call", "Ambulance", "Police"],
        },
        { name: "Feelings", tiles: ["Anxious", "Happy", "Sad", "Confused"] },
        {
          name: "Places",
          tiles: ["Home", "RestRoom", "Clinic", "Class", "Canteen", "Library"],
        },
      ],
    },
    ta: {
      heroText:
        "பேச்சில்லா பயனர்களுக்கான செயற்கை நுண்ணறிவு ஆதரவு. வார்த்தை தொகுதிகளால் வாக்கியங்களை உருவாக்கி உடனே பேசவும்.",
      categories: [
        {
          name: "அடிப்படை",
          tiles: [
            "வணக்கம்",
            "தயவு செய்து",
            "நன்றி",
            "ஆம்",
            "இல்லை",
            "மன்னிக்கவும்",
            "நல்லது",
            "மோசம்",
            "சரி",
          ],
        },
        {
          name: "தேவைகள்",
          tiles: [
            "தண்ணீர்",
            "உணவு",
            "கழிப்பிடம்",
            "மருந்து",
            "வலி",
            "பசிக்கிறது",
            "தாகம்",
            "மலிவு",
            "உறக்கம்",
            "உதவி",
          ],
        },
        {
          name: "செயல்கள்",
          tiles: [
            "திறக்க",
            "மூடு",
            "கொடு",
            "எடு",
            "வா",
            "போ",
            "உற்கொள்",
            "நின்று",
            "நிறுத்து",
            "தொடங்கு",
          ],
        },
        {
          name: "மக்கள் / உறவுகள்",
          tiles: [
            "அம்மா",
            "அப்பா",
            "சகோதர்",
            "சகோதரி",
            "நண்பர்",
            "மருத்துவர்",
            "ஆசிரியர்",
          ],
        },
        {
          name: "பொதுவான பொருட்கள்",
          tiles: [
            "தொலைபேசி",
            "புத்தகம்",
            "பை",
            "திறப்பு",
            "ஒளி",
            "காற்றாடி",
            "காசி",
            "படுக்கை",
          ],
        },
        {
          name: "அவசர / விரைவு வாக்கியங்கள்",
          tiles: ["ஆபத்து", "தீ", "அழைப்பு", "ஆம்புலன்ஸ்", "போலீசார்"],
        },
        {
          name: "உணர்வுகள்",
          tiles: ["கவலை", "மகிழ்ச்சி", "சோகம்", "குழப்பம்"],
        },
        {
          name: "இடங்கள்",
          tiles: [
            "வீடு",
            "கழிப்பிடம்",
            "மருத்துவமனை",
            "வகுப்பு",
            "கன்டீன்",
            "நூலகம்",
          ],
        },
      ],
    },
  };

  // 🔹 Load voices
  useEffect(() => {
    function loadVoices() {
<<<<<<< HEAD
      const v = window.speechSynthesis.getVoices()
      setVoices(v)
      const preferred = language === 'ta'
        ? v.find(x => x.lang.toLowerCase().startsWith('ta'))
        : v.find(x => /(en-GB|en-US)/i.test(x.lang))
      setVoiceId(prev => prev || preferred?.name || v[0]?.name || '')
=======
      const v = window.speechSynthesis.getVoices();
      setVoices(v);
      let preferred =
        language === "ta"
          ? v.find((x) => x.lang.toLowerCase().startsWith("ta"))
          : v.find((x) => /(en-GB|en-US)/i.test(x.lang));
      setVoiceId((prev) => prev || preferred?.name || v[0]?.name || "");
>>>>>>> my-part
    }
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [language]);

  // 🔹 Persist settings
  useEffect(() => {
    localStorage.setItem("voiceId", voiceId);
    localStorage.setItem("rate", rate);
    localStorage.setItem("pitch", pitch);
    localStorage.setItem("language", language);
    localStorage.setItem("history", JSON.stringify(history));
  }, [voiceId, rate, pitch, language, history]);

  // 🔹 Handlers
<<<<<<< HEAD
  const handleTileClick = word => {
    const newSentence = sentence ? sentence + ' ' + word : word
    setSentence(newSentence)
    sendMessageToBot(newSentence)
    setSentence('') // clear after sending
    setHistory(prev => [newSentence, ...prev].slice(0, 10))
  }

  const handleClear = () => setSentence('')

  const handleSpeak = async () => {
    if (!sentence.trim()) return
    if (language === 'ta') {
=======
  const handleTileClick = (word) =>
    setSentence((prev) => (prev ? prev + " " : "") + word);
  const handleClear = () => setSentence("");

  const handleSpeak = async () => {
    if (!sentence.trim()) return;

    if (language === "ta") {
>>>>>>> my-part
      try {
        const res = await fetch("http://localhost:3000/api/tts-tamil", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text: sentence.trim() }),
        });
        //   const data = await res.json()
        //   if (data.audioContent) {
        //     const audio = new Audio('data:audio/mp3;base64,' + data.audioContent)
        //     audio.play()
        //   } else alert('Failed to get Tamil audio.')
        // } catch (err) {
        //   alert('Error with Google TTS: ' + err.message)
        // }
        // Convert response to Blob (binary audio)
        const audioBlob = await res.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (err) {
        alert("Error with Tamil TTS: " + err.message);
      }
    } else {
      const utter = new SpeechSynthesisUtterance(sentence.trim());
      const v = voices.find((x) => x.name === voiceId);
      if (v) utter.voice = v;
      utter.rate = rate;
      utter.pitch = pitch;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
<<<<<<< HEAD
    setHistory(prev => [sentence.trim(), ...prev].slice(0, 10))
  }
=======

    setHistory((prev) => [sentence.trim(), ...prev].slice(0, 10));
  };
>>>>>>> my-part

  const handleHistoryClick = (sent) => setSentence(sent);
  const toggleChat = () => setChatVisible(!chatVisible);

  // 🔹 Send message to Botpress via postMessage
  const sendMessageToBot = msg => {
    if (chatIframeRef.current) {
      chatIframeRef.current.contentWindow.postMessage(
        { type: 'webchat/send_message', payload: msg },
        '*'
      )
    }
  }

  return (
    <div className="container">
      <section className="hero">
        <h1>VoiceBridge</h1>
        <p>{translations[language].heroText}</p>
        <label style={{ display: "block", marginTop: "1rem" }}>
          Language:{" "}
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="ta">தமிழ்</option>
          </select>
        </label>
      </section>

      <SentenceBar
        sentence={sentence}
        onSpeak={handleSpeak}
        onClear={handleClear}
        history={history}
        onHistoryClick={handleHistoryClick}
      />

      <div style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
        <TileBoard
          onTileClick={handleTileClick}
          onSOS={() => setShowSOS(true)}
          categories={translations[language].categories}
          language={language}
        />

        <div style={{ position: "relative" }}>
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
              position: "fixed",
              bottom: "80px",
              right: "30px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              backgroundColor: "#2563eb",
              border: "none",
              cursor: "pointer",
              color: "white",
              fontSize: "28px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              zIndex: 1001,
            }}
            title="Open Chat"
          >
            💬
          </button>
        </div>
      </div>

      {showSOS && (
        <SosModal onClose={() => setShowSOS(false)} language={language} />
      )}
      {chatVisible && (
        <iframe
          ref={chatIframeRef}
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
  );
}
