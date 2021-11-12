const nconf = require('nconf')
require('dotenv').config()

nconf.env('__')

const config = nconf.get()

module.exports = {
  env: process.env.NODE_ENV,
  ...config
}
