const router = require('express').Router()

const authController = require('../controllers/auth')
const authMiddleware = require('../middleware/auth')

router.post('/register', authController.register)
router.post('/login', authController.login)

router.use(authMiddleware)
router.post('/logout', authController.logout)

module.exports = router
