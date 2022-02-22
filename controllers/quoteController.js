const User = require('../models/User')
const Quote = require('../models/Quote')

exports.getByPagination = async (req, res, next) => {
    try{
        const { page, limit } = req.query
        const offset = (page - 1) * limit
        const results = await Quote.getByPagination(offset, limit)
        res.json({success: true, results: results})
    } catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        })
    }
};

exports.addQuote = async (req, res, next) => {
    try{
        const { text } = req.body
        let user = await User.getByUsername(req.user)
        let quote = new Quote(text, user['id'])
        quote = await quote.saveToDatabase()
        res.json({success: true, message: 'The Quote has been added'})
    } catch(e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: 'Something went really wrong',
        })
    }
};
