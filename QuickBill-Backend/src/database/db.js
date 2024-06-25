const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

(async () => {
  try {
    // Create the users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        mobile VARCHAR(20) NOT NULL,
        date_registered TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("Table users created successfully");

    // Create the hsn_codes table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS hsn_codes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        hsn_code VARCHAR(10) NOT NULL,
        description TEXT,
        cgst_rate DECIMAL(5,2) DEFAULT NULL,
        sgst_rate DECIMAL(5,2) DEFAULT NULL,
        igst_rate DECIMAL(5,2) DEFAULT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("Table hsn_codes created successfully");

    // Create the items table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  itemDescription VARCHAR(255) NOT NULL,
  unitPrice DECIMAL(10, 2) DEFAULT NULL,
  hsnCode VARCHAR(50) NOT NULL,
	hsn_description TEXT,
    cgst_rate DECIMAL(5,2)DEFAULT NULL,
    sgst_rate DECIMAL(5,2)DEFAULT NULL,
    igst_rate DECIMAL(5,2) DEFAULT NULL,
  userId INT NOT NULL,
  FOREIGN KEY (userId) REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
    `);
    console.log("Table items created successfully");

    // Create the client table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS client (
        id INT NOT NULL AUTO_INCREMENT,
        clientName VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        alternateMobile VARCHAR(15),
        addressLine1 VARCHAR(100) NOT NULL,
        addressLine2 VARCHAR(100),
        pinCode INT,
        city VARCHAR(50),
        state VARCHAR(50),
        gstNo VARCHAR(20),
        userId INT NOT NULL,
        dateRegistered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);
    console.log("Table client created successfully");

    // Create the business table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS business (
        id INT NOT NULL AUTO_INCREMENT,
        businessName VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        mobile VARCHAR(15) NOT NULL,
        alternateMobile VARCHAR(15),
        addressLine1 VARCHAR(100) NOT NULL,
        pinCode INT,
        city VARCHAR(50),
        state VARCHAR(50),
        gstNo VARCHAR(20),
        panNo VARCHAR(20),
        bankAccountNo VARCHAR(20),
        ifscCode VARCHAR(20),
        userId INT NOT NULL,
        dateRegistered TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES users(id)
      );
    `);
    console.log("Table business created successfully");

    // Create the invoice table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS invoice (
        id INT PRIMARY KEY AUTO_INCREMENT,
        businessName VARCHAR(255) NOT NULL,
        mobileNumber VARCHAR(15) NOT NULL,
        alternateMobileNumber VARCHAR(15),
        addressLine1 VARCHAR(255) NOT NULL,
        addressLine2 VARCHAR(255),
        businessEmail VARCHAR(255) NOT NULL,
        clientName VARCHAR(255) NOT NULL,
        clientAddress TEXT NOT NULL,
        cityStateZip VARCHAR(255) NOT NULL,
        clientMobile VARCHAR(15) NOT NULL,
        clientGst VARCHAR(15),
        invoiceNo VARCHAR(50) NOT NULL,
        orderNo VARCHAR(50),
        gstin VARCHAR(15),
        pan VARCHAR(15),
        state VARCHAR(50),
        amountInWords TEXT,
        accountNo VARCHAR(50),
        ifsc VARCHAR(15),
        termsConditions TEXT,
        totalTaxAmount DECIMAL(10, 2) DEFAULT NULL,
        taxableAmountValue VARCHAR(50) DEFAULT NULL,
        cgstPercentage DECIMAL(5, 2) DEFAULT NULL,
        cgstAmount DECIMAL(10, 2) DEFAULT NULL,
        sgstPercentage DECIMAL(5, 2) DEFAULT NULL,
        sgstAmount DECIMAL(10, 2) DEFAULT NULL,
        igstPercentage DECIMAL(5, 2) DEFAULT NULL,
        igstAmount DECIMAL(10, 2) DEFAULT NULL,
        subTotal DECIMAL(10, 2) DEFAULT NULL,
        totalDiscount DECIMAL(10, 2) DEFAULT NULL,
        discountAmount DECIMAL(10, 2) DEFAULT NULL,
        shippingCharges DECIMAL(10, 2) DEFAULT NULL,
        totalAmountAfterTax DECIMAL(10, 2) DEFAULT NULL,
        totalInvoiceAmount DECIMAL(10, 2) DEFAULT NULL,
        userId INT NOT NULL,
        FOREIGN KEY (userId) REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("Table invoice created successfully");

    // Create the invoiceItems table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS invoiceItems (
        id INT AUTO_INCREMENT PRIMARY KEY,
        invoice_id INT,
        description VARCHAR(255),
        code VARCHAR(255),
        qty INT,
        amount DECIMAL(10, 2) DEFAULT NULL,
        unitPrice DECIMAL(10, 2) DEFAULT NULL,
        totalAmountBT DECIMAL(10, 2) DEFAULT NULL,
        hsnCode VARCHAR(255),
        cgst DECIMAL(10, 2) DEFAULT NULL,
        igst DECIMAL(10, 2) DEFAULT NULL,
        sgst DECIMAL(10, 2) DEFAULT NULL,
        totalAmountAT DECIMAL(10, 2) DEFAULT NULL,
        discount DECIMAL(10, 2) DEFAULT NULL,
        taxAmount DECIMAL(10, 2) DEFAULT NULL,
        userId INT,
        FOREIGN KEY (invoice_id) REFERENCES invoice(id),
        FOREIGN KEY (userId) REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);
    console.log("Table invoiceItems created successfully");

  } catch (err) {
    console.error("Error creating tables:", err.message);
  }
})();

module.exports = pool;
