const express = require('express')
const controller = require('../controllers/quoteController')
const authController = require('../controllers/authController')
const validator = require('../validators/quoteValidator')
const router = express.Router()

router.get('/', validator.validateQuery, validator.checkValidation, controller.getByPagination)
router.post('/add', validator.validateText, validator.checkValidation, authController.authToken, controller.addQuote)

module.exports = router