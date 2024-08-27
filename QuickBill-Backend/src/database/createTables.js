// // const pool=require('./db')
// // // Create users table if it doesn't exist
// // pool.query(`
// //   CREATE TABLE IF NOT EXISTS users (
// //     id SERIAL PRIMARY KEY,
// //     username VARCHAR(255) NOT NULL,
// //     email VARCHAR(255) NOT NULL,
// //     password VARCHAR(255) NOT NULL
// //   )
// // `)
// // .then(() => console.log('Table users created successfully'))
// // .catch(err => console.error('Error creating table:', err.message));

// CREATE TABLE transactions(
//     tarnsaction_id int auto_increment primary key,
//     order_id varchar(100) NOT NULL,
//     payment_id varchar(100) NOT NULL,
//     transaction_status ENUM('initated','success','failed') NOT NULL,
//     userId int NOT NULL,
//     created_at TIMESTAMP DEFAULT current_timestamp,
//     updated_at timestamp default current_timestamp on update current_timestamp,
//     foreign key (userId) references users(id)
//     );