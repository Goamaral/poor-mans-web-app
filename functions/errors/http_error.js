const { INTERNAL_SERVER_ERROR } = require('../codes')

module.exports = class HttpError extends Error {
  constructor(message = 'Internal error', status = INTERNAL_SERVER_ERROR) {
    super(message)
    this.status = status
  }
}