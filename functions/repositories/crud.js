const { Repository: BaseRepository, Model: BaseModel } = require('./base')

class CrudModel extends BaseModel {}
module.exports.Model = CrudModel

module.exports.Repository = class CrudRepository extends BaseRepository {
  constructor (tableName, Model = CrudModel, Driver) {
    super(tableName, Model, Driver)
  }

  async insert (resource) {
    const uuid = await this.table.insert(resource)
    return { uuid }
  }

  async list (filters = {}) {
    return await this.table.list(filters)
  }

  async get (filters = {}) {
    return await this.table.get(filters)
  }

  async update (filters, updates) {
    await this.table.update(filters, updates)
  }

  async destroy (filters) {
    await this.table.destroy(filters)
  }
}
