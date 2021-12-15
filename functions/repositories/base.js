const _ = require('lodash')

class BaseModel {
  constructor (attributes = {}, publicFields = []) {
    Object.assign(this, attributes)
    this.publicFields = publicFields
  }

  toJSON () {
    const json = this.publicFields.length > 0 ? _.pick(this, this.publicFields) : this
    delete json.publicFields
    return json
  }
}
module.exports.Model = BaseModel

class BaseRepository {
  constructor (tableName, Model = BaseModel, Driver) {
    this.table = new Driver(tableName, Model)
  }
}
module.exports.Repository = BaseRepository
