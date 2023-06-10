const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Papersite",
  password: "chickenfat",
  port: 5432,
});

module.exports = pool;
