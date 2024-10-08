const pool = require("../database/db");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const { BusinessDataModel } = require("../models/businessModel");

function getBusiness() {
  return pool
    .query("SELECT * FROM business")
    .then((results) => results)
    .catch((err) => {
      throw new Error(`Error fetching users: ${err.message}`);
    });
}
async function registerBusiness(businessData, userId) {
  const business = new BusinessDataModel(businessData);

  const requiredFields = [
    "businessName",
    "email",
    "mobile",
    "alternateMobile",
    "addressLine1",
    "pinCode",
    "city",
    "state",
    "gstNo",
    "panNo",
    "bankAccountNo",
    "ifscCode",
  ];

  const missingFields = requiredFields.filter(field => !business[field] || (typeof business[field] === 'string' && business[field].trim() === ""));

  if (missingFields.length > 0) {
    return {
      message: `The following fields are required: ${missingFields.join(', ')}`,
      status: 'error'
    };
  }

  if (!validator.isEmail(business.email)) {
    return { message: "Invalid email format", status: "error" };
  }

  const oldUser = await pool.query(
    "SELECT * FROM business WHERE userId = ? AND businessName = ?",
    [userId, business.businessName]
  );

  if (oldUser[0].length > 0) {
    console.log(oldUser, "oldUser");
    return { message: "Business already exists", status: "error" };
  }

  // Insert business into the database
  try {
    const result = await pool.query(
      "INSERT INTO business (businessName, email, mobile, alternateMobile, addressLine1, pinCode, city, state, gstNo, panNo, bankAccountNo, ifscCode, userId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?)",
      [
        business.businessName,
        business.email,
        business.mobile,
        business.alternateMobile,
        business.addressLine1,
        business.pinCode,
        business.city,
        business.state,
        business.gstNo,
        business.panNo,
        business.bankAccountNo,
        business.ifscCode,
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
      "SELECT * FROM business WHERE userId = ? ORDER BY id DESC",
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
