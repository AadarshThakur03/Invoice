const mysql = require("mysql2/promise");

require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

pool
  .query(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      mobile VARCHAR(20) NOT NULL,
      date_registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
`
  )
  .then(() => console.log("Table users created successfully"))
  .catch((err) => console.error("Error creating table:", err.message));

module.exports = pool;
