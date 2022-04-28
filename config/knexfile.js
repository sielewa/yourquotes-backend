const config = require('./config');

const path = require('path');

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: config.db_hostname,
			user: config.db_user,
			password: config.db_password,
			database: config.db_name,
		},
		migrations: {
			tableName: 'migrations',
			directory: path.join(__dirname, '/migrations'),
		},
		seeds: {
			tableName: 'seeds',
			directory: path.join(__dirname, '/seeds'),
		},
	},
}
