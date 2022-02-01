const router = require('express').Router()

const resourcesController = require('../controllers/resources')

router.post('/', resourcesController.create)
router.get('/', resourcesController.index)
router.get('/:uuid', resourcesController.show)
router.put('/:uuid', resourcesController.update)
router.delete('/:uuid', resourcesController.destroy)

module.exports = router
