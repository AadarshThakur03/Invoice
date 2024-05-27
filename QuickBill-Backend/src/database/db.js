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

// CREATE TABLE IF NOT EXISTS business (
//   id INT NOT NULL AUTO_INCREMENT,
//   businessName VARCHAR(50) NOT NULL,
//   email VARCHAR(50) NOT NULL,
//   mobile VARCHAR(15) NOT NULL,
//   alternateMobile VARCHAR(15),
//   addressLine1 VARCHAR(100) NOT NULL,
//   pinCode INT,
//   city VARCHAR(50),
//   state VARCHAR(50),
//   gstNo VARCHAR(20),
//   panNo VARCHAR(20),
//   bankAccountNo VARCHAR(20),
//   ifscCode VARCHAR(20),
//   userId INT NOT NULL,
// dateRegistered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (id),
//   FOREIGN KEY (userId) REFERENCES users(id)
// );
// CREATE TABLE IF NOT EXISTS client (
//   id INT NOT NULL AUTO_INCREMENT,
//   clientName VARCHAR(50) NOT NULL,
//   email VARCHAR(50) NOT NULL,
//   phone VARCHAR(15) NOT NULL,
//   alternatePhone VARCHAR(15),
//   addressLine1 VARCHAR(100) NOT NULL,
//   addressLine2 VARCHAR(100),
//   pinCode INT,
//   city VARCHAR(50),
//   state VARCHAR(50),
//   gstNo VARCHAR(20),
//   userId INT NOT NULL,
// dateRegistered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   PRIMARY KEY (id),
//   FOREIGN KEY (userId) REFERENCES users(id)
// );
// -- Insert dummy data into business table
// INSERT INTO business (businessName, email, mobile, alternateMobile, addressLine1, pinCode, city, state, gstNo, panNo, bankAccountNo, ifscCode, userId)
// VALUES
//     ('Textile Industry', 'text@g.cocm', '7021684702', '7021684704', 'Babu Bhai Chawl, Poisar, Gaondevi Road, Kandivali (East)', 400101, 'Mumbai', 'Maharashtra', 'AJPTY76786768', 'BUYTPO868778687', '097286232212', '0876275267521', 6),
//     ('Construction Company', 'construction@g.cocm', '7021684705', '7021684706', '123 Main Street', 123456, 'Anytown', 'AnyState', 'XYZ12345678', 'ABCPQ98765432', '0123456789', 'ZYXW987654321', 7),
//     ('Retail Store', 'retail@g.cocm', '7021684707', '7021684708', '456 Oak Avenue', 789012, 'Smallville', 'BigState', '78945612300', 'XYVPQ45678901', '9876543210', 'ZYXW987654321', 8);

// -- Insert dummy data into client table
// INSERT INTO client (clientName, email, phone, alternatePhone, addressLine1, addressLine2, pinCode, city, state, gstNo, userId)
// VALUES
//     ('Client A', 'clientA@example.com', '7021684709', '7021684710', '789 Elm Street', 'Apt 101', 567890, 'Metropolis', 'BigState', 'ACME12345678', 6),
//     ('Client B', 'clientB@example.com', '7021684711', '7021684712', '321 Pine Street', NULL, 543210, 'Gotham', 'BigState', 'XYZ98765432', 7),
//     ('Client C', 'clientC@example.com', '7021684713', '7021684714', '987 Cedar Avenue', 'Suite 200', 987654, 'Springfield', 'SmallState', 'PQRS45678900', 8);
