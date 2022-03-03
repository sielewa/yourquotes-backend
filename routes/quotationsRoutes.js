const express = require('express')
const controller = require('../controllers/quoteController')
const authController = require('../controllers/authController')
const validator = require('../validators/quoteValidator')
const checkValidator = require('../validators/checkValidator')
const router = express.Router()

router.get('/', validator.validateQuery, checkValidator.checkValidation, controller.getByPagination)
router.post('/', validator.validateText, checkValidator.checkValidation, authController.authToken, controller.addQuote)

module.exports = router