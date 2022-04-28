const { check, query } = require('express-validator');

exports.validateText = [
	check('text').isString().isLength({ min: 1 }).withMessage('Text is too short')
];

exports.validateQuery = [
	query('page').isInt().withMessage('Wrong page query'),
	query('limit').isInt().isLength({ max: 3 }).withMessage('Wrong limit query')
];
