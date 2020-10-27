const dns = require('dns')
const { nanoid } = require('nanoid')
const express = require('express')
const router = express.Router()
const { Entry, Text } = require('./models')

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

router.post('/api/new', (req, res) => {
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

router.get('/api/:short_id', (req, res) => {
  const shortId = req.params.short_id

  checkIfShortIdExists(shortId)
    .then(doc => {
      if (doc === null) return res.send('Uh oh. We could not find a link at that URL')
      try {
        res.redirect(doc.original_url)
      } catch (error) {
        return res.status(400).send(['uhhhh unknown error while redirecting?', error].join(' '))
      }
    })
    .catch(() => {
      return res.status(400).send('uhhhh unknown error?')
    })
})

// router.get('/', (req, res) => {
//   res.redirect('/app')
// })





router.post('/api/text/new', (req, res) => {
  Text.findOneAndUpdate({ text: req.body.text },
    {
      $setOnInsert: {
        text: req.body.text,
        short_id: nanoid(7),
      },
    },
    {
      returnOriginal: false,
      upsert: true,
    }
  ).then(result => {
    res.json({
      text: result.text,
      short_id: result.short_id,
    })
  })
  .catch(err => {
    return res.status(400).send({ error: 'failed to shorten' });
  })
})

const checkIfShortTextExists = (code) => Text.findOne({ short_id: code })

router.get('/api/text/:short_id', (req, res) => {
  const shortId = req.params.short_id

  checkIfShortTextExists(shortId)
    .then(doc => {
      if (doc === null) return res.status(400).send('Uh oh. We could not find any text there')
      try {
        res.send(doc.text)
      } catch (error) {
        return res.status(400).send(['uhhhh unknown error while', error].join(' '))
      }
    })
    .catch(() => {
      return res.status(400).send('uhhhh unknown error?')
    })
})

module.exports = router