const express = require('express');
const controller = require('../controllers/userController');
const validator = require('../validators/userValidator');
const checkValidator = require('../validators/checkValidator');
const router = express.Router();

router.post('/', validator.validate, checkValidator.checkValidation, controller.register);
router.get('/:username', controller.getUser);

module.exports = router;
