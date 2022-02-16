require('dotenv').config();

const jwt = require('jsonwebtoken');

const authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.json({success:false, message: "A token is required for authentication"})
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.json({success:false, message: "Invalid token"})
        req.user = user
        next()
    })
}

module.exports = authToken