const express = require('express')
const controller = require('../controllers/authController')
const router = express.Router()

router.post('/login', controller.signIn)
router.post('/', controller.authToken, controller.auth)

module.exports = router