const { INTERNAL_SERVER_ERROR } = require('../codes')

module.exports = class BaseError extends Error {
  constructor (message = 'Internal Server Error', httpStatus = INTERNAL_SERVER_ERROR) {
    super(message)
    this.httpStatus = httpStatus
  }
}
