const { check, header, cookie } = require('express-validator');

exports.validateLogin = [
	check('username').notEmpty().withMessage('Username is empty'),
	check('password').notEmpty().withMessage('Password is empty')
];

exports.validateAuthToken = [
	header('authorization').notEmpty().isString().withMessage('Wrong authorization token')
];

exports.validateLogout = [
	cookie('refresh_token').notEmpty().withMessage('Refresh token is empty')
];

exports.validateRefreshToken = [
	cookie('refresh_token').notEmpty().withMessage('Refresh token is empty')
];
