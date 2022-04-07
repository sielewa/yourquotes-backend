const express = require('express')
const controller = require('../controllers/authController')
const validator = require('../validators/authValidator')
const checkValidator = require('../validators/checkValidator')
const router = express.Router()

router.post('/login', validator.validateLogin, checkValidator.checkValidation, controller.login)
router.post('/', validator.validateAuthToken, checkValidator.checkValidation, controller.authToken, controller.auth)
router.post('/logout', validator.validateLogout, checkValidator.checkValidation, controller.logout)
router.post('/refreshToken', validator.validateRefreshToken, checkValidator.checkValidation, controller.refreshToken)
router.get('/me', controller.authMe)

module.exports = router