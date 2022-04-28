const { check } = require('express-validator');

exports.validate = [
  check('username').trim().isString().isLength({ min: 5 }).withMessage('Username is too short'),
	check('password').isLength({ min: 6 }).withMessage('Password is too short'),
	check('email').isString().isLength({ min: 5 }).isEmail().withMessage('Wrong email adress')
];
