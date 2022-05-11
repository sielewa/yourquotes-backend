require('dotenv').config();

const env = process.env.NODE_ENV;

const development = {
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

const production = {
	app: {
		port: process.env.PORT || 5000,
		host: process.env.HOST || '0.0.0.0',
	},
	db: {
		host: process.env.HOSTNAME_DB,
		user: process.env.USERNAME_DB,
		password: process.env.PASSWORD_DB,
		name: process.env.NAME_DB,
	},
	jwt: {
		access_token_secret: process.env.ACCESS_TOKEN_SECRET,
		refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
	},
	redis: {
		url: process.env.REDIS_URL
	}
}

const config = {
	development,
	production
}


module.exports = config[env];
