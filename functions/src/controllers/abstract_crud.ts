import * as _ from 'lodash'
import { Request, Response } from 'express'

import { OK, CREATED, NO_CONTENT } from '../codes'
import CrudRepositoryInterface, { AbstractCrudFilter } from '../repositories/crud'
import Entity from '../repositories/abstract'
import AbstractController from './abstract'

export default abstract class AbstractCrudController extends AbstractController {
  #allowedCreateParams: Array<string> | undefined
  #allowedUpdateParams: Array<string> | undefined
  #repository: CrudRepositoryInterface

  constructor(repository: CrudRepositoryInterface, allowedCreateParams?: Array<string>, allowedUpdateParams?: Array<string>) {
    super()
    this.#repository = repository
    this.#allowedCreateParams = allowedCreateParams
    this.#allowedUpdateParams = allowedUpdateParams
  }

  // Create new resource with req.body
  async create({ req, res }: { req: Request, res: Response }) {
    const uuid = await this.#repository.insert(new Entity(this._createParams(req.body)))
    res.status(CREATED).json({ uuid })
  }

  // List resources
  async index({ req, res }: { req: Request, res: Response }) {
    const resources = await this.#repository.list(req.body)
    res.status(OK).json(resources)
  }

  // Get resource (uuid: req.params.uuid)
  async show({ req, res }: { req: Request, res: Response }) {
    const resource = await this.#repository.get({ uuid: req.params.uuid })
    res.status(OK).json(resource)
  }

  // Update resource (uuid: req.params.uuid) with req.body
  async update({ req, res }: { req: Request, res: Response }) {
    await this.#repository.update({ uuid: req.params.uuid }, this._updateParams(req.body))
    res.sendStatus(NO_CONTENT)
  }

  // Destroy resource (uuid: req.params.uuid)
  async destroy({ req, res }: { req: Request, res: Response }) {
    await this.#repository.destroy({ uuid: req.params.uuid })
    res.sendStatus(NO_CONTENT)
  }

  /* PRIVATE */
  // Filter create params
  private _createParams(params: Map<string, any>): AbstractCrudFilter {
    if (this.#allowedCreateParams === undefined) {
      return params
    } else {
      return _.pick(params, this.#allowedCreateParams)
    }
  }

  // Filter update params
  private _updateParams(params: Map<string, any>): AbstractCrudFilter {
    if (this.#allowedUpdateParams === undefined) {
      return params
    } else {
      return _.pick(params, this.#allowedUpdateParams)
    }
  }
}
