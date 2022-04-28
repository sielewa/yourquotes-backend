const config = require('../config/config');
const redis = require('redis');

class redisService {
	refreshTokenRedis;

	constructor() {
		this.refreshTokenRedis = redis.createClient({
			host: config.redis_host,
			post: config.redis_port,
			db: config.redis_db
		});
		this.refreshTokenRedis.connect();
	}

	async get(token) {
		const userId = await this.refreshTokenRedis.get(token);
		return userId;
	}

	async set(refreshToken, payload) {
		await this.refreshTokenRedis.set(
			refreshToken,
			payload,
			'EX',
			604800
		);
	}

	async del(token) {
		await this.refreshTokenRedis.del(token);
	}
}

const redisRefreshToken = new redisService();

module.exports = redisRefreshToken;
