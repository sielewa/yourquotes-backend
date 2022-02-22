const db = require('../config/db')

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
        const results = await db.select().from('users').where('username', username).orWhere('email', email)
        return results.length > 0
    }

    static async getByUsername(username){
        const results = await db.select().from('users').where('username', username).limit(1)
        return results[0] || null
    }

    static getSalt(username){
        return this.salt
    }

    static getPassword(username){
        return this.password
    }
}

module.exports = User