const db = require('../config/db')
const redisRefreshToken = require('../redis/redis')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const sha256 = require('sha256')

class User {
    constructor(username, salt, password, email){
        this.username = username
        this.salt = salt
        this.password = password
        this.email = email
    }

    async saveToDatabase(){
        const result = await db('users').insert({'username': this.username, 'salt': this.salt, 'password': this.password, 'email': this.email})
        return result
    }

    static async isExist(username, email){
        const results = await db.select().from('users').where('username', username).orWhere('email', email).limit(1)
        return results.length > 0
    }

    static async getByUsername(username){
        const result = await db.select().from('users').where('username', username).limit(1)
        return result[0] || null
    }

    static async generateTokenPairs(username){
        const accessToken = jwt.sign({username: username}, config.access_token_secret, {expiresIn: '5m'})
        const refreshToken = sha256(username+config.refresh_token_secret+Date.now())
        return {accessToken: accessToken, refreshToken: refreshToken}
    }

    static async getByRefreshToken(token){
        const username = await redisRefreshToken.get(token)
        return username
    }

    static getSalt(username){
        return this.salt
    }

    static getPassword(username){
        return this.password
    }
}

module.exports = User