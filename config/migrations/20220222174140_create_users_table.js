exports.up = function(knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary()
        table.string('username').unique().notNull()
        table.string('salt').notNull()
        table.string('password').notNull()
        table.string('email').unique().notNull()
        table.timestamps(false, true)
  })
}

exports.down = function(knex) { 
    return knex.schema.dropTableIfExists('users')
}
