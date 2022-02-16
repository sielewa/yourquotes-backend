const express = require('express');
const controller = require('../controllers/quoteController');
const auth = require('../authToken/authToken')
const router = express.Router();

router.get('/', controller.getByPagination)
router.post('/add',  auth, controller.addQuote)

module.exports = router;