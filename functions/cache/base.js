module.exports.Cache = class BaseCache {
  constructor (rootPath, DriverClass) {
    this.driver = new DriverClass(rootPath)
  }

  async set (key, value, expiresAt = new Date()) {
    await this.driver.set(key, value, expiresAt)
  }

  async get (key) {
    return await this.driver.get(key)
  }
}
