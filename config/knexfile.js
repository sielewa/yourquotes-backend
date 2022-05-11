const config = require('./config');

const path = require('path');

module.exports = {
	development: {
		client: 'mysql2',
		connection: {
			host: config.db.host,
			user: config.db.user,
			password: config.db.password,
			database: config.db.name,
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
