const { https } = require('firebase-functions')
const express = require('express')

const routers = require('./routers')

const app = express()

app.use(express.json())

app.use('/', routers)

module.exports.api = https.onRequest(app)
