const { check, header } = require('express-validator')

exports.validateLogin = [
    check('username').notEmpty().withMessage('Username is empty'),
    check('password').notEmpty().withMessage('Password is empty')
]

exports.validateAuthToken = [
    header('authorization').notEmpty().isString().withMessage('Wrong authorization token')
]
