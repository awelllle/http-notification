const router = require('express').Router()
const controller = require('./controller')

router.post('/subscribe/:topic', controller.subscribe)
router.post('/publish/:topic', controller.publish)

module.exports = router
