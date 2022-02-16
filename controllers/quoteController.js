require('dotenv').config();

const User = require('../models/User');
const Quote = require('../models/Quote');


exports.getAllQuotations = async (req, res, next) => {
    res.send('hello')
};

exports.addQuote = async (req, res, next) => {
    try{
        const { userid, quoteText } = req.body
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        let quote = new Quote(quoteText, userid, date)
        try{
            quote = await quote.saveToDatabase()
            res.json({success:true,message:'The Quote has been added'})
        } catch(err){
            return({success:false, message:err})
        }
    } catch(e) {
        console.log(e);
        res.status(500).json({
            success:false,
            message: "Something went really wrong",
        })
    }
};