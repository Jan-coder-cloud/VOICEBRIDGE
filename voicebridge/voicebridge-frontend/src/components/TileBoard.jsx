// import React, { useState } from 'react'

// const categories = [
//   { name: 'Basics', tiles: ['Hello', 'Please', 'Thank you', 'Yes', 'No', 'Sorry', 'Good', 'Bad', 'Okay'] },
//   { name: 'Needs', tiles: ['Water', 'Food', 'Toilet', 'Medicine', 'Pain', 'Hungry', 'Thirsty', 'Tired', 'Sleep', 'Help'] },
//   { name: 'Actions', tiles: ['Open', 'Close', 'Give', 'Take', 'Come', 'Go', 'Sit', 'Stand', 'Stop', 'Start'] },
//   { name: 'People / Relations', tiles: ['Mother', 'Father', 'Brother', 'Sister', 'Friend', 'Doctor', 'Teacher'] },
//   { name: 'Common Objects', tiles: ['Phone', 'Book', 'Bag', 'Door', 'Light', 'Fan', 'Chair', 'Bed'] },
//   { name: 'Emergency / Quick Phrases', tiles: ['Danger', 'Fire', 'Call', 'Ambulance', 'Police'] },
//   { name: 'Feelings', tiles: ['Anxious', 'Happy', 'Sad', 'Confused'] },
//   { name: 'Places', tiles: ['Home','RestRoom','Clinic', 'Class', 'Canteen', 'Library'] },
// ]
// const suggestionsMap = {
//   hello: ['how are you?', 'good morning!', 'dear friend!'],
//   food: ['would like some rice.', 'can I have some bread?', 'please give me milk.'],
//   water: ['is needed.', 'will be available?', 'please give me a bottle.'],
//   pain: ['is unbearable.', 'is in my stomach.', 'in my head.'],
//   help: ['me, please.', 'is needed now.', 'can you help?'],
//   need: ['help.', 'water.', 'food.', 'rest.'],
//   hungry: ['I want some food.', 'Can I eat something?', 'Need to eat.'],
//   thirsty: ['I want water.', 'Can I have a drink?', 'Need a drink.'],
//   tired: ['Need rest.', 'Want to sleep.', 'Feeling exhausted.'],
//   sleep: ['I want to sleep.', 'Need some rest.', 'Time to sleep.'],
//   toilet: ['is needed.', 'Can I go?', 'Where is it?'],
//   medicine: ['is needed.', 'Please give me medicine.', 'Do I have any?'],
//   mother: ['is here.', 'Can help me.', 'Please call her.'],
//   father: ['is here.', 'Can help me.', 'Please call him.'],
//   brother: ['is here.', 'Can help me.', 'Please call him.'],
//   sister: ['is here.', 'Can help me.', 'Please call her.'],
//   friend: ['is here.', 'Can help me.', 'Please call my friend.'],
//   doctor: ['is needed.', 'Call the doctor.', 'Where is the doctor?'],
//   teacher: ['is needed.', 'Call the teacher.', 'Where is the teacher?'],
//   phone: ['is needed.', 'Where is it?', 'Can I use it?'],
//   book: ['is needed.', 'Where is it?', 'Can I take it?'],
//   bag: ['is needed.', 'Where is it?', 'Can I take it?'],
//   door: ['Open it.', 'Close it.', 'Where is it?'],
//   light: ['Turn it on.', 'Turn it off.', 'It is bright.'],
//   fan: ['Turn it on.', 'Turn it off.', 'It is noisy.'],
//   chair: ['Sit on it.', 'Move it.', 'I need it.'],
//   bed: ['I want to sleep on it.', 'It is comfortable.', 'Make it.'],
//   danger: ['There is danger!', 'Help, danger!', 'Run from danger!'],
//   fire: ['There is fire!', 'Call fire department!', 'Fire is dangerous!'],
//   call: ['the police.', 'an ambulance.', 'for help.'],
//   ambulance: ['is needed.', 'Please call quickly.', 'It is on the way.'],
//   police: ['is needed.', 'Call immediately.', 'Where are they?'],
//   open: ['the door.', 'the window.', 'the bag.'],
//   close: ['the door.', 'the window.', 'the bag.'],
//   give: ['me water.', 'me food.', 'me medicine.'],
//   take: ['this.', 'that.', 'the bag.'],
//   come: ['here.', 'with me.', 'to the room.'],
//   go: ['there.', 'to school.', 'to home.'],
//   sit: ['on the chair.', 'here.', 'there.'],
//   stand: ['up.', 'here.', 'there.'],
//   stop: ['this.', 'now.', 'immediately.'],
//   start: ['the work.', 'the machine.', 'the game.'],
//   please: ['help me.', 'give me water.', 'open the door.'],
//   thank: ['you.', 'you very much.', 'for your help.'],
//   yes: ['I understand.', 'I agree.', 'that is fine.'],
//   no: ['I cannot.', 'I don’t want.', 'that is not okay.'],
//   sorry: ['for that.', 'I am sorry.', 'please forgive me.'],
//   good: ['morning.', 'job.', 'day.'],
//   bad: ['situation.', 'news.', 'experience.'],
//   okay: ['I understand.', 'that is fine.', 'thank you.'],
// }


// function speak(text) {
//   if ('speechSynthesis' in window) {
//     const utter = new window.SpeechSynthesisUtterance(text)
//     window.speechSynthesis.speak(utter)
//   }
// }
// export default function TileBoard({ onTileClick, onSOS }) {
//   const [suggestions, setSuggestions] = useState([])
//   const handleTileClick = (t) => {
//     if (onTileClick) onTileClick(t)
//     speak(t)

//     const key = t.toLowerCase()
//     if (suggestionsMap[key]) setSuggestions(suggestionsMap[key])
//     else setSuggestions([])
//   }


//   const handleSuggestionClick = (s) => {
//     if (onTileClick) onTileClick(s)
//     speak(s)

//     const key = s.toLowerCase()
//     if (suggestionsMap[key]) setSuggestions(suggestionsMap[key])
//     else setSuggestions([])
//   }


//   return (
//     <section className="tile-section">
      
//       {suggestions.length > 0 && (
//         <div className="suggestions">
//           <h3>Suggestions</h3>
//           <div className="tiles">
//             {suggestions.map((s, i) => (
//               <button
//                 key={i}
//                 className="tile suggestion"
//                 onClick={() => handleSuggestionClick(s)}
//               >
//                 {s}
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       <div className="tile-header">
//         <h2>Tap tiles to build a sentence</h2>
//         <button className="btn danger" onClick={onSOS}>SOS</button>
//       </div>

//       {categories.map((cat, i) => (
//         <div key={i} className="category">
//           <h3>{cat.name}</h3>
//           <div className="tiles">
//             {cat.tiles.map((t, idx) => (
//               <button
//                 key={idx}
//                 className="tile"
//                 onClick={() => handleTileClick(t)}
//                 aria-label={`Insert word ${t}`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </div>
//       ))}
//     </section>
//   )
// }

import React, { useState } from 'react'

const suggestionsMap = {
  hello: ['how are you?', 'good morning!', 'dear friend!'],
  food: ['would like some rice.', 'can I have some bread?', 'please give me milk.'],
  water: ['is needed.', 'will be available?', 'please give me a bottle.'],
  pain: ['is unbearable.', 'is in my stomach.', 'in my head.'],
  help: ['me, please.', 'is needed now.', 'can you help?'],
  need: ['help.', 'water.', 'food.', 'rest.'],
  hungry: ['I want some food.', 'Can I eat something?', 'Need to eat.'],
  thirsty: ['I want water.', 'Can I have a drink?', 'Need a drink.'],
  tired: ['Need rest.', 'Want to sleep.', 'Feeling exhausted.'],
  sleep: ['I want to sleep.', 'Need some rest.', 'Time to sleep.'],
  toilet: ['is needed.', 'Can I go?', 'Where is it?'],
  medicine: ['is needed.', 'Please give me medicine.', 'Do I have any?'],
  mother: ['is here.', 'Can help me.', 'Please call her.'],
  father: ['is here.', 'Can help me.', 'Please call him.'],
  brother: ['is here.', 'Can help me.', 'Please call him.'],
  sister: ['is here.', 'Can help me.', 'Please call her.'],
  friend: ['is here.', 'Can help me.', 'Please call my friend.'],
  doctor: ['is needed.', 'Call the doctor.', 'Where is the doctor?'],
  teacher: ['is needed.', 'Call the teacher.', 'Where is the teacher?'],
  phone: ['is needed.', 'Where is it?', 'Can I use it?'],
  book: ['is needed.', 'Where is it?', 'Can I take it?'],
  bag: ['is needed.', 'Where is it?', 'Can I take it?'],
  door: ['Open it.', 'Close it.', 'Where is it?'],
  light: ['Turn it on.', 'Turn it off.', 'It is bright.'],
  fan: ['Turn it on.', 'Turn it off.', 'It is noisy.'],
  chair: ['Sit on it.', 'Move it.', 'I need it.'],
  bed: ['I want to sleep on it.', 'It is comfortable.', 'Make it.'],
  danger: ['There is danger!', 'Help, danger!', 'Run from danger!'],
  fire: ['There is fire!', 'Call fire department!', 'Fire is dangerous!'],
  call: ['the police.', 'an ambulance.', 'for help.'],
  ambulance: ['is needed.', 'Please call quickly.', 'It is on the way.'],
  police: ['is needed.', 'Call immediately.', 'Where are they?'],
  open: ['the door.', 'the window.', 'the bag.'],
  close: ['the door.', 'the window.', 'the bag.'],
  give: ['me water.', 'me food.', 'me medicine.'],
  take: ['this.', 'that.', 'the bag.'],
  come: ['here.', 'with me.', 'to the room.'],
  go: ['there.', 'to school.', 'to home.'],
  sit: ['on the chair.', 'here.', 'there.'],
  stand: ['up.', 'here.', 'there.'],
  stop: ['this.', 'now.', 'immediately.'],
  start: ['the work.', 'the machine.', 'the game.'],
  please: ['help me.', 'give me water.', 'open the door.'],
  thank: ['you.', 'you very much.', 'for your help.'],
  yes: ['I understand.', 'I agree.', 'that is fine.'],
  no: ['I cannot.', 'I don’t want.', 'that is not okay.'],
  sorry: ['for that.', 'I am sorry.', 'please forgive me.'],
  good: ['morning.', 'job.', 'day.'],
  bad: ['situation.', 'news.', 'experience.'],
  okay: ['I understand.', 'that is fine.', 'thank you.'],
}


function speak(text) {
  if ('speechSynthesis' in window) {
    const utter = new window.SpeechSynthesisUtterance(text)
    window.speechSynthesis.speak(utter)
  }
}

export default function TileBoard({ categories, onTileClick, onSOS }) {
  const [suggestions, setSuggestions] = useState([])

  const handleTileClick = (t) => {
    if (onTileClick) onTileClick(t)
    speak(t)

    const key = t.toLowerCase()
    setSuggestions(suggestionsMap[key] || [])
  }

  const handleSuggestionClick = (s) => {
    if (onTileClick) onTileClick(s)
    speak(s)

    const key = s.toLowerCase()
    setSuggestions(suggestionsMap[key] || [])
  }

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
