import * as _ from 'lodash'
import { Request, Response, NextFunction } from 'express'

import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../codes'
import config from '../config'
import logger from '../logger'
import AbstractController from './abstract'
import AbstractError from '../errors/abstract'

type ErrorMap = { [key: string]: number }

// FirebaseAuth error code to http code
// https://firebase.google.com/docs/reference/js/v8/firebase.auth.Error
const firebaseAuthErrorMap: ErrorMap = {
  'auth/email-already-exists': BAD_REQUEST
}

// Wrap controller object method calls to catch errors and send an error response to the client
export default (target: AbstractController): AbstractController => {
  return new Proxy(target, {
    get (target, propertyKey) {
      const originalProperty = Reflect.get(target, propertyKey).bind(target)
      let property = originalProperty

      // Wrap if getting a public function
      if (_.isFunction(originalProperty) && !propertyKey.toString().match(/_.*/)) {
        property = async (req: Request, res: Response, next: NextFunction) => {
          try {
            await originalProperty({ req, res, next })
          } catch (err: any) {
            let status = INTERNAL_SERVER_ERROR
            let caught = false

            // Known errors
            if (err instanceof AbstractError) {
              status = err.httpStatus
              caught = true
            }

            // FirebaseAuth errors
            if (err.constructor.name === 'FirebaseAuthError') {
              const firebaseAuthError: {code: string} = Object.assign({}, err)
              if (firebaseAuthErrorMap[firebaseAuthError.code]) {
                status = firebaseAuthErrorMap[firebaseAuthError.code]
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
