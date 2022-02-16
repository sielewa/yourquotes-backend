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
        console.log(quoteText)
        let quote = new Quote(quoteText, userid, date)
        quote = await quote.saveToDatabase()
        res.send('The Quote has been added')
    } catch(e) {
        console.log(e);
        res.status(500).json({
            message: "Something went really wrong",
        })
    }
};