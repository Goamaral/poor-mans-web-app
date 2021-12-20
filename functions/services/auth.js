const { auth } = require('../firebase')

module.exports = {
  // Verify if token was revoked
  async authenticate (acessToken) {
    return await auth.verifyIdToken(acessToken, true)
  },

  /* Proxied */
  register: auth.createUser,
  login: auth.signInWithEmailAndPassword,
  logout: auth.revokeRefreshTokens
}
