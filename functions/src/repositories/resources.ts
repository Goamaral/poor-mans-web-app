import FirebaseProvider from '../providers/firebase'
import AbstractFirestoreRepository, { FirestoreEntity } from './providers/abstract_firestore'

export class Resource extends FirestoreEntity {}

export default class ResourcesRepository extends AbstractFirestoreRepository {
  constructor(firebaseProvider: FirebaseProvider) {
    super(firebaseProvider, 'resources')
  }
}
