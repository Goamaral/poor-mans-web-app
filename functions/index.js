const { https } = require('firebase-functions')
const express = require('express')
const cookieParser = require('cookie-parser')

const config = require('./config')
const routers = require('./routers')

const app = express()

app.use(express.json())
app.use(cookieParser(config.cookie.secret))

/* Routers */
for (const path in routers) {
  app.use(`/${path}`, routers[path])
}

module.exports.api = https.onRequest(app)
