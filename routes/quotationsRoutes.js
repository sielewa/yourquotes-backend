const express = require('express');
const controller = require('../controllers/quoteController');
const usercontroller = require('../controllers/userController')
const router = express.Router();

router.get('/', controller.getAllQuotations)
router.post('/add',  usercontroller.authenticateToken, controller.addQuote)

module.exports = router;