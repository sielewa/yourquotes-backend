const express = require('express')
const controller = require('../controllers/authController')
const validator = require('../validators/authValidator')
const router = express.Router()

router.post('/login', validator.validateLogin, validator.checkValidation, controller.signIn)
router.post('/', validator.validateAuthToken, validator.checkValidation, controller.authToken, controller.auth)

module.exports = router