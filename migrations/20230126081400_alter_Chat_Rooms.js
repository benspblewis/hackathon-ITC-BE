exports.up = function (knex) {
  return knex.schema.alterTable("Chat_Rooms", (table) => {
    table.dropColumn("feature_vector");
    table.string("chat_vector");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("Chat_Rooms");
};
