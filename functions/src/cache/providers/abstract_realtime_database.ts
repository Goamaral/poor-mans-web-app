import FirebaseProvider from '../../providers/firebase'
import RealtimeDatabaseProvider from '../../providers/realtime_database'
import AbstractCache, { CacheEntry } from "../abstract"
import logger from '../../logger'

export default abstract class AbstractRealtimeDatabaseCache extends AbstractCache {
  protected provider: RealtimeDatabaseProvider

  constructor(firebaseProvider: FirebaseProvider, rootPath: string) {
    super()
    this.provider = new RealtimeDatabaseProvider(firebaseProvider, rootPath)
  }

  async set(key: string, value: any, expiresAt?: Date): Promise<CacheEntry> {
    const entry = new CacheEntry(key, value, expiresAt || new Date())
    return await this.provider.newQuery().ref(this.provider.buildPath(key)).set(entry)
  }

  async getEntry(key: string): Promise<CacheEntry> {
    const entry = await this.provider.newQuery().ref(this.provider.buildPath(key)).get()
    // TODO: test what is returned
    logger.debug(entry)
    // Object.assign(new CacheEntry('', null, new Date()), entry)
    return Promise.resolve(new CacheEntry('', null, new Date()))
  }
}