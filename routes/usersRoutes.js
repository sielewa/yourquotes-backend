const express = require('express')
const controller = require('../controllers/usersController')
const validator = require('../validators/userValidator')
const checkValidator = require('../validators/checkValidator')
const router = express.Router()

router.post('/', validator.validate, checkValidator.checkValidation, controller.register)

module.exports = router