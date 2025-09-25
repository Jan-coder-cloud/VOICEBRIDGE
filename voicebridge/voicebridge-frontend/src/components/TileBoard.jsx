import React, { useState } from "react";

// English suggestions
const suggestionsMap = {
  hello: ["how are you?", "good morning!", "dear friend!"],
  food: [
    "would like some rice.",
    "can I have some bread?",
    "please give me milk.",
  ],
  water: ["is needed.", "will be available?", "please give me a bottle."],
  pain: ["is unbearable.", "is in my stomach.", "in my head."],
  help: ["me, please.", "is needed now.", "can you help?"],
  need: ["help.", "water.", "food.", "rest."],
  hungry: ["I want some food.", "Can I eat something?", "Need to eat."],
  thirsty: ["I want water.", "Can I have a drink?", "Need a drink."],
  tired: ["Need rest.", "Want to sleep.", "Feeling exhausted."],
  sleep: ["I want to sleep.", "Need some rest.", "Time to sleep."],
  toilet: ["is needed.", "Can I go?", "Where is it?"],
  medicine: ["is needed.", "Please give me medicine.", "Do I have any?"],
  mother: ["is here.", "Can help me.", "Please call her."],
  father: ["is here.", "Can help me.", "Please call him."],
  brother: ["is here.", "Can help me.", "Please call him."],
  sister: ["is here.", "Can help me.", "Please call her."],
  friend: ["is here.", "Can help me.", "Please call my friend."],
  doctor: ["is needed.", "Call the doctor.", "Where is the doctor?"],
  teacher: ["is needed.", "Call the teacher.", "Where is the teacher?"],
  phone: ["is needed.", "Where is it?", "Can I use it?"],
  book: ["is needed.", "Where is it?", "Can I take it?"],
  bag: ["is needed.", "Where is it?", "Can I take it."],
  door: ["Open it.", "Close it.", "Where is it?"],
  light: ["Turn it on.", "Turn it off.", "It is bright."],
  fan: ["Turn it on.", "Turn it off.", "It is noisy."],
  chair: ["Sit on it.", "Move it.", "I need it."],
  bed: ["I want to sleep on it.", "It is comfortable.", "Make it."],
  danger: ["There is danger!", "Help, danger!", "Run from danger!"],
  fire: ["There is fire!", "Call fire department!", "Fire is dangerous!"],
  call: ["the police.", "an ambulance.", "for help."],
  ambulance: ["is needed.", "Please call quickly.", "It is on the way."],
  police: ["is needed.", "Call immediately.", "Where are they?"],
  open: ["the door.", "the window.", "the bag."],
  close: ["the door.", "the window.", "the bag."],
  give: ["me water.", "me food.", "me medicine."],
  take: ["this.", "that.", "the bag."],
  come: ["here.", "with me.", "to the room."],
  go: ["there.", "to school.", "to home."],
  sit: ["on the chair.", "here.", "there."],
  stand: ["up.", "here.", "there."],
  stop: ["this.", "now.", "immediately."],
  start: ["the work.", "the machine.", "the game."],
  please: ["help me.", "give me water.", "open the door."],
  thank: ["you.", "you very much.", "for your help."],
  yes: ["I understand.", "I agree.", "that is fine."],
  no: ["I cannot.", "I don’t want.", "that is not okay."],
  sorry: ["for that.", "I am sorry.", "please forgive me."],
  good: ["morning.", "job.", "day."],
  bad: ["situation.", "news.", "experience."],
  okay: ["I understand.", "that is fine.", "thank you."],
};

// Tamil suggestions
const tamilSuggestionsMap = {
  // அடிப்படை
  வணக்கம்: [
    "நீங்கள் எப்படி இருக்கிறீர்கள்?",
    "காலை வணக்கம்!",
    "அன்பான நண்பர்!",
  ],
  "தயவு செய்து": [
    "உதவி செய்க.",
    "தண்ணீர் கொடுக்கவும்.",
    "தயவு செய்து திறக்கவும்.",
  ],
  நன்றி: ["உங்களுக்கு நன்றி.", "மிகவும் நன்றி.", "உதவிக்கு நன்றி."],
  ஆம்: ["நான் புரிந்துகொண்டேன்.", "சரி.", "அதுவே சரி."],
  இல்லை: ["நான் விரும்பவில்லை.", "இல்லை.", "சரி அல்ல."],
  மன்னிக்கவும்: [
    "தயவு செய்து மன்னிக்கவும்.",
    "மன்னிக்கவும்.",
    "மன்னிக்க வேண்டுகிறேன்.",
  ],
  நல்லது: ["நன்றாக உள்ளது.", "சரி.", "நன்றாகச் செய்யப்பட்டது."],
  மோசம்: ["இது மோசமானது.", "நிலை மோசம்.", "தகவல் மோசமானது."],
  சரி: ["சரி.", "நன்றாக.", "பரவாயில்லை."],

  // தேவைகள்
  தண்ணீர்: [
    "நான் தண்ணீர் வேண்டும்.",
    "ஒரு பாட்டில் தண்ணீர் தரவும்.",
    "குடிக்க தண்ணீர் வேண்டும்.",
  ],
  உணவு: ["நான் உணவு வேண்டும்.", "சாப்பிட வேண்டும்.", "சில உணவு கொடுக்கவும்."],
  கழிப்பிடம்: [
    "நான் கழிப்பிடத்திற்கு செல்ல வேண்டும்.",
    "கழிப்பிடம் எங்கே?",
    "தவிர்க்க முடியாது.",
  ],
  மருந்து: [
    "மருந்து தேவை.",
    "மருந்து கொடுக்கவும்.",
    "நான் மருந்து எடுத்துக் கொள்ள வேண்டும்.",
  ],
  வலி: ["எனக்கு வலி இருக்கிறது.", "வலி அதிகம்.", "மனசில் வலி."],
  பசிக்கிறது: ["நான் பசிக்கிறேன்.", "சாப்பிட வேண்டும்.", "உணவு வேண்டும்."],
  தாகம்: ["நான் தாகமாக இருக்கிறேன்.", "தண்ணீர் வேண்டும்.", "குடிக்க தண்ணீர்."],
  மலிவு: ["நான் சோர்வாக இருக்கிறேன்.", "ஓய்வு வேண்டும்.", "மலிவு அதிகம்."],
  உறக்கம்: ["நான் தூங்க வேண்டும்.", "சில நேரம் ஓய்வு.", "தூக்கம் வருகிறது."],
  உதவி: [
    "தயவு செய்து உதவி செய்க.",
    "உதவி வேண்டும்.",
    "நீங்கள் உதவி செய்ய முடியுமா?",
  ],

  // செயல்கள்
  திறக்க: ["திறக்கவும்.", "தெருமை திறக்கவும்.", "உடைக்கவும்."],
  மூடு: ["மூடவும்.", "திறப்பை மூடு.", "தெருமை மூடு."],
  கொடு: ["நான் அதைக் கொடுங்கள்.", "கொடுக்கவும்.", "தயவு செய்து கொடுக்கவும்."],
  எடு: ["நான் அதை எடுக்க வேண்டும்.", "எடுக்கவும்.", "தயவு செய்து எடுக்கவும்."],
  வா: ["இருக்கவா?", "வா.", "என்னுடன் வா."],
  போ: ["போ.", "அங்கே போ.", "பள்ளிக்கு போ."],
  உற்கொள்: ["இதை உற்கொள்.", "அதை உற்கொள்.", "பையை உற்கொள்."],
  நின்று: ["நின்று.", "இங்கே நின்று.", "அங்கே நின்று."],
  நிறுத்து: ["இதை நிறுத்து.", "அதை நிறுத்து.", "தொடங்கு நிறுத்து."],
  தொடங்கு: ["தொடங்கு.", "வேலை தொடங்கு.", "மெஷின் தொடங்கு."],

  // மக்கள் / உறவுகள்
  அம்மா: ["அம்மா இங்கே உள்ளார்.", "உதவி செய்க.", "அம்மாவை அழைக்கவும்."],
  அப்பா: ["அப்பா இங்கே உள்ளார்.", "உதவி செய்க.", "அப்பாவை அழைக்கவும்."],
  சகோதர்: ["சகோதர் இங்கே.", "உதவி செய்க.", "அவரை அழைக்கவும்."],
  சகோதரி: ["சகோதரி இங்கே.", "உதவி செய்க.", "அவளை அழைக்கவும்."],
  நண்பர்: ["நண்பர் இங்கே.", "உதவி செய்க.", "அவனை அழைக்கவும்."],
  மருத்துவர்: [
    "மருத்துவர் தேவை.",
    "மருத்துவரை அழைக்கவும்.",
    "மருத்துவர் எங்கே?",
  ],
  ஆசிரியர்: [
    "ஆசிரியர் தேவை.",
    "அவரை அழைக்கவும்.",
    "வகுப்பில் ஆசிரியர் உள்ளார்.",
  ],

  // பொதுவான பொருட்கள்
  தொலைபேசி: [
    "தொலைபேசியை பயன்படுத்த வேண்டும்.",
    "எங்கே தொலைபேசி?",
    "தொலைபேசியை தரவும்.",
  ],
  புத்தகம்: [
    "நான் புத்தகம் வேண்டும்.",
    "புத்தகத்தை எடுக்கவும்.",
    "புத்தகம் எங்கே?",
  ],
  பை: ["பையை எடுக்க வேண்டும்.", "பையை திறக்கவும்.", "பையை கொடுக்கவும்."],
  திறப்பு: ["திறக்கவும்.", "மூடவும்.", "இதை திறக்கவும்."],
  ஒளி: ["ஒளியை ஏற்றவும்.", "ஒளியை அணைக்கவும்.", "ஒளி இருக்கிறது."],
  காற்றாடி: [
    "காற்றாடி இயக்கவும்.",
    "காற்றாடி நிறுத்தவும்.",
    "காற்றாடி வேலை செய்கிறது.",
  ],
  காசி: ["காசி இயக்கவும்.", "காசி நிறுத்தவும்.", "இருக்கிறது."],
  படுக்கை: [
    "படுக்கை தயார்.",
    "படுக்கையில் தூங்கவும்.",
    "படுக்கை சுத்தமாக உள்ளது.",
  ],

  // அவசர / விரைவு வாக்கியங்கள்
  ஆபத்து: ["ஆபத்து உள்ளது!", "உதவி தேவை!", "வெளியே ஓடு!"],
  தீ: ["தீ!", "தீயை அழைக்கவும்!", "தீ அபாயம்!"],
  அழைப்பு: ["அழைப்பு செய்க.", "உதவி அழைக்கவும்.", "மதிப்பீடு செய்யவும்."],
  ஆம்புலன்ஸ்: [
    "ஆம்புலன்ஸ் தேவை.",
    "விரைவில் அழைக்கவும்.",
    "ஆம்புலன்ஸ் வருகிறது.",
  ],
  போலீசார்: ["போலீசார் தேவை.", "அழைக்கவும்.", "உடனே அழைக்கவும்."],

  // உணர்வுகள்
  கவலை: ["கவலைப்படுகிறேன்.", "துயரம்.", "சிக்கலான உணர்வு."],
  மகிழ்ச்சி: ["மகிழ்ச்சி அடைகிறேன்.", "சந்தோஷம்.", "சிரிப்பு வருகிறது."],
  சோகம்: ["துயரம்.", "மனம் கவலை.", "உயிரியல் சோகம்."],
  குழப்பம்: [
    "நான் குழப்பமடைந்தேன்.",
    "சிந்திக்க முடியவில்லை.",
    "பிரச்சனை உள்ளது.",
  ],

  // இடங்கள்
  வீடு: ["வீட்டில்.", "எங்கே வீடு?", "வீடு பாதுகாப்பாக உள்ளது."],
  கழிப்பிடம்: [
    "நான் கழிப்பிடத்திற்கு செல்ல வேண்டும்.",
    "கழிப்பிடம் எங்கே?",
    "நான் விரைவில் செல்ல வேண்டும்.",
  ],
  மருத்துவமனை: [
    "மருத்துவமனை தேவை.",
    "மருத்துவரை அழைக்கவும்.",
    "நான் மருத்துவமனை செல்வேன்.",
  ],
  வகுப்பு: ["வகுப்பில்.", "வகுப்பு எங்கே?", "நான் வகுப்பில் உள்ளேன்."],
  கன்டீன்: ["கன்டீன்.", "உணவு வாங்க.", "நான் கன்டீனுக்கு செல்வேன்."],
  நூலகம்: [
    "நூலகம்.",
    "நூலகத்தில் செல்.",
    "நான் புத்தகங்களை வாசிக்க விரும்புகிறேன்.",
  ],
};

// Fallback TTS using browser
function speakLocal(text, language = "en") {
  if ("speechSynthesis" in window) {
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    if (language === "ta") {
      const v = voices.find(
        (x) => x.lang && x.lang.toLowerCase().startsWith("ta")
      );
      if (v) utter.voice = v;
      utter.lang = "ta-IN";
    } else {
      const v = voices.find(
        (x) => x.lang && x.lang.toLowerCase().startsWith("en")
      );
      if (v) utter.voice = v;
      utter.lang = "en-US";
    }
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  }
}

// Fetch Tamil audio from backend
async function speakTTS(text) {
  try {
    const res = await fetch("http://localhost:3000/api/tts-tamil", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    if (!res.ok) throw new Error("Failed to fetch TTS");
    const data = await res.json();
    if (data.audioContent) {
      const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
      audio.play();
    } else {
      throw new Error(data.error || "No audio returned");
    }
  } catch (err) {
    console.error("Error with Google TTS:", err);
    speakLocal(text, "ta"); // fallback
  }
}

export default function TileBoard({
  categories,
  onTileClick,
  onSOS,
  language = "en",
}) {
  const [suggestions, setSuggestions] = useState([]);

  const handleTileClick = async (t) => {
    if (onTileClick) onTileClick(t);
    if (language === "ta") {
      await speakTTS(t);
      setSuggestions(tamilSuggestionsMap[t] || []);
    } else {
      speakLocal(t, "en");
      setSuggestions(suggestionsMap[t.toLowerCase()] || []);
    }
  };

  const handleSuggestionClick = async (s) => {
    if (onTileClick) onTileClick(s);
    if (language === "ta") {
      await speakTTS(s);
      setSuggestions(tamilSuggestionsMap[s] || []);
    } else {
      speakLocal(s, "en");
      setSuggestions(suggestionsMap[s.toLowerCase()] || []);
    }
  };

  return (
    <section className="tile-section">
      {suggestions.length > 0 && (
        <div className="suggestions">
          <h3>Suggestions</h3>
          <div className="tiles">
            {suggestions.map((s, i) => (
              <button
                key={i}
                className="tile suggestion"
                onClick={() => handleSuggestionClick(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="tile-header">
        <h2>Tap tiles to build a sentence</h2>
        <button className="btn danger" onClick={onSOS}>
          SOS
        </button>
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
  );
}
