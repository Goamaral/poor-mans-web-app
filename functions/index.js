const { https } = require('firebase-functions')
const express = require('express')

const routers = require('./routers')

const app = express()

app.use(express.json())

/* Routers */
for (const path in routers) {
  app.use(`/${path}`, routers[path])
}

module.exports.api = https.onRequest(app)
