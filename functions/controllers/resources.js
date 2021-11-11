const { wrapController } = require('../utils')
const CrudController = require('./crud')
const { Repository: MockRepository } = require('../repositories/__mocks__/repository')

class ResourcesController extends CrudController {
  constructor() {
    super(new MockRepository())
  }
}

module.exports = wrapController(new ResourcesController())