const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.LoginAuth = (req, res, next) => {
    res.send("Login in");
};

exports.getUserByUsername = (req, res, next) => {
    res.send("Get user by username");
};

exports.Register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const isExists = await User.isExist(username, email);
        if (isExists){
            res.send("User already exists")
        }else{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
    
            let user = new User(username, salt, hashedPassword, email);
    
            user = await user.saveToDatabase();
    
            res.send("Create new user");
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "Something went really wrong",
        });
    }
};