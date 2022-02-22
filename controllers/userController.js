const config = require('../config/config')

const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body
        const isExists = await User.isExist(username, email)
        if (isExists){
            res.json({success: false, message: 'User with this usernamer or email already exists'})
        }else{
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            let user = new User(username, salt, hashedPassword, email)
            try{
                user = await user.saveToDatabase()
                res.json({success: true, message: 'User has been created'})
            } catch(err){
                res.json({success: false, message: err})
            }
        }
    } catch(e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        });
    }
};

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
            res.json({success: false, message: 'User doesnt exists'});
        }
    } catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        });
    }
};

exports.auth = (req, res, next) => {
    return res.status(200).json({success: true})
}