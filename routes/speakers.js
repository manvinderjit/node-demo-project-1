const express = require('express')

const router = express.Router()

module.exports = (params) => {
  const { speakerService } = params

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList()
      const artwork = await speakerService.getAllArtwork()

      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        artwork
      })
    } catch (err) {
      return next(err)
    }
  })

  router.get('/:speakerId', async (req, res, next) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.speakerId)
      const artwork = await speakerService.getArtworkForSpeaker(
        req.params.speakerId
      )
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers-detail',
        speaker,
        artwork
      })
    } catch (err) {
      return next(err)
    }
  })

  return router
}
