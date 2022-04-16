const db = require('../config/db')

class Quote {
    constructor(text, user_id){
        this.text = text
        this.user_id = user_id
    }

    async saveToDatabase(){
        const result = await db('quotations').insert({'text': this.text, 'user_id':this.user_id})
        return result
    }

    static async getByPagination(offset, limit){
        const results = await db('quotations').select('quotations.id', 'quotations.text', 'quotations.created_at', 'users.username').join('users', 'users.id', '=', 'quotations.user_id').orderBy('created_at', 'desc').offset(offset).limit(limit)
        return results || null
    }

    static async getById(quoid){
        const results = await db('quotations').select().where('id', quoid).limit(1)
        return results || null
    }

    static async getByUserId(userid){
        const results = await db('quotations').select().where('userid', userid).limit(1)
        return results || null
    }

    static async delById(quoteId){
        const result = await db('quotations').del().where('id', quoteId)
        return result
    }

    static getUserId(){
        return this.user_id
    }

    static getText(){
        return this.text
    }

}

module.exports = Quote