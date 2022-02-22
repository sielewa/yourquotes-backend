const config = require('../config/config')

const jwt = require('jsonwebtoken')

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.json({success:false, message: 'A token is required for authentication'})
    const decoded = jwt.verify(token, config.access_token_secret, (err, user) => {
        if (err) return res.json({success:false, message: 'Invalid token'})
        req.user = user
        next()
    })
}

module.exports = authToken