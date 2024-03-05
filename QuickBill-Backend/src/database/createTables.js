// const pool=require('./db')
// // Create users table if it doesn't exist
// pool.query(`
//   CREATE TABLE IF NOT EXISTS users (
//     id SERIAL PRIMARY KEY,
//     username VARCHAR(255) NOT NULL,
//     email VARCHAR(255) NOT NULL,
//     password VARCHAR(255) NOT NULL
//   )
// `)
// .then(() => console.log('Table users created successfully'))
// .catch(err => console.error('Error creating table:', err.message));