const { check, header, validationResult } = require('express-validator')

exports.validateLogin = [
    check('username').notEmpty().withMessage('Username is empty'),
    check('password').notEmpty().withMessage('Password is empty')
]

exports.validateAuthToken = [
    header('authorization').notEmpty().isString().withMessage('Wrong authorization token')
]

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({success: false, message: errors})
    }
    next()
}