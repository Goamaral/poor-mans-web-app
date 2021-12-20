const _ = require('lodash')
const { logger } = require('firebase-functions')

const { INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../../codes')
const config = require('../../config')
const BaseError = require('../../errors/base')

// FirebaseAuth error code to http code
// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Error
const firebaseAuthErrorMap = {
  'auth/email-already-exists': BAD_REQUEST
}

// Wrap controller object method calls to catch errors and send an error response to the client
module.exports = target => {
  return new Proxy(target, {
    get (target, propertyKey) {
      const originalProperty = Reflect.get(target, propertyKey).bind(target)
      let property = originalProperty

      // Wrap if getting a public function
      if (_.isFunction(originalProperty) && !propertyKey.match(/_.*/)) {
        property = async (req, res, next) => {
          try {
            await originalProperty({ req, res, next })
          } catch (err) {
            let status = INTERNAL_SERVER_ERROR
            let caught = false

            // Known errors
            if (err instanceof BaseError) {
              status = err.httpStatus
              caught = true
            }

            // FirebaseAuth errors
            if (err.constructor.name === 'FirebaseAuthError') {
              if (firebaseAuthErrorMap[err.code]) {
                status = firebaseAuthErrorMap[err.code]
                caught = true
              }
            }

            if (!caught) {
              logger.error('Uncaught', err.stack)
            }

            if (config.isProduction) {
              res.sendStatus(status)
            } else {
              res.status(status).json({ error: err.message })
            }
          }
        }
      }

      return property
    }
  })
}
