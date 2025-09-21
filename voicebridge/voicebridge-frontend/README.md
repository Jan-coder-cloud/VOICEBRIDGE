# VoiceBridge – Frontend (Vite + React)

A clean, accessible UI demonstrating non-verbal communication via a tile board with Web Speech API Text-to-Speech.

## Features
- Tile-based sentence builder
- Text-to-Speech with voice/rate/pitch controls
- SOS modal to speak an emergency request
- Appointment page that speaks the request summary
- Responsive, modern UI

## Getting Started
```bash
# 1) Extract the zip
# 2) Install dependencies
npm install

# 3) Run dev server
npm run dev

# 4) Build for production
npm run build
npm run preview
```

> Notes
- TTS uses the browser's Web Speech API (`window.speechSynthesis`). Available voices vary by OS and browser.
- No backend is included. Integrate Firebase for persistence and alerts as next steps.
