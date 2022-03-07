import FirebaseProvider from "../providers/firebase"
import AbstractRealtimeDatabaseCache from "./providers/abstract_realtime_database"

export default class ResourcesCache extends AbstractRealtimeDatabaseCache {
  constructor (firebaseProvider: FirebaseProvider) {
    super(firebaseProvider, 'resources')
  }
}
