const pool = require("../database/db");
const { HsnCodeDataModel } = require("../models/hsnCodeModel");

async function getHsnCodes() {
  try {
    const hsnCodes = await pool.query("SELECT * FROM hsn_codes");
    return {
      message: "HSN codes retrieved successfully",
      status: "success",
      hsnCodes: hsnCodes[0],
    };
  } catch (err) {
    return {
      message: "Error retrieving HSN codes",
      status: "error",
      error: err.message,
    };
  }
}

async function addHsnCode(hsnCodeData, userId) {
  const hsnCode = new HsnCodeDataModel(hsnCodeData);

  // Check if the HSN code is missing
  if (!hsnCode.hsnCode) {
    return {
      message: "HSN code is required",
      status: "error",
    };
  }
  if (hsnCodeData.cgst_rate === " ") {
    hsnCodeData.cgst_rate = null;
  }
  if (hsnCodeData.sgst_rate === " ") {
    hsnCodeData.sgst_rate = null;
  }
  if (hsnCodeData.igst_rate === " ") {
    hsnCodeData.igst_rate = null;
  }

  const oldUser = await pool.query(
    "SELECT * FROM hsn_codes WHERE userId = ? AND hsn_code = ?",
    [userId, hsnCode.hsnCode]
  );

  if (oldUser[0].length > 0) {
    console.log(oldUser, "oldUser");
    return { message: "HSN Code already exists", status: "error" };
  }

  console.log(hsnCode);
  try {
    // Insert HSN code into the database
    const result = await pool.query(
      "INSERT INTO hsn_codes (hsn_code, description, cgst_rate, sgst_rate, igst_rate,userId) VALUES (?, ?, ?, ?, ?,?)",
      [
        hsnCode.hsnCode,
        hsnCode.description,
        hsnCode.cgst_rate,
        hsnCode.sgst_rate,
        hsnCode.igst_rate,
        userId,
      ]
    );
    return {
      message: "HSN code added successfully",
      status: "success",
    };
  } catch (err) {
    return {
      message: "Error inserting HSN code",
      status: "error",
      error: err.message,
    };
  }
}

async function getHsnCodeByUserID(userId) {
  try {
    // Retrieve businesses associated with a user from the database
    const hsnCodes = await pool.query(
      "SELECT * FROM hsn_codes WHERE userId = ? ORDER BY id DESC",
      [userId]
    );
    const hsnCode = hsnCodes[0];

    return {
      message: "HSN Code retrieved successfully",
      status: "success",
      hsnCode,
    };
  } catch (err) {
    return {
      message: "Error retrieving HSN Code",
      status: "error",
      error: err.message,
    };
  }
}

async function getHsnCodeByNameAndUserId(hsnName, hsnId, userId) {
  try {
    // Retrieve HSN code by name, ID, and user ID from the database
    const hsnCodes = await pool.query(
      "SELECT * FROM hsn_codes WHERE hsn_code = ? AND id = ? AND userId = ?",
      [hsnName, hsnId, userId]
    );
    const hsnCode = hsnCodes[0];

    if (hsnCode.length === 0) {
      return {
        message: "HSN Code not found for the given name, ID, and user ID",
        status: "error"
      };
    }

    return {
      message: "HSN Code retrieved successfully",
      status: "success",
      hsnCode: hsnCode[0]
    };
  } catch (err) {
    return {
      message: "Error retrieving HSN Code",
      status: "error",
      error: err.message
    };
  }
}

module.exports = {
  getHsnCodes,
  addHsnCode,
  getHsnCodeByUserID,
  getHsnCodeByNameAndUserId
};
