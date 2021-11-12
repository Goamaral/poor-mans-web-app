const { Repository: BaseRepository, Model: BaseModel } = require('./base')

class CrudModel extends BaseModel {}
module.exports.Model = CrudModel

module.exports.Repository = class CrudRepository extends BaseRepository {
  constructor (tableName, Model = CrudModel) {
    super(tableName, Model)
  }

  async create (resource) {
    const uuid = await this.db.create(resource)
    return { uuid }
  }

  async list (filters = {}) {
    return await this.db.list(filters)
  }

  async get (filters = {}) {
    return await this.db.get(filters)
  }

  async update (filters, updates) {
    await this.db.update(filters, updates)
  }

  async destroy (filters) {
    await this.db.destroy(filters)
  }
}
