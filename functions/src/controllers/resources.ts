import ResourcesRepository from '../repositories/resources'
import AbstractCrudController from './abstract_crud'
import wrapController from './wrap_controller'

export default class ResourcesController extends AbstractCrudController {
  constructor(resourcesRepository: ResourcesRepository) {
    super(resourcesRepository)
  }
}

export const newResourcesController = (resourcesRepository: ResourcesRepository): ResourcesController => {
  return wrapController(new ResourcesController(resourcesRepository)) as ResourcesController
}