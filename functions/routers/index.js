const router = require('express').Router()

const resourcesRouter = require('./resources')

router.use('/resources', resourcesRouter)

module.exports = router
