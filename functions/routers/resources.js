const router = require('express').Router()

const resourcesController = require('../controllers/resources')

router.post('/', resourcesController.create)
router.get('/', resourcesController.list)
router.get('/:uuid', resourcesController.get)
router.put('/:uuid', resourcesController.update)
router.delete('/:uuid', resourcesController.destroy)

module.exports = router