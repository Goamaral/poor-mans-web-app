import { Router } from 'express'

import { newResourcesController } from '../controllers/resources'
import ResourcesRepository from '../repositories/resources'

export type ResourcesRouter = Router

// New resources repository
export default (resourcesRepository: ResourcesRepository): ResourcesRouter => {
  const router = Router()
  const controller = newResourcesController(resourcesRepository)

  router.post('/', controller.create)
  router.get('/', controller.index)
  router.get('/:uuid', controller.show)
  router.put('/:uuid', controller.update)
  router.delete('/:uuid', controller.destroy)

  return router
}