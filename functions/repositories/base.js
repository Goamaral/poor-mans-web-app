const _ = require('lodash')
const { ref, set, get } = require('firebase/database')
const { v4: uuidv4 } = require('uuid')

const { db } = require('../firebase')

class BaseModel {
  constructor (publicFields = []) {
    this.publicFields = publicFields
  }

  toJSON () {
    return _.pick(this, this.publicFields)
  }
}
module.exports.Model = BaseModel

class FirebaseTable {
  constructor (tableName, Model) {
    this.tableName = tableName
    this.Model = Model
  }

  /* PRIVATE */
  async _set (uuid, value) {
    return set(ref(db, `${this.tableName}/${uuid}`), value)
  }

  async _get (uuid) {
    return get(ref(db, `${this.tableName}/${uuid}`))
  }

  /* PUBLIC */
  async create (record) {
    record.uuid = uuidv4()
    await this._set(record.uuid, record)
    return record.uuid
  }

  async list (filters) {
    throw new Error('Not implemented')
    // return records.map(r => Object.assign(new this.Model(), r))
  }

  async get (filters) {
    throw new Error('Not implemented')
    // return Object.assign(new this.Model(), record)
  }

  async update (filters, updates) {
    throw new Error('Not implemented')
  }

  async destroy (filters) {
    throw new Error('Not implemented')
  }
}

class BaseRepository {
  constructor (tableName, Model = BaseModel) {
    this.db = new FirebaseTable(tableName, Model)
  }
}
module.exports.Repository = BaseRepository
