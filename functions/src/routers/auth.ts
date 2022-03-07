import { Router } from 'express'

import newAuthController from '../controllers/auth'
import authMiddleware from '../middleware/auth'
import AuthService from '../services/auth'

export type AuthRouter = Router

// New auth router
export default (authService: AuthService): AuthRouter => {
  const router = Router()
  const controller = newAuthController(authService)

  router.post('/register', controller.register)
  router.post('/login', controller.login)

  router.use(authMiddleware)
  router.post('/logout', controller.logout)

  return router
}