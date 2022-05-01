const db = require('../config/db');

class Quote {
	constructor(text, user_id) {
		this.text = text
		this.user_id = user_id
	}

	async saveToDatabase() {
		const result = await db('quotations').insert({ 'text': this.text, 'user_id': this.user_id });
		return result;
	}

	static async getByPagination(offset, limit) {
		const results = await db('quotations').select('quotations.id', 'quotations.text', 'quotations.created_at', 'quotations.user_id', 'users.username').join('users', 'users.id', '=', 'quotations.user_id').orderBy('created_at', 'desc').offset(offset).limit(limit);
		return results || null;
	}

	static async getCountOfQuotes() {
		const result = await db('quotations').count('id', { as: 'count' });
		return result[0] || null;
	}

	static async getQuotes() {
		const results = await db('quotations').select('quotations.id', 'quotations.text', 'quotations.created_at', 'quotations.user_id', 'users.username').join('users', 'users.id', '=', 'quotations.user_id').orderBy('created_at', 'desc');
		return results || null;
	}

	static async getById(quoid) {
		const results = await db('quotations').select().where('id', quoid).first();
		return results || null;
	}

	static async getByUserId(userid) {
		const results = await db('quotations').select('quotations.id', 'quotations.text', 'quotations.created_at', 'quotations.user_id', 'users.username').join('users', 'users.id', '=', 'quotations.user_id').where('user_id', userid).orderBy('created_at', 'desc');
		return results || null;
	}

	static async getLastCountByUserId(userid, count) {
		const results = await db('quotations').select('quotations.id', 'quotations.text', 'quotations.created_at', 'users.username').join('users', 'users.id', '=', 'quotations.user_id').where('user_id', userid).orderBy('created_at', 'desc').limit(count);
		return results || null;
	}

	static async delById(quoteId) {
		const result = await db('quotations').del().where('id', quoteId);
		return result;
	}

	static getUserId() {
		return this.user_id;
	}

	static getText() {
		return this.text;
	}

}

module.exports = Quote;
