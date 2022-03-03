const express = require('express')
const controller = require('../controllers/authController')
const validator = require('../validators/authValidator')
const checkValidator = require('../validators/checkValidator')
const router = express.Router()

router.post('/signin', validator.validateLogin, checkValidator.checkValidation, controller.signIn)
router.post('/', validator.validateAuthToken, checkValidator.checkValidation, controller.authToken, controller.auth)

module.exports = router