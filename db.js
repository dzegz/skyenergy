// db.js
const mysql = require('mysql2');
require('dotenv').config(); // Ensure .env is loaded to access environment variables

// Create a connection pool for better performance
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
// Export a promise-based connection pool for querying
module.exports = pool.promise();
