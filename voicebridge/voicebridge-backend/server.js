// backend/server.js
/*require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const textToSpeech = require('@google-cloud/text-to-speech')
const fs = require('fs')
const util = require('util')
*/
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const textToSpeech = require('@google-cloud/text-to-speech')

const User = require('./models/User')
const Appointment = require('./models/Appointment')

const app = express()
app.use(cors({ origin: 'http://localhost:5173' })) // <-- allow your frontend
app.use(express.json())

// Set Google credentials
if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '/google-credentials.json'
}
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.error(err))

// Nodemailer transporter (optional)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT || 587,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

// Auth middleware
const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ error: 'No auth token' })
  const token = authHeader.split(' ')[1]
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}
// Signup
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  try {
    const existing = await User.findOne({ email })
    if (existing) return res.status(400).json({ error: 'Email already used' })
    const hash = await bcrypt.hash(password, 10)
    const user = new User({ name, email, password: hash })
    await user.save()
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ error: 'Invalid credentials' })
    const ok = await bcrypt.compare(password, user.password)
    if (!ok) return res.status(400).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Appointment endpoint (requires auth)
app.post('/api/appointment', auth, async (req, res) => {
  const { reason, date, time, message, doctorEmail, userEmail } = req.body
  if (!doctorEmail || !date || !time) return res.status(400).json({ error: 'Missing required fields' })
  try {
    const appointment = new Appointment({
      user: req.user.id,
      userEmail: userEmail || '',
      doctorEmail,
      reason,
      date,
      time,
      notes: message || ''
    })
    await appointment.save()

    const mailOpts = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: doctorEmail,
      subject: `New Appointment Request - ${date} ${time}`,
      text: `Hello,

You have received a new appointment request.

Patient: ${userEmail || 'Unknown'}
Reason: ${reason}
Date: ${date}
Time: ${time}

Notes:
${message || 'None'}

Please reply to this email or login to the system to respond.

Thank you.`
    }

    transporter.sendMail(mailOpts, (err, info) => {
      if (err) {
        console.error('Mail error', err)
        return res.status(500).json({ error: 'Failed to send email' })
      }
      res.json({ ok: true, info })
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Server error' })
  }
})

// Google TTS endpoint for Tamil
app.post('/api/tts-tamil', async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Text is required' })

  const client = new textToSpeech.TextToSpeechClient()
  const request = {
    input: { text },
    voice: { languageCode: 'ta-IN', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' }
  }

  try {
    const [response] = await client.synthesizeSpeech(request)
    res.json({ audioContent: response.audioContent.toString('base64') })
  } catch (err) {
    console.error('TTS Error:', err)
    res.status(500).json({ error: 'Failed to get Tamil audio.' })
  }
})

// Test
app.get('/', (req, res) => res.send('VoiceBridge Backend running!'))

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))