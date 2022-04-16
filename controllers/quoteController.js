const User = require('../models/User')
const Quote = require('../models/Quote')

exports.getByPagination = async (req, res, next) => {
    try{
        const { page, limit } = req.query
        const offset = (page - 1) * limit
        const results = await Quote.getByPagination(offset, limit)
        res.status(200).json({quotations: results})
    } catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong from backend'})
    }
};

exports.addQuote = async (req, res, next) => {
    try{
        const { text } = req.body
        let user = await User.getByUsername(req.user)
        let quote = new Quote(text, user['id'])
        quote = await quote.saveToDatabase()
        res.status(201).json({message: 'The Quote has been added'})  
    } catch(err){
        console.log(err);
        res.status(500).json({message: 'Something went wrong from backend'})
    }
};

exports.deleteQuote = async (req, res, next) => {
    try{
        const idQuote = req.params.id
        let quote = Quote.delById(idQuote)
        res.status(200).json({message: 'Delete successful'})
    } catch(err){
        console.log(err)
        res.status(500).json({message: 'Something went wrong from backend'})
    }
}
