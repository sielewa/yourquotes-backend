require('dotenv').config();

const config = {
	app: {
		port: process.env.PORT || 5000,
		host: process.env.HOST || '127.0.0.1',
	},
	db: {
		host: process.env.DB_HOST || 'localhost',
		user: process.env.DB_USER || 'root',
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME || 'quotations-app',
	},
	jwt: {
		access_token_secret: process.env.ACCESS_TOKEN_SECRET,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
	},
	redis: {
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		db: process.env.REDIS_DB
	}
}

module.exports = config;
