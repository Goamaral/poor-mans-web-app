const resources = require('./resources')

module.exports = {
  resources: new resources.Repository(),
  models: {
    Resource: resources.Model
  }
}
