const { check, validationResult } = require('express-validator')

exports.validate = [
    check('username').trim().isString().isLength({min: 5}).withMessage('Username is too short'),
    check('password').isLength({min: 6}).withMessage('Password is too short'),
    check('email').isString().isLength({min: 5}).isEmail().withMessage('Wrong email adress')
]

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({success: false, message: errors})
    }
    next()
}