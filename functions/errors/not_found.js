const BaseError = require('./base')
const { NOT_FOUND } = require('../codes')

module.exports = class NotFoundError extends BaseError {
  constructor (message = 'Not Found') {
    super(message, NOT_FOUND)
  }
}
