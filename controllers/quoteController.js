const User = require('../models/User');
const Quote = require('../models/Quote');

exports.getByPagination = async (req, res, next) => {
	try {
		const { page, limit } = req.query;
		const intPage = parseInt(page);
		const intLimit = parseInt(limit);
		const offset = (page - 1) * intLimit;
		const results = await Quote.getByPagination(offset, intLimit);
		const nextPage = intPage + 1;
		const prevPage = intPage - 1;
		//if (prevPage === 0) { prevPage = null }
		const count = await Quote.getCountOfQuotes();
		const totalPages = Math.round(count.count / intLimit);
		const pagination = {
			nextPage: nextPage,
			prevPage: prevPage,
			totalPages: totalPages,
			perPage: intLimit
		}
		res.status(200).json({ quotes: results, pagination: pagination });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
};

exports.getQuotes = async (req, res, next) => {
	try {
		const quotes = await Quote.getQuotes();
		res.status(200).json({ quotes: quotes });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
}

exports.addQuote = async (req, res, next) => {
	try {
		const { text } = req.body;
		let user = await User.getByUsername(req.user);
		let quote = new Quote(text, user['id']);
		quote = await quote.saveToDatabase();
		res.status(201).json({ message: 'The Quote has been added' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
};

exports.deleteQuote = async (req, res, next) => {
	try {
		const idQuote = req.params.id;
		Quote.delById(idQuote);
		res.status(200).json({ message: 'Delete successful' });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
}
