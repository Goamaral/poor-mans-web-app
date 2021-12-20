const { auth } = require('../firebase')

module.exports = {
  /* Proxied */
  register: auth.createUser,
  login: auth.signInWithEmailAndPassword
}
