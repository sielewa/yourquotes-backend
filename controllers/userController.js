const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try{
        const { username, password, email } = req.body
        const isExists = await User.isExist(username, email)
        if(isExists){
            res.json({success: false, message: 'User with this usernamer or email already exists'})
        } else{
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
    } catch(e){
        console.log(e)
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        })
    }
}
