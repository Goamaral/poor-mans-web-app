import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'
import { CollectionReference, DocumentData, Query } from 'firebase-admin/firestore'

import Entity from "../abstract";
import FirebaseProvider from '../../providers/firebase'
import FirestoreProvider from '../../providers/firestore'
import CrudRepositoryInterface, { AbstractCrudFilter } from '../crud'
import NotFoundError from '../../errors/not_found'

export class FirestoreEntity extends Entity {
  uuid: string = ""
}

export type FirestoreQuery = CollectionReference<DocumentData> | Query<DocumentData>

export default abstract class AbstractFirestoreRepository implements CrudRepositoryInterface {
  protected provider: FirestoreProvider

  constructor(firebaseProvider: FirebaseProvider, collectionName: string) {
    this.provider = new FirestoreProvider(firebaseProvider, collectionName)
  }

  async insert(entity: FirestoreEntity): Promise<string> {
    entity.uuid = uuidv4()
    await this.provider.newQuery().doc(entity.uuid).set(entity)
    return entity.uuid
  }

  async list(filters?: AbstractCrudFilter): Promise<Array<FirestoreEntity>> {
    const snapshot = await this.applyFiltersToQuery(this.provider.newQuery(), filters).get()
    if (snapshot.empty) throw new NotFoundError()

    return snapshot.docs.map(doc => new FirestoreEntity(doc.data()))
  }

  async get(filters: AbstractCrudFilter) {
    const snapshot = await this.applyFiltersToQuery(this.provider.newQuery(), filters).get()
    if (snapshot.empty) throw new NotFoundError()

    return new FirestoreEntity(snapshot.docs[0].data())
  }

  // TODO: Get snapshot inside transaction
  async update(filters: AbstractCrudFilter, updates: Partial<FirestoreEntity>): Promise<void> {
    const snapshot = await this.applyFiltersToQuery(this.provider.newQuery(), filters).get()
    await this.provider.newTransaction(async tx => {
      await Promise.all(snapshot.docs.map(async doc => await tx.update(doc.ref, updates)))
    })
  }

  // TODO: Get snapshot inside transaction
  async destroy(filters: AbstractCrudFilter): Promise<void> {
    const snapshot = await this.applyFiltersToQuery(this.provider.newQuery(), filters).get()
    await this.provider.newTransaction(async tx => {
      await Promise.all(snapshot.docs.map(async doc => await tx.delete(doc.ref)))
    })
  }

  /* PROTECTED */
  protected applyFiltersToQuery(query: FirestoreQuery, filters?: AbstractCrudFilter): Query<DocumentData> {
    query = query.where('', 'not-in', []) // TODO: Test if no filters are passed, all entities are returned
    for (const key in filters) {
      if (_.isArray(filters[key])) {
        query = query.where(key, 'in', filters[key])
      } else {
        query = query.where(key, '==', filters[key])
      }
    }

    return query
  }
}