const { validationResult } = require('express-validator')

exports.checkValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({message: errors})
    }
    next()
}
