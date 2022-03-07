import { Database as RealtimeDatabase } from 'firebase-admin/database'

import FirebaseProvider from "./firebase"

export default class RealtimeDatabaseProvider {
  #realtimeDatabase: RealtimeDatabase
  #rootPathParts: Array<string>

  constructor(firebaseProvider: FirebaseProvider, rootPath: string) {
    this.#realtimeDatabase = firebaseProvider.getRealtimeDatabase()
    this.#rootPathParts = rootPath.split('/')
  }

  buildPath (subPath: string): string {
    return this.#rootPathParts.concat(subPath.split('/')).join('/')
  }

  newQuery(): RealtimeDatabase {
    return this.#realtimeDatabase
  }
}