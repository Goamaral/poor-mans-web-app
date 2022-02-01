module.exports.Driver = class MockDriver {
  constructor (rootPath = '') {
    if (rootPath === '') {
      this.rootPathParts = []
    } else {
      this.rootPathParts = rootPath.split('/')
    }
    this.MOCK = {}
  }

  /* PRIVATE */
  _buildPath (subPath) {
    return this.rootPathParts.concat(subPath.split('/')).join('/')
  }

  /* PUBLIC */
  async set (subPath, value, expiresAt) {
    return new Promise(resolve => {
      const entry = { value, expiresAt }
      this.MOCK[this._buildPath(subPath)] = { value, expiresAt }
      resolve(entry)
    })
  }

  async get (subPath) {
    return new Promise(resolve => {
      console.log(this.MOCK[this._buildPath(subPath)])
      resolve(this.MOCK[this._buildPath(subPath)].value)
    })
  }
}
