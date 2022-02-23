const express = require('express')
const controller = require('../controllers/userController')
const validator = require('../validators/userValidator')
const router = express.Router()

router.post('/register', validator.validate, validator.checkValidation,controller.register)

module.exports = router