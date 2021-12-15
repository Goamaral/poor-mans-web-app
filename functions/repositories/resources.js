const { Repository: CrudRepository, Model: CrudModel } = require('./crud')
const FirebaseFirestoreDriver = require('./drivers/firebase_firestore')

class Resource extends CrudModel { }
module.exports.Model = Resource

module.exports.Repository = class ResourcesRepository extends CrudRepository {
  constructor () {
    super('resources', Resource, FirebaseFirestoreDriver)
  }
}
