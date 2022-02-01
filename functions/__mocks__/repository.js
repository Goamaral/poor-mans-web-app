const _ = require('lodash')

const NotFoundError = require('../errors/not_found')

class MockModel {}
module.exports.Model = MockModel

class MockTable {
  constructor () {
    this.data = {}
    this.idCounter = 0
  }

  get nextId () {
    return ++this.idCounter
  }

  get rows () {
    return _.values(this.data)
  }

  insert (resource) {
    resource.uuid = `UUID_${this.nextId}`
    this.data[resource.uuid] = resource
    return resource
  }

  list (filters) {
    return _.filter(this.rows, filters)
  }

  get (filters) {
    return _.find(this.rows, filters)
  }

  update (uuid, resource) {
    this.data[uuid] = resource
  }

  destroy (uuid) {
    delete this.data[uuid]
  }
}

module.exports.Repository = class MockRepository {
  constructor () {
    this.MOCK_TABLE = new MockTable()
  }

  async insert (resource) {
    return new Promise(resolve => {
      resource = this.MOCK_TABLE.insert(resource)
      resolve({ uuid: resource.uuid })
    })
  }

  async list (filters) {
    return new Promise(resolve => {
      resolve(
        this.MOCK_TABLE.findAll(filters).map(r => new MockModel(r))
      )
    })
  }

  async get (filters) {
    return new Promise((resolve, reject) => {
      const resource = this.MOCK_TABLE.findOne(filters)

      if (resource) {
        resolve(new MockModel(resource))
      } else {
        reject(new NotFoundError())
      }
    })
  }

  async update (filters, updates) {
    return new Promise(resolve => {
      const resources = this.MOCK_TABLE.findAll(filters)
      if (resources.length > 0) {
        resources.forEach(r => this.MOCK_TABLE.update(r.uuid, { ...r, ...updates }))
      }
      resolve()
    })
  }

  async destroy (filters) {
    return new Promise(resolve => {
      const resources = this.MOCK_TABLE.findAll(filters)
      if (resources.length > 0) {
        resources.forEach(r => this.MOCK_TABLE.destroy(r.uuid))
      }
      resolve()
    })
  }
}
