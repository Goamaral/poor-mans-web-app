const { realtimeDatabase } = require('../../../firebase')

class FirebaseRealtimeDatabaseDriver {
  constructor (rootPath = '') {
    if (rootPath === '') {
      this.rootPathParts = []
    } else {
      this.rootPathParts = rootPath.split('/')
    }
  }

  /* PRIVATE */
  _buildPath (subPath) {
    return this.rootPathParts.concat(subPath.split('/')).join('/')
  }

  /* PUBLIC */
  async set (subPath, value, expiresAt) {
    const entry = { value, expiresAt }
    await realtimeDatabase.ref(this._buildPath(subPath)).set(entry)
    return entry
  }

  async get (subPath) {
    const entry = await realtimeDatabase.ref(this._buildPath(subPath)).get()
    console.log(entry)
    return entry.value
  }
}

module.exports = FirebaseRealtimeDatabaseDriver
