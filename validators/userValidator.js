const { check } = require('express-validator');

exports.validate = [
	check('username').matches(/^[A-Za-z0-9]/).withMessage('Special characters is not allowed for username'),
	check('username').isLength({ min: 5 }).withMessage('Username is too short (min: 5 letters)'),
	check('password').isLength({ min: 6 }).withMessage('Password is too short (min: 6 letters)'),
	check('email').isString().isLength({ min: 5 }).isEmail().withMessage('Wrong email adress')
];
