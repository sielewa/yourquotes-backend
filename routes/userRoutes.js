const express = require('express');
const controller = require('../controllers/userController');
const router = express.Router();

router.post('/register', controller.register);
router.post('/signIn', controller.signIn);
router.post('/auth', controller.authenticateToken)

module.exports = router;