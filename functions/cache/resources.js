const { Repository: BaseCache } = require('./base')
const FirebaseRealtimeDatabaseDriver = require('../lib/cache/drivers/firebase_realtime_database')

module.exports.Cache = class ResourcesCache extends BaseCache {
  constructor () {
    super('resources', FirebaseRealtimeDatabaseDriver)
  }
}
