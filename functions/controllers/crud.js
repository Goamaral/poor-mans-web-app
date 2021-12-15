const _ = require('lodash')

const { OK, CREATED, NO_CONTENT } = require('../codes')

module.exports = class CrudController {
  constructor (repository, allowedCreateParams = null, allowedUpdateParams = null) {
    this.repository = repository
    this.allowedCreateParams = allowedCreateParams
    this.allowedUpdateParams = allowedUpdateParams
  }

  // Create new resource with req.body
  async create ({ req, res }) {
    const { uuid } = await this.repository.create(this._createParams(req.body))
    res.status(CREATED).json({ uuid })
  }

  // List resources
  async list ({ req, res }) {
    const resources = await this.repository.list(req.body)
    res.status(OK).json(resources)
  }

  // Get resource (uuid: req.params.uuid)
  async get ({ req, res }) {
    const resource = await this.repository.get({ uuid: req.params.uuid })
    res.status(OK).json(resource)
  }

  // Update resource (uuid: req.params.uuid) with req.body
  async update ({ req, res }) {
    await this.repository.update({ uuid: req.params.uuid }, this._updateParams(req.body))
    res.sendStatus(NO_CONTENT)
  }

  // Destroy resource (uuid: req.params.uuid)
  async destroy ({ req, res }) {
    await this.repository.destroy({ uuid: req.params.uuid })
    res.sendStatus(NO_CONTENT)
  }

  /* PRIVATE */
  // Filter create params
  _createParams (params) {
    if (this.allowedCreateParams === null) {
      return params
    } else {
      return _.pick(params, this.allowedCreateParams)
    }
  }

  // Filter update params
  _updateParams (params) {
    if (this.allowedUpdateParams === null) {
      return params
    } else {
      return _.pick(params, this.allowedUpdateParams)
    }
  }
}
