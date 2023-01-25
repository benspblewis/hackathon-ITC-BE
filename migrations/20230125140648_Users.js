
exports.up = function(knex) {
    return knex.schema.createTable('Users', (table)=>{
        table.increments('id').primary();
        table.string('name').notNull();
        table.integer('age').notNull();
        table.string('gender');
        table.string("email").notNull();
        table.string('password').notNull();
        table.string('photo');
    })
};


exports.down = function(knex) {
  return knex.schema.dropTable('Users');
};
