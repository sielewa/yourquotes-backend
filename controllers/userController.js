require('dotenv').config();

const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res, next) => {
    try {
        const { username, password, email } = req.body;

        const isExists = await User.isExist(username, email);
        if (isExists){
            res.json({success:false, message:"User is already exists"})
        }else{
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            let user = new User(username, salt, hashedPassword, email);
            user = await user.saveToDatabase();
            res.json({success:true, message:"User has been created"})
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went really wrong",
        });
    }
};

exports.signIn = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.getByUsername(username);
        if (user != null){
            const jsonSalt = await User.getSalt(username);
            const salt = jsonSalt['salt'];
            hashedPassword = await bcrypt.hash(password, salt);
            jsonPassword = await User.getPassword(username);
            if (hashedPassword === jsonPassword['password']){
                const accessToken = jwt.sign(username, process.env.ACCESS_TOKEN_SECRET);
                res.json({success:true, accessToken: accessToken});
            }else{
                res.json({success:false, message:"Wrong password"})
            }
        }else{
            res.json({success:false, message:"User doesnt exists"});
        }
    } catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went really wrong",
        });
    }
};

exports.auth = (req, res, next) => {
    return res.status(200).json({success:true})
}