import { Request, Response, CookieOptions } from 'express'

import { CREATED, NO_CONTENT } from '../codes'
import config from '../config'
import logger from '../logger'
import AuthService from '../services/auth'
import AbstractController from './abstract'
import wrapController from './wrap_controller'

const cookieOptions: CookieOptions = {
  httpOnly: true,
  signed: true,
  secure: config.isProduction
}

export class AuthController extends AbstractController {
  #authService: AuthService
  
  constructor(authService: AuthService) {
    super()
    this.#authService = authService
  }

  // Register
  async register({ req, res }: {req: Request, res: Response}) {
    await this.#authService.register({
      email: req.body.email,
      password: req.body.password
    })

    const userCredential = await this.#authService.login(req.body.email, req.body.password)
    logger.debug(userCredential)

    res.cookie('auth', JSON.stringify('stsTokenManager'), cookieOptions)
    res.sendStatus(CREATED)
  }

  // Login
  async login({ req, res }: { req: Request, res: Response }) {
    const userCredential = await this.#authService.login(req.body.email, req.body.password)
    logger.debug(userCredential)

    res.cookie('auth', JSON.stringify('stsTokenManager'), cookieOptions)
    res.sendStatus(NO_CONTENT)
  }

  // Logout
  async logout({ res }: { res: Response }) {
    try {
      res.clearCookie('auth')
      await this.#authService.logout(res.locals.userClaims.user_id)
    } catch (err) {
      logger.warn(String(err))
    }

    res.sendStatus(NO_CONTENT)
  }
}

// New auth controller
export default (authService: AuthService): AuthController => wrapController(new AuthController(authService)) as AuthController