const db = require('../config/db');
const refreshTokenService = require('../services/refreshTokenService');
const jwt = require('jsonwebtoken');
const config = require('../config/config');
const sha256 = require('sha256');

class User {
	constructor(username, salt, password, email) {
		this.username = username
		this.salt = salt
		this.password = password
		this.email = email
	}

	async saveToDatabase() {
		const result = await db('users').insert({ 'username': this.username, 'salt': this.salt, 'password': this.password, 'email': this.email });
		return result;
	}

	static async isExist(username, email) {
		const results = await db('users').select().where('username', username).orWhere('email', email);
		return results.length > 0;
	}

	static async getByUsername(username) {
		const result = await db.select().from('users').where('username', username).first();
		return result || null;
	}

	static async getById(id) {
		const result = await db('users').select().where('id', id).first();
		return result || null;
	}

	static async generateTokenPairs(user_id) {
		const accessToken = jwt.sign({ user_id: user_id }, config.access_token_secret, { expiresIn: '5m' });
		const refreshToken = sha256(user_id + config.refresh_token_secret + Date.now());
		return { accessToken: accessToken, refreshToken: refreshToken };
	}

	static async getByRefreshToken(token) {
		const user_id = await refreshTokenService.get(token);
		const result = await db('users').select('id', 'username', 'email').where('id', user_id).first()
		return result;
	}

	static getSalt(username) {
		return this.salt;
	}

	static getPassword(username) {
		return this.password;
	}
}

module.exports = User;
