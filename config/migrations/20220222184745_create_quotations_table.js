
exports.up = function(knex) {
    return knex.schema.createTable('quotations', (table) => {
        table.increments('id').primary()
        table.string('text').notNull()
        table.integer('user_id').unsigned().references('users.id')
        table.timestamps(false, true)
    })
}


exports.down = function(knex) {
    return knex.schema.dropTableIfExists('quotations')
}
