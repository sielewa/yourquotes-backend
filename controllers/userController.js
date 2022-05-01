const User = require('../models/User');
const Quote = require('../models/Quote');
const bcrypt = require('bcrypt');

exports.register = async (req, res, next) => {
	try {
		const { username, password, email } = req.body;
		const isExists = await User.isExist(username, email);
		if (isExists) {
			res.status(401).json({ message: 'User with this usernamer or email already exists' });
		} else {
			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			let user = new User(username, salt, hashedPassword, email);
			user = await user.saveToDatabase();
			res.status(201).json({ message: 'User has been created' });
		}
	} catch (e) {
		console.log(e);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
}

exports.getUser = async (req, res, next) => {
	try {
		const username = req.params.username;
		const user = await User.getByUsername(username);
		const quotes = await Quote.getByUserId(user.id);
		let count = quotes.length;
		const userResponse = {
			username: username,
			quotes_count: count,
			quotes: quotes
		}
		res.status(200).json({ user: userResponse });
	} catch (err) {
		console.log(err);
		res.status(500).json({ message: 'Something went wrong from backend' });
	}
}
