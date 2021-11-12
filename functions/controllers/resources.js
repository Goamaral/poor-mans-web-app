const { wrapController } = require('../utils')
const CrudController = require('./crud')
const { resources: resourcesRepository } = require('../repositories')

class ResourcesController extends CrudController {
  constructor () {
    super(resourcesRepository)
  }
}

module.exports = wrapController(new ResourcesController())
