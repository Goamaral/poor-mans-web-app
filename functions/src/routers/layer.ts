import newResourcesRouter, { ResourcesRouter } from './resources'
import newAuthRouter, { AuthRouter } from './auth'
import { RepositoryLayerInterface } from '../repositories/layer'
import AuthService from '../services/auth'

export interface RouterLayerInterface {
  auth: AuthRouter,
  resources: ResourcesRouter
}

// New router layer
export default (authService: AuthService, repositoryLayer: RepositoryLayerInterface): RouterLayerInterface => {
  return {
    auth: newAuthRouter(authService),
    resources: newResourcesRouter(repositoryLayer.resources)
  }
}