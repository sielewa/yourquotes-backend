const express = require('express');
const controller = require('../controllers/userController');
const authToken = require('../authToken/authToken')
const router = express.Router();

router.post('/register', controller.register);
router.post('/signIn', controller.signIn);
router.post('/auth', authToken)

module.exports = router;