const { getAuth } = require('firebase-admin/auth')

const { CREATED } = require('../codes')
const { app } = require('../firebase')
const wrapController = require('./utils/wrap_controller')

const authService = getAuth(app)

class AuthController {
  // Register user
  async register ({ req, res }) {
    console.log(await authService.createUser({
      email: req.body.email,
      password: req.body.password
    }))

    res.sendStatus(CREATED)
  }
}

module.exports = wrapController(new AuthController())
