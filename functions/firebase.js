const { initializeApp } = require('firebase-admin/app')

const config = require('./config')

const firebaseConfig = {
  projectId: config.firebase.project_id,
  apiKey: config.firebase.api_key,
  authDomain: config.firebase.auth_domain,
  databaseURL: config.firebase.database_url,
  storageBucket: config.firebase.storage_bucket
}

const app = initializeApp(firebaseConfig)
module.exports.app = app
