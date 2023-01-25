
exports.up = function(knex) {
    return knex.schema.alterTable("Chat_Rooms", (table) => {
        table.renameColumn("active", "active_users")
    })
};


exports.down = function(knex) {
  return knex.schema.alterTable("Chat_Rooms")
};
