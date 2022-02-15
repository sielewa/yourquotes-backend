require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

exports.loginAuth = async (req, res, next) => {
    const { username, password } = req.body;
    const user = await User.getByUsername(username);
    if (user != null){
        const jsonSalt = await User.getSalt(username);
        const salt = jsonSalt['salt'];
        hashedPassword = await bcrypt.hash(password, salt);
        jsonPassword = await User.getPassword(username);
        if ( hashedPassword === jsonPassword['password']){
            const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
            res.json({accessToken: accessToken});
        }else{
            res.send("Wrong password");
        }
    }else{
        res.send("User doesnt exists");
    }
};

exports.getUserByUsername = (req, res, next) => {
    res.send("Get user by username");
};
