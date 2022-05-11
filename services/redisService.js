const config = require('../config/config');
const redis = require('redis');

class redisService {
	redisService;

	constructor() {
		this.redisService = redis.createClient({
			host: config.redis.host,
			post: config.redis.port,
			db: config.redis.db
		});
		this.redisService.connect();
	}

	async get(key) {
		const value = await this.redisService.get(key);
		return value;
	}

	async set(key, value, expires) {
		await this.redisService.set(key, value, 'EX', expires);
	}

	async del(key) {
		await this.redisService.del(key);
	}
}

const redisServiceObj = new redisService();

module.exports = redisServiceObj;
