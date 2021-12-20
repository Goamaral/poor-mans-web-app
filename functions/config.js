const nconf = require('nconf')

require('dotenv').config({ path: './secrets/.env' })

nconf.env('__')

nconf.defaults({
  firebase: {
    project_id: '<FIREBASE_PROJECT_ID>',
    auth_domain: '<FIREBASE_AUTH_DOMAIN>',
    api_key: '<FIREBASE_API_KEY>',
    database_url: '<FIREBASE_DATABASE_URL></FIREBASE_DATABASE_URL>',
    firebase__storage_bucket: '<FIREBASE_STORAGE_BUCKET>'
  },
  cookie: {
    secret: '<COOKIE_SECRET>'
  }
})

const config = nconf.get()

module.exports = {
  env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  ...config
}
