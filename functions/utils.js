const _ = require('lodash')
const { logger } = require('firebase-functions')

const { INTERNAL_SERVER_ERROR } = require('./codes')
const config = require('./config')
const HttpError = require('./errors/http_error')

module.exports = {
  // Wrap controller object method calls to catch errors and send an error response to the client
  wrapController (target) {
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

              if (err instanceof HttpError) {
                status = err.status
              } else {
                logger.error('Uncaught', err.stack)
              }

              if (config.env === 'production') {
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
}
