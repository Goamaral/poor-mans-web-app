const nconf = require('nconf')

require('dotenv').config({ path: './secrets/.env' })

nconf.env('__')

nconf.defaults({
  firebase: {
    project_id: '',
    auth_domain: '',
    api_key: '<FIREBASE_API_KEY>',
    database_url: 'http://localhost:9000/?ns=poor-mans-web-app',
    storage_bucket: ''
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
