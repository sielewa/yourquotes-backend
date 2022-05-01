const config = require('../config/config');
const redisService = require('./redisService');

class refreshTokenService {
redis;

	constructor() {
		this.redis = redisService;
	}

	async get(token) {
		const user_id = await this.redis.get(token);
		return  user_id;
	}

	async set(refreshToken, payload, expires) {
		await this.redis.set(
			refreshToken,
			payload,
			'EX',
			expires
		);
	}

	async del(token) {
		await this.redis.del(token);
	}
}

const refreshTokenServiceObj = new refreshTokenService();

module.exports = refreshTokenServiceObj;
