const config = require('../config/config');
const redisRefreshToken = require('../redis/redis');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.login = async (req, res, next) => {
	try {
		const { username, password } = req.body;
		const user = await User.getByUsername(username);
		if (user != null) {
			const salt = user['salt'];
			let hashedPassword = await bcrypt.hash(password, salt);
			if (hashedPassword === user['password']) {

				const { accessToken, refreshToken } = await User.generateTokenPairs(username);
				redisRefreshToken.set(refreshToken, username);

				res.cookie('access_token', accessToken, {
					expires: new Date(Date.now() + 300000),
					path: '/'
				});

				res.cookie('refresh_token', refreshToken, {
					httpOnly: true,
					expires: new Date(Date.now() + 604800000),
					path: '/'
				});

				return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
			} else {
				return res.status(401).json({ message: 'Wrong password' });
			}
		} else {
			res.status(401).json({ message: 'User doesnt exists' });
		}
	} catch (e) {
		console.log(e);
		return res.status(500).json({ message: 'Something went wrong from backend' });
	}
}

exports.logout = async (req, res, next) => {
	const refreshToken = await req.cookies['refresh_token'];
	await redisRefreshToken.del(refreshToken);
	res.clearCookie('access_token');
	res.clearCookie('refresh_token');
	return res.status(200).json({ message: "User is log out" });
}

exports.refreshToken = async (req, res, next) => {
	const refreshTokenCookie = req.cookies['refresh_token'];

	if (!refreshTokenCookie) {
		return res.status(400).json({ message: 'A token is required' });
	}

	const username = await User.getByRefreshToken(refreshTokenCookie);

	if (!username) {
		return res.status(401).json({ message: 'Unauthorized' });
	}

	const { accessToken, refreshToken } = await User.generateTokenPairs(username);
	redisRefreshToken.del(refreshTokenCookie);
	redisRefreshToken.set(refreshToken, username);

	res.cookie('access_token', accessToken, {
		expires: new Date(Date.now() + 300000)
	});
	res.cookie('refresh_token', refreshToken, {
		httpOnly: true,
		expires: new Date(Date.now() + 604800000)
	});

	return res.status(200).json({ accessToken: accessToken, refreshToken: refreshToken });
}

exports.deleteRefreshToken = async (req, res, next) => {
	try {
		const refreshTokenCookie = req.cookies['refresh_token'];
		redisRefreshToken.del(refreshTokenCookie);
		return res.status(200).json({ message: 'Token is delete' });
	} catch (error) {
		console.dir(error);
	}
}

exports.authToken = async (req, res, next) => {
	const token = req.cookies['access_token'];
	if (token == null) return res.status(400).json({ message: 'A token is required for authentication' });
	const decoded = jwt.verify(token, config.access_token_secret, (err, user) => {
		if (err) return res.status(401).json({ message: 'Invalid token' });
		req.user = user.username;
		next();
	})
}

exports.authMe = async (req, res, next) => {
	const refreshTokenCookie = req.cookies['refresh_token'];
	if (!refreshTokenCookie) {
		return res.status(400).json({ message: 'A token is required' });
	}
	const username = await User.getByRefreshToken(refreshTokenCookie);
	if (!username) {
		return res.status(401).json({ message: 'Unauthorized' });
	}
	return res.status(200).json({ username: username });
}

exports.auth = async (req, res, next) => {
	return res.status(200).json({ success: true });
}
