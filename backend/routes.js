const dns = require('dns')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()
const { Entry } = require('./models')

const shortenURL = (url) => {
  return Entry.findOneAndUpdate({ original_url: url },
    {
      $setOnInsert: {
        original_url: url,
        short_id: nanoid(7),
      },
    },
    {
      returnOriginal: false,
      upsert: true,
    }
  )
}

router.post('/new', (req, res) => {
  let originalUrl;
  try {
    originalUrl = new URL(req.body.url);
  } catch (err) {
    return res.status(400).send({ error: 'invalid URL' });
  }

  dns.lookup(originalUrl.hostname, (err) => {
    if (err) {
      return res.status(404).send({ error: 'Address not found' })
    }
    shortenURL(originalUrl.href)
      .then(result => {
        res.json({
          original_url: result.original_url,
          short_id: result.short_id,
        })
      })
      .catch(err => {
        return res.status(400).send({ error: 'failed to shorten' });
      })
  })
})

const checkIfShortIdExists = (code) => Entry.findOne({ short_id: code })

router.get('/:short_id', (req, res) => {
  const shortId = req.params.short_id

  checkIfShortIdExists(shortId)
    .then(doc => {
      if (doc === null) return res.send('Uh oh. We could not find a link at that URL')
      res.redirect(doc.original_url)
    })
    .catch(console.error)
})

module.exports = router