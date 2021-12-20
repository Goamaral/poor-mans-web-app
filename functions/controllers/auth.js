const { CREATED, NO_CONTENT } = require('../codes')
const authService = require('../services/auth')
const wrapController = require('./utils/wrap_controller')
const config = require('../config')

const cookieOptions = {
  httpOnly: true,
  signed: true,
  secure: config.isProduction
}

class AuthController {
  // Register user
  async register ({ req, res }) {
    await authService.register({
      email: req.body.email,
      password: req.body.password
    })

    const { user: { stsTokenManager } } = await authService.login(req.body.email, req.body.password)
    res.cookie('auth', JSON.stringify(stsTokenManager), cookieOptions)
    res.sendStatus(CREATED)
  }

  // Login user
  async login ({ req, res }) {
    const { user: { stsTokenManager } } = await authService.login(req.body.email, req.body.password)
    res.cookie('auth', JSON.stringify(stsTokenManager), cookieOptions)
    res.sendStatus(NO_CONTENT)
  }
}

module.exports = wrapController(new AuthController())
