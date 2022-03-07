export class CacheEntry {
  key: string
  value: any
  expiresAt: Date

  constructor(key: string, value: any, expiresAt: Date) {
    this.key = key
    this.value = value
    this.expiresAt = expiresAt
  }
}

export default abstract class AbstractCache {
  abstract set(key: string, value: any, expiresAt?: Date): Promise<CacheEntry>

  async get(key: string) {
    return (await this.getEntry(key)).value
  }

  abstract getEntry(key: string): Promise<CacheEntry>
}