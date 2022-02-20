const express = require('express')
const path = require('path')
const cookieSession = require('cookie-session')
const createError = require('http-errors')

const FeedbackService = require('./services/FeedbackService')
const SpeakerService = require('./services/SpeakerService')

const feedbackService = new FeedbackService('./data/feedback.json')
const speakerService = new SpeakerService('./data/speakers.json')

const routes = require('./routes')

const app = express()

const port = 3000

// Enable for production, when using reverse proxy
//app.set('trust proxy', 1)

app.use(
  cookieSession({
    name: 'session',
    keys: ['abcd', '1234']
  })
)

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.locals.siteName = 'Manvinder Demo 1'

app.use(express.static(path.join(__dirname, './static')))

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames()
    res.locals.speakerNames = names
    return next()
  } catch (err) {
    return next(err)
  }
})

app.use(
  '/',
  routes({
    feedbackService,
    speakerService
  })
)

app.use((req, res, next) => {
  return next(createError(404, 'File Not Found'))
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  const status = err.status || 500
  res.locals.status = status
  res.status(status)
  res.render('error')
  return next()
})

app.listen(port, () => {
  console.log(`express server started on port ${port}`)
})
