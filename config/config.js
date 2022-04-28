require('dotenv').config();

const config = {
	node_env: process.env.NODE_ENV || 'development',
	port: process.env.PORT || 5000,
	host: process.env.HOST || '127.0.0.1',
	db_hostname: process.env.DB_HOST || 'localhost',
	db_user: process.env.DB_USER || 'root',
	db_password: process.env.DB_PASSWORD,
	db_name: process.env.DB_NAME || 'quotations-app',
	access_token_secret: process.env.ACCESS_TOKEN_SECRET,
	refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
	redis_host: process.env.REDIS_HOST,
	redis_port: process.env.REDIS_PORT,
	redis_db: process.env.REDIS_DB
}

module.exports = config;
