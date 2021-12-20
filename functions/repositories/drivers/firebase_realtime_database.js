const { v4: uuidv4 } = require('uuid')

const { realtimeDatabase } = require('../../firebase')
const NotImplementedError = require('../../errors/not_implemented')

class FirebaseRealtimeDatabaseDriver {
  constructor (tableName, Model) {
    this.tableName = tableName
    this.Model = Model
  }

  /* PRIVATE */
  async _set (uuid, value) {
    return await realtimeDatabase.ref(`${this.tableName}/${uuid}`).set(value)
  }

  async _get (uuid) {
    return await realtimeDatabase.ref(`${this.tableName}/${uuid}`).get()
  }

  /* PUBLIC */
  async create (record) {
    record.uuid = uuidv4()
    await this._set(record.uuid, record)
    return record.uuid
  }

  async list (filters) {
    throw new NotImplementedError()
    // return records.map(r => new this.Model(r))
  }

  async get (filters) {
    throw new NotImplementedError()
    // return new this.Model(record)
  }

  async update (filters, updates) {
    throw new NotImplementedError()
  }

  async destroy (filters) {
    throw new NotImplementedError()
  }
}

module.exports = FirebaseRealtimeDatabaseDriver
