// export function speakText(text, language = "en") {
//   if (!("speechSynthesis" in window))
//     return alert("Your browser does not support speech synthesis");

//   const utter = new SpeechSynthesisUtterance(text);
//   const voices = window.speechSynthesis.getVoices();

//   if (language === "ta") {
//     const tamilVoice = voices.find((v) =>
//       v.lang.toLowerCase().startsWith("ta")
//     );
//     if (tamilVoice) utter.voice = tamilVoice;
//     utter.lang = "ta-IN";
//   } else {
//     const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
//     if (enVoice) utter.voice = enVoice;
//     utter.lang = "en-US";
//   }

//   window.speechSynthesis.cancel();
//   window.speechSynthesis.speak(utter);
// }

// export function speakText(text, language = "en") {
//   if (!("speechSynthesis" in window))
//     return alert("Your browser does not support speech synthesis");

//   const speak = () => {
//     const utter = new SpeechSynthesisUtterance(text);
//     const voices = window.speechSynthesis.getVoices();

//     if (language === "ta") {
//       const tamilVoice = voices.find((v) =>
//         v.lang.toLowerCase().startsWith("ta")
//       );
//       if (tamilVoice) utter.voice = tamilVoice;
//       utter.lang = "ta-IN";
//     } else {
//       const enVoice = voices.find((v) => v.lang.toLowerCase().startsWith("en"));
//       if (enVoice) utter.voice = enVoice;
//       utter.lang = "en-US";
//     }

//     window.speechSynthesis.cancel();
//     window.speechSynthesis.speak(utter);
//   };

//   // Voices may not be loaded yet
//   if (window.speechSynthesis.getVoices().length === 0) {
//     window.speechSynthesis.onvoiceschanged = () => speak();
//   } else {
//     speak();
//   }
// }

// src/utils/tamilTTS.js
// export function speakTamil(text) {
//   if (!text) return;
//   if ("speechSynthesis" in window) {
//     const utter = new SpeechSynthesisUtterance(text);
//     const voices = window.speechSynthesis.getVoices();

//     // Try to find a Tamil voice
//     const tamilVoice = voices.find((v) => v.lang && v.lang.startsWith("ta"));
//     if (tamilVoice) {
//       utter.voice = tamilVoice;
//     }
//     utter.lang = "ta-IN"; // Tamil India
//     utter.rate = 1; // adjust speed if needed
//     utter.pitch = 1; // adjust pitch if needed

//     window.speechSynthesis.cancel(); // stop any ongoing speech
//     window.speechSynthesis.speak(utter);
//   } else {
//     alert("Sorry, your browser does not support Tamil TTS.");
//   }
// }

// src/utils/speakTamil.js
export function speakTamil(text) {
  if (!text || !("speechSynthesis" in window)) return;

  const speak = () => {
    const voices = window.speechSynthesis.getVoices();
    const tamilVoice = voices.find((v) => v.lang && v.lang.startsWith("ta"));

    if (!tamilVoice) {
      alert(
        "Tamil voice not found on this device/browser. Please install a Tamil TTS voice."
      );
      return;
    }

    const utter = new SpeechSynthesisUtterance(text);
    utter.voice = tamilVoice;
    utter.lang = "ta-IN";
    utter.rate = 1;
    utter.pitch = 1;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utter);
  };

  // Wait for voices to be loaded
  if (window.speechSynthesis.getVoices().length === 0) {
    window.speechSynthesis.onvoiceschanged = () => speak();
  } else {
    speak();
  }
}
