const pool = require("../database/db");
const { ItemDataModel } = require("../models/itemModel");

async function getItems() {
  try {
    const items = await pool.query("SELECT * FROM items");
    return {
      message: "Items retrieved successfully",
      status: "success",
      items: items[0],
    };
  } catch (err) {
    return {
      message: "Error retrieving items",
      status: "error",
      error: err.message,
    };
  }
}

async function addItem(itemData, userId) {
  const item = new ItemDataModel(itemData);
  console.log(item);

  // Check if the item description and HSN code are missing
  if (!item.itemDescription) {
    return {
      message: "Item description is required",
      status: "error",
    };
  }
  if (!item.hsnCode) {
    return {
      message: "HSN code is required",
      status: "error",
    };
  }

  if (!item.unitPrice === " ") {
    return {
      message: "Item unit price is required",
      status: "error",
    };
  }

  const oldItem = await pool.query(
    "SELECT * FROM items WHERE userId = ? AND itemDescription = ?",
    [userId, item.itemDescription]
  );

  if (oldItem[0].length > 0) {
    console.log(oldItem, "oldItem");
    return { message: "Item already exists", status: "error" };
  }

  console.log(item);
  try {
    // Insert item into the database
    const result = await pool.query(
      "INSERT INTO items (itemDescription, unitPrice, hsnCode,hsn_description,cgst_rate,sgst_rate,igst_rate, userId) VALUES (?, ?, ?, ?, ?,?,?,?)",
      [
        item.itemDescription,
        item.unitPrice,
        item.hsnCode,
        item.hsnDescription,
        item.cgst,
        item.sgst,
        item.igst,
        userId,
      ]
    );
    return {
      message: "Item added successfully",
      status: "success",
    };
  } catch (err) {
    return {
      message: "Error inserting item",
      status: "error",
      error: err.message,
    };
  }
}

async function getItemByUserID(userId) {
  try {
    // Retrieve items associated with a user from the database
    const items = await pool.query(
      "SELECT * FROM items WHERE userId = ? ORDER BY id DESC",
      [userId]
    );
    const item = items[0];

    return {
      message: "Item retrieved successfully",
      status: "success",
      item,
    };
  } catch (err) {
    return {
      message: "Error retrieving item",
      status: "error",
      error: err.message,
    };
  }
}

module.exports = {
  getItems,
  addItem,
  getItemByUserID,
};
