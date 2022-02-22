const db = require('../config/db')

class Quote {
    constructor(quotation, userid, date){
        this.quotation = quotation
        this.userid = userid
        this.date = date
    }

    async saveToDatabase(){
        const newquo = await db('quotations').insert({'quotation': this.quotation, 'userid':this.userid, 'date': this.date})
        return newquo
    }

    static async findByDateDesc(){
        const results = await db('quotations').select().orderBy('date', 'desc')
        return results || null
    }

    static async getById(quoid){
        const quo = await db('quotations').select().where('id', quoid)
        return quo[0] || null
    }

    static async getByUserId(userid){
        const quos = await db('quotations').select().where('userid', userid)
        return quos[0] || null
    }

    static async getAll(){
        const quos = await db('quotations').select()
        return quos[0] || null
    }

}

module.exports = Quote