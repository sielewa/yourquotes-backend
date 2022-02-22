require('dotenv').config()

const config = {
    node_env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 3000,
    db_hostname: process.env.DB_HOST || 'localhost',
    db_user: process.env.DB_USER || 'root',
    db_password: process.env.DB_PASSWORD,
    db_name: process.env.DB_NAME || 'quotations-app',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    refresh_token_secret: process.env.REFRESH_TOKEN_SECRET
}

module.exports = config