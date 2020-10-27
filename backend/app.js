require('dotenv').config()

const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const routes = require('./routes')
const bodyParser = require('body-parser')

const creds = {
  user: process.env.DB_USER,
  pass: process.env.DB_PASS,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dbName: process.env.DB_NAME,
  query: process.env.DB_QUERY,
}

mongoose.connect(
  `mongodb://${creds.user}:${creds.pass}@${creds.host}:${creds.port}/${creds.dbName}?${creds.query}`,
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
).then(() => {
  const app = express()
  app.use(cors())
  app.use(bodyParser.json())
  app.use('/app', express.static(__dirname + '/app'))
  app.use('/', routes)
  app.listen({ port: 4000, host: '0.0.0.0' }, () =>
    console.log(`🚀 Server ready at http://localhost:4000`)
  );
})