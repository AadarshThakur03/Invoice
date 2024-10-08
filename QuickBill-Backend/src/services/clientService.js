const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { ClientDataModel } = require("../models/clientModel");

function getClient() {
  return pool
    .query("SELECT * FROM client")
    .then((results) => results)
    .catch((err) => {
      throw new Error(`Error fetching users: ${err.message}`);
    });
}
async function registerClient(clientData, userId) {
  const client = new ClientDataModel(clientData);
  
  const requiredFields = [
    "clientName",
    "email",
    "mobile",
    "alternateMobile",
    "addressLine1",
    "pinCode",
    "city",
    "state",
    "gstNo",
    
  ];

  const missingFields = requiredFields.filter(field => !client[field] || (typeof client[field] === 'string' && client[field].trim() === ""));

  if (missingFields.length > 0) {
    return {
      message: `The following fields are required: ${missingFields.join(', ')}`,
      status: 'error'
    };
  }
  console.log(client,'cl');

  // Validate fields
  if (
    !client.clientName ||
    !client.email ||
    !client.mobile ||
    !client.addressLine1
  ) {
    return { message: "All required fields must be provided", status: "error" };
  }

  if (!validator.isEmail(client.email)) {
    return { message: "Invalid email format", status: "error" };
  }

  const oldUser = await pool.query(
    "SELECT * FROM client WHERE userId = ? AND clientName = ?",
    [userId, client.clientName]
  );

  if (oldUser[0].length > 0) {
    console.log(oldUser, "oldUser");
    return { message: "Client already exists", status: "error" };
  }

  // Insert client into the database
  try {
    const result = await pool.query(
      "INSERT INTO client (clientName, email, mobile, alternateMobile, addressLine1, addressLine2, pinCode, city, state, gstNo, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        client.clientName,
        client.email,
        client.mobile,
        client.alternateMobile,
        client.addressLine1,
        client.addressLine2,
        client.pinCode,
        client.city,
        client.state,
        client.gstNo,
        userId,
      ]
    );
    return { message: "Client added successfully", status: "success" };
  } catch (err) {
    return {
      message: "Error registering client",
      status: "error",
      error: err,
    };
  }
}

async function getClientByUserID(userId) {
  try {
    // Retrieve clientes associated with a user from the database
    const clients = await pool.query("SELECT * FROM client WHERE userId = ? ORDER BY id DESC", [
      userId,
    ]);
    const client = clients[0];
console.log(client,'client');
    return {
      message: "Clients retrieved successfully",
      status: "success",
      client,
    };
  } catch (err) {
    return {
      message: "Error retrieving clients",
      status: "error",
      error: err.message,
    };
  }
}

module.exports = {
  registerClient,
  getClientByUserID,
};
