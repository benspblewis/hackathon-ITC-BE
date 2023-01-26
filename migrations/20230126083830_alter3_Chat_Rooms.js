exports.up = function (knex) {
  return knex.schema.alterTable("Chat_Rooms", (table) => {
    table.string("chat_vector", 1000);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Chat_Rooms");
};
