const { Repository: CrudRepository, Model: CrudModel } = require('./crud')

class ResourcesModel extends CrudModel { }
module.exports.Model = ResourcesModel

module.exports.Repository = class ResourcesRepository extends CrudRepository {
  constructor () {
    super('resources', ResourcesModel)
  }
}
