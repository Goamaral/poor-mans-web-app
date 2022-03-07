import * as _ from 'lodash'

import FirebaseProvider from './firebase'
import { CollectionReference, DocumentData, Firestore, Transaction } from 'firebase-admin/firestore'

export default class FirestoreProvider {
  #firestore: Firestore
  #collection: CollectionReference<DocumentData>

  constructor(firebaseProvider: FirebaseProvider, collectionPath: string) {
    this.#firestore = firebaseProvider.getFirestore()
    this.#collection = this.#firestore.collection(collectionPath)
  }

  newQuery(): CollectionReference<DocumentData> {
    return this.#collection 
  }

  async newTransaction(updateFunction: (transaction: Transaction) => Promise<unknown>) {
    await this.#firestore.runTransaction(updateFunction)
  }
}