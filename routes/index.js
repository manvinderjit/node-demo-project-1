const express = require('express')

const speakersRoute = require('./speakers')
const feedbackRoute = require('./feedback')

const router = express.Router()

module.exports = (params) => {

  const { speakerService } = params;

  router.get('/', async (req, res) => {
    /*if (!req.session.visitcount) {
      req.session.visitcount = 0
    }
    req.session.visitcount += 1
    console.log(`Total webpage visits ${req.session.visitcount}`)*/
    const topSpeakers = await speakerService.getList();    

    res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers })
  })

  router.use('/speakers', speakersRoute(params))

  router.use('/feedback', feedbackRoute(params))

  return router
}
