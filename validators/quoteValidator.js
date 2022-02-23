const { check, query, validationResult } = require('express-validator')

exports.validateText = [
    check('text').isString().isLength({min: 1}).withMessage('Text is too short'),
]

exports.validateQuery = [
    query('page').isInt().withMessage('Wrong page query'),
    query('limit').isInt().withMessage('Wrong limit query')
]

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.json({success: false, message: errors})
    }
    next()
}
