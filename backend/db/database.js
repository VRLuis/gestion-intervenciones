const { Client, Pool } = require('pg')

const pool = new Pool({
  user: process.env.DATABASE_USER || 'intervention',
  host: process.env.DATABASE_URL || 'localhost',
  database: process.env.DATABASE_NAME || 'intervention',
  password: process.env.DATABASE_PASSWORD || 'intervention',
  port: process.env.PORT || 5432,
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};