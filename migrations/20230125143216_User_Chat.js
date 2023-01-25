
exports.up = function(knex) {
    return knex.schema.createTable("User_Chat", (table) => {
        table.increments("id").primary();
          table.integer('chat_id');
          table.integer('user_id');
          table.timestamp("join_timestamp").defaultTo(knex.fn.now());
          table.timestamp("leave_timestamp");
      });
};


exports.down = function(knex) {
  return knex.schema.dropTable('User_Chat');
}
