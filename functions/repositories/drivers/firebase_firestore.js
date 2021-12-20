const { v4: uuidv4 } = require('uuid')
const _ = require('lodash')

const { NotFoundError } = require('../../errors')
const { firestore } = require('../../firebase')

class FirebaseFirestoreDriver {
  constructor (tableName, Model) {
    this.tableName = tableName
    this.Model = Model
    this.collection = firestore.collection(tableName)
  }

  /* PRIVATE */
  _where (filters, query = this.collection) {
    for (const key in filters) {
      if (_.isArray(filters[key])) {
        query = query.where(key, 'in', filters[key])
      } else {
        query = query.where(key, '==', filters[key])
      }
    }
    return query
  }

  /* PUBLIC */
  async create (record) {
    record.uuid = uuidv4()
    await this.collection.doc(record.uuid).set(record)
    return record.uuid
  }

  async list (filters) {
    const snapshot = await this._where(filters).get()
    if (snapshot.empty) throw new NotFoundError()

    return snapshot.docs.map(doc => new this.Model(doc.data()))
  }

  async get (filters) {
    const snapshot = await this._where(filters).get()
    if (snapshot.empty) throw new NotFoundError()

    return new this.Model(snapshot.docs[0].data())
  }

  async update (filters, updates) {
    await firestore.runTransaction(async t => {
      const snapshot = await this._where(filters, t._firestore.collection(this.tableName)).get()
      await Promise.all(snapshot.docs.map(async doc => await doc.ref.update(updates)))
    })
  }

  async destroy (filters) {
    await firestore.runTransaction(async t => {
      const snapshot = await this._where(filters, t._firestore.collection(this.tableName)).get()
      await Promise.all(snapshot.docs.map(async doc => await doc.ref.delete()))
    })
  }
}

module.exports = FirebaseFirestoreDriver
