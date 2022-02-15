require('dotenv').config()

module.exports = {
    development: {
        client: "mysql2",
        connection: {
            host:process.env.DB_HOST,
            user:process.env.DB_USER,
            database:process.env.DB_NAME,
            password:process.env.DB_PASSWORD,
        },
        migrations: {
            tableName: 'migrations',
            directory: './src/database/migrations',
        },
        seeds: {
            directory: './src/database/seeds',
        },
    },
}