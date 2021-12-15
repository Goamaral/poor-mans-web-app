const BaseError = require('./base')
const { NOT_IMPLEMENTED } = require('../codes')

module.exports = class NotImplementedError extends BaseError {
  constructor (message = 'Not Implemented') {
    super(message, NOT_IMPLEMENTED)
  }
}
