import FirebaseProvider from '../providers/firebase'
import ResourcesRepository from './resources'

export interface RepositoryLayerInterface {
  resources: ResourcesRepository;
}

// New repository layer
export default (firebaseProvider: FirebaseProvider): RepositoryLayerInterface => {
  return {
    resources: new ResourcesRepository(firebaseProvider),
  }
}