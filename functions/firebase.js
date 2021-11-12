const { initializeApp } = require('firebase/app')
const { getDatabase } = require('firebase/database')

const config = require('./config')

const firebaseConfig = {
  apiKey: config.firebase.api_key,
  authDomain: config.firebase.auth_domain,
  databaseURL: config.firebase.database_url,
  storageBucket: config.firebase.storage_bucket
}

const app = initializeApp(firebaseConfig)
module.exports.app = app
module.exports.db = getDatabase(app)
