const config = require('../config/config')

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body
        const user = await User.getByUsername(username)
        if (user != null){
            const salt = user['salt']
            let hashedPassword = await bcrypt.hash(password, salt)
            if (hashedPassword === user['password']){
                const accessToken = jwt.sign(username, config.access_token_secret)
                res.json({success: true, accessToken: accessToken})
            }else{
                res.json({success: false, message: 'Wrong password'})
            }
        }else{
            res.json({success: false, message: 'User doesnt exists'})
        }
    } catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        })
    }
}

exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.json({success:false, message: 'A token is required for authentication'})
    const decoded = jwt.verify(token, config.access_token_secret, (err, user) => {
        if (err) return res.json({success:false, message: 'Invalid token'})
        req.user = user
        next()
    })
}

exports.auth = (req, res, next) => {
    return res.status(200).json({success: true})
}