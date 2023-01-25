

  
exports.up = function (knex) {
    return knex.schema.createTable("Chat_Rooms", (table) => {
      table.increments("id").primary();
        table.boolean('active');
        table.string("language").notNull();
        table.integer('top_interest_id');
        table.integer('feature_vector');
    });
  };
  
  
  exports.down = function (knex) {
    return knex.schema.dropTable("Chat_Rooms");
  };
  



