const { CREATED, NO_CONTENT } = require('../codes')
const config = require('../config')
const logger = require('../logger')
const authService = require('../services/auth')
const wrapController = require('./utils/wrap_controller')

const cookieOptions = {
  httpOnly: true,
  signed: true,
  secure: config.isProduction
}

class AuthController {
  // Register
  async register ({ req, res }) {
    const x = await authService.register({
      email: req.body.email,
      password: req.body.password
    })

    console.log('USER', x)

    const { user: { stsTokenManager } } = await authService.login(req.body.email, req.body.password)
    res.cookie('auth', JSON.stringify(stsTokenManager), cookieOptions)
    res.sendStatus(CREATED)
  }

  // Login
  async login ({ req, res }) {
    const { user: { stsTokenManager } } = await authService.login(req.body.email, req.body.password)
    res.cookie('auth', JSON.stringify(stsTokenManager), cookieOptions)
    res.sendStatus(NO_CONTENT)
  }

  // Logout
  async logout ({ req, res }) {
    try {
      res.clearCookie('auth')
      await authService.logout(req.userClaims.user_id)
    } catch (err) {
      logger.warn(err.toString())
    }

    res.sendStatus(NO_CONTENT)
  }
}

module.exports = wrapController(new AuthController())
