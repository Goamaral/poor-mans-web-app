import Entity from './abstract'

export type AbstractCrudFilter = { [key: string]: any }

export default interface CrudRepositoryInterface {
  insert(resource: Entity): Promise<string>
  list(filters?: AbstractCrudFilter): Promise<Array<Entity>>
  get(filters: AbstractCrudFilter): Promise<Entity>
  update(filters: AbstractCrudFilter, updates: Partial<Entity>): void
  destroy(filters: AbstractCrudFilter): void
}