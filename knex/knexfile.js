const path = require("path");
require("dotenv").config();
const pathToMigrations = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql2",
  connection: {
    database: "hackaton_db",
    user: "root",
    password: "root",
    host: "localhost",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
    directory: pathToMigrations,
  },
};
