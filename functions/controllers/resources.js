const { resources: resourcesRepository } = require('../repositories')
const CrudController = require('./crud')
const wrapController = require('./utils/wrap_controller')

class ResourcesController extends CrudController {
  constructor () {
    super(resourcesRepository)
  }
}

module.exports = wrapController(new ResourcesController())
