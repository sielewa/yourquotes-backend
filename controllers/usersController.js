const User = require('../models/User')
const bcrypt = require('bcrypt')

exports.register = async (req, res, next) => {
    try{
        const { username, password, email } = req.body
        const isExists = await User.isExist(username, email)
        if(isExists){
            res.status(400).json({message: 'User with this usernamer or email already exists'})
        } else{
            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt)
            let user = new User(username, salt, hashedPassword, email)
            user = await user.saveToDatabase()
            res.status(201).json({message: 'User has been created'})
        }
    } catch(e){
        console.log(e)
        res.status(500).json({message: 'Something went wrong from backend'})
    }
}
