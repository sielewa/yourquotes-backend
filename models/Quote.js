const db = require('../config/db')

class Quote {
    constructor(quotation, user_id){
        this.quotation = quotation
        this.user_id = user_id
    }

    async saveToDatabase(){
        const result = await db('quotations').insert({'text': this.quotation, 'user_id':this.user_id})
        return result
    }

    static async getByPagination(offset, limit){
        const results = await db('quotations').select().orderBy('created_at', 'desc').offset(offset).limit(limit)
        return results || null
    }

    static async getById(quoid){
        const quo = await db('quotations').select().where('id', quoid).limit(1)
        return quo[0] || null
    }

    static async getByUserId(userid){
        const quos = await db('quotations').select().where('userid', userid).limit(1)
        return quos[0] || null
    }

    static getUserId(){
        return this.user_id
    }

    static getText(){
        return this.quotation
    }

}

module.exports = Quote