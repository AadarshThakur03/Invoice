const pool = require("../database/db");
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

function getBusiness() {
  return pool
    .query("SELECT * FROM business")
    .then((results) => results)
    .catch((err) => {
      throw new Error(`Error fetching users: ${err.message}`);
    });
}

async function registerBusiness(businessData, userId) {
  // Validate fields
  const {
    name,
    email,
    phone,
    alternatePhone,
    addressLine1,
    addressLine2,
    pinCode,
    city,
    state,
    gstNo,
  } = businessData;

  if (!name || !email || !phone || !addressLine1) {
    return { message: "All required fields must be provided", status: "error" };
  }

  if (!validator.isEmail(email)) {
    return { message: "Invalid email format", status: "error" };
  }

  // Insert business into the database
  try {
    const result = await pool.query(
      "INSERT INTO business (name, email, phone, alternatePhone, addressLine1, addressLine2, pinCode, city, state, gstNo, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        name,
        email,
        phone,
        alternatePhone,
        addressLine1,
        addressLine2,
        pinCode,
        city,
        state,
        gstNo,
        userId,
      ]
    );
    return { message: "Business added successfully", status: "success" };
  } catch (err) {
    return {
      message: "Error registering business",
      status: "error",
      error: err,
    };
  }
}

async function getBusinessesByUserID(userId) {
  try {
    // Retrieve businesses associated with a user from the database
    const businesses = await pool.query(
      "SELECT * FROM business WHERE userId = ?",
      [userId]
    );
    const business = businesses[0];

    return {
      message: "Businesses retrieved successfully",
      status: "success",
      business,
    };
  } catch (err) {
    return {
      message: "Error retrieving businesses",
      status: "error",
      error: err.message,
    };
  }
}

module.exports = {
  registerBusiness,
  getBusinessesByUserID,
};
