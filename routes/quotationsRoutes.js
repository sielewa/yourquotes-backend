const express = require('express')
const controller = require('../controllers/quoteController')
const authController = require('../controllers/authController')
const router = express.Router()

router.get('/', controller.getByPagination)
router.post('/add',  authController.authToken, controller.addQuote)

module.exports = router