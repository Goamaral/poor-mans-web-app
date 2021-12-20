const nconf = require('nconf')
require('dotenv').config()

nconf.defaults({
  firebase: {
    api_key: '<FIREBASE_API_KEY>'
  },
  cookie: {
    secret: '<COOKIE_SECRET>'
  }
})
nconf.env('__')

const config = nconf.get()

module.exports = {
  env: process.env.NODE_ENV,
  isProduction: process.env.NODE_ENV === 'production',
  ...config
}
