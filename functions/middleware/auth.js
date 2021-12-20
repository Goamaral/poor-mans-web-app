const authService = require('../services/auth')
const { UNAUTHORIZED } = require('../codes')
const logger = require('../logger')

// Verify if user is authenticated
// If it is, fetch user and add it to the request object
// If not return unauthenticated error response
module.exports = async (req, res, next) => {
  const { accessToken } = JSON.parse(req.signedCookies.auth || '{}')

  try {
    req.userClaims = await authService.authenticate(accessToken)
    next()
  } catch (err) {
    logger.warn(err.toString())
    res.status(UNAUTHORIZED).json({ error: 'Authentication required' })
  }
}
