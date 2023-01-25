
exports.up = function (knex) {
  return knex.schema.createTable("Users_Interests", (table) => {
    table.increments("id").primary();
    table.integer("user_id").notNull();
    table.integer("interests_id").notNull();
    table.integer("rating");
  });
};


exports.down = function (knex) {
  return knex.schema.dropTable("Users_Interests");
};
