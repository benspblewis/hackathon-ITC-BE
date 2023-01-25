const path = require("path");
require("dotenv").config();
const pathToMigrations = path.resolve(__dirname, "../migrations");

module.exports = {
  client: "mysql2",
  connection: {
    database: "itc_hackaton",
    user: "m1ow7xhhjf2u87ondhja",
    password: "pscale_pw_kI2oJ1yIUdgQQHMK4ovdB6UARJB4cf8UAmWwJliuuJp",
    host: 'eu-central.connect.psdb.cloud',
    ssl: {"rejectUnauthorized":true}
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
