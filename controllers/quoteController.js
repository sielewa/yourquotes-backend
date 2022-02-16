require('dotenv').config();

const User = require('../models/User');
const Quote = require('../models/Quote');

exports.getByPagination = async (req, res, next) => {
    try{
        const { page, limit } = req.query
        const startIndex = (page - 1) * limit
        const endIndex = page * limit
        try{
            const results = await Quote.findByDateDesc()
            const pagination = results.slice(startIndex, endIndex)
            res.json({success:true, results: pagination})
        } catch(err){
            res.json({success:false, message: err})
        }
    } catch(e){
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went really wrong",
        })
    }
};

exports.addQuote = async (req, res, next) => {
    try{
        const { quoteText } = req.body
        let user = await User.getByUsername(req.user)
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        let quote = new Quote(quoteText, user['id'], date)
        try{
            quote = await quote.saveToDatabase()
            res.json({success:true,message:'The Quote has been added'})
        } catch(err){
            res.json({success:false, message:err})
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went really wrong",
        })
    }
};
