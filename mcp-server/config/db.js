/* eslint-env node */
require('dotenv').config(); // Load environment variables
const { Pool } = require('pg');

// The pool will read connection information from the following environment variables:
// PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT.
// It's recommended to create a .env file in the mcp-server root directory with these values.
const pool = new Pool({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

// We export a query function that will be used throughout the application
// to interact with the database.
module.exports = {
  query: (text, params) => pool.query(text, params),
};
