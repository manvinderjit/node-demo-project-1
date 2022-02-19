const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

const routes = require('./routes')

const app = express()

const port = 3000

// Enable for production, when using reverse proxy
app.set('trust proxy', 1)

app.use(
  cookieSession({
    name: 'session',
    keys: ['abcd', '1234']
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, './static')))

app.use(
  '/',
  routes({
    feedbackService,
    speakerService
  })
)

app.listen(port, () => {
  console.log(`express server started on port ${port}`)
})