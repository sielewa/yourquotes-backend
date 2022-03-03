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
                res.status(200).json({accessToken: accessToken})
            }else{
                res.status(401).json({message: 'Wrong password'})
            }
        }else{
            res.status(401).json({message: 'User doesnt exists'})
        }
    } catch(e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong from backend'})
    }
}

exports.authToken = (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(400).json({message: 'A token is required for authentication'})
    const decoded = jwt.verify(token, config.access_token_secret, (err, user) => {
        if (err) return res.status(401).json({message: 'Invalid token'})
        req.user = user
        next()
    })
}

exports.auth = (req, res, next) => {
    return res.status(200).json({success: true})
}
