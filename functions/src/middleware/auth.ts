import { Request, Response, NextFunction } from 'express'

import AuthService from '../services/auth'
import { UNAUTHORIZED } from '../codes'
import logger from '../logger'

// Verify if user is authenticated
// If it is, fetch user and add it to the request object
// If not return unauthenticated error response
export default (authService: AuthService) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken } = JSON.parse(req.signedCookies.auth || '{}')

    try {
      res.locals.userClaims = await authService.authenticate(accessToken)
      next()
    } catch (err) {
      logger.warn(String(err))
      res.status(UNAUTHORIZED).json({ error: 'Authentication required' })
    }
  }
}
