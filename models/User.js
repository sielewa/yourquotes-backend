const db = require('../config/db');

class User {
    constructor(username,salt,password,email){
        this.username = username;
        this.salt = salt
        this.password = password
        this.email = email;
    }

    async saveToDatabase(){
        const newUser = await db('users').insert({'username': this.username, 'salt': this.salt, 'password': this.password, 'email': this.email});
        return newUser;
    }

    static async isExist(username, email){
        const results = await db.select().from('users').where('username', username).orWhere('email', email);
        return results.length > 0;
    }

    static async getByUsername(username){
        const results = await db.select().from('users').where('username', username);
        return results[0];
    }

    static checkPassword(){

    }
}

module.exports = User;