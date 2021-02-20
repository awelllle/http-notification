let router = require('express').Router();
let controller = require('./controller');


router.post('/subscribe/:topic', controller.subscribe);
router.post('/publish/:topic', controller.publish);

module.exports = router;