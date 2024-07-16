// const pool = require("../database/db");
// const { InvoiceDataModel } = require("../models/invoiceModel");
// const { ItemDataModel } = require("../models/itemModel");

// const generateInvoiceNo = async (userId) => {
//   try {
//     const result = await pool.query(
//       "SELECT invoiceNo FROM invoice WHERE userId = ? ORDER BY id DESC LIMIT 1",
//       [userId]
//     );

//     if (result[0].length > 0) {
//       const lastInvoiceNo = result[0][0].invoiceNo;
//       const invoiceNumberMatch = lastInvoiceNo.match(/(\d+)$/);
//       if (invoiceNumberMatch) {
//         const invoiceNumber = parseInt(invoiceNumberMatch[1], 10) + 1;
//         return `INV${invoiceNumber.toString().padStart(5, "0")}`;
//       }
//     }

//     return "INV00001";
//   } catch (error) {
//     console.error("Error generating invoice number:", error);
//     throw error; // Propagate the error upwards
//   }
// };

// const updateInvoice = async (invoiceData, userId) => {
//   const invoice = new InvoiceDataModel(invoiceData);

//   const existingInvoiceResult = await pool.query(
//     "SELECT id FROM invoice WHERE invoiceNo = ? AND userId = ?",
//     [invoice.invoiceNo, userId]
//   );

//   if (existingInvoiceResult[0].length === 0) {
//     throw new Error("Invoice not found");
//   }

//   const invoiceId = existingInvoiceResult[0][0].id;

//   await pool.query(
//     `UPDATE invoice
//        SET businessName = ?, mobileNumber = ?, alternateMobileNumber = ?, addressLine1 = ?,
//            addressLine2 = ?, businessEmail = ?, clientName = ?, clientAddress = ?, cityStateZip = ?,
//            clientMobile = ?, clientGst = ?, orderNo = ?, taxableAmountValue = ?,
//            totalTaxAmount = ?, cgstPercentage = ?, cgstAmount = ?, sgstPercentage = ?,
//            sgstAmount = ?, igstPercentage = ?, igstAmount = ?, subTotal = ?, totalDiscount = ?,
//            discountAmount = ?, shippingCharges = ?, totalAmountAfterTax = ?, totalInvoiceAmount = ?
//        WHERE id = ? AND userId = ?`,
//     [
//       invoice.businessName,
//       invoice.mobileNumber,
//       invoice.alternateMobileNumber,
//       invoice.addressLine1,
//       invoice.addressLine2,
//       invoice.businessEmail,
//       invoice.clientName,
//       invoice.clientAddress,
//       invoice.cityStateZip,
//       invoice.clientMobile,
//       invoice.clientGst,
//       invoice.orderNo,
//       invoice.taxableAmountValue,
//       invoice.totalTaxAmount,
//       invoice.cgstPercentage,
//       invoice.cgstAmount,
//       invoice.sgstPercentage,
//       invoice.sgstAmount,
//       invoice.igstPercentage,
//       invoice.igstAmount,
//       invoice.subTotal,
//       invoice.totalDiscount,
//       invoice.discountAmount,
//       invoice.shippingCharges,
//       invoice.totalAmountAfterTax,
//       invoice.totalInvoiceAmount,
//       invoiceId,
//       userId,
//     ]
//   );

//   // Update invoice items
//   for (const item of invoiceData.items) {
//     await updateOrSaveInvoiceItem(item, userId, invoiceId);
//   }

//   return invoiceId;
// };

// const updateOrSaveInvoiceItem = async (itemData, userId, invoiceId) => {
//   const item = new ItemDataModel(itemData);

//   // Check if the item exists
//   const existingItemResult = await pool.query(
//     "SELECT id FROM invoiceItems WHERE description = ? AND invoice_id = ? AND userId = ?",
//     [item.description, invoiceId, userId]
//   );

//   if (existingItemResult[0].length > 0) {
//     // Item exists, update it
//     await updateInvoiceItem(existingItemResult[0][0].id, itemData, userId);
//   } else {
//     // Item does not exist, save it as a new item
//     await saveInvoiceItem(invoiceId, itemData, userId);
//   }
// };

// // const updateOrSaveInvoiceItem = async (itemData, userId, invoiceId) => {
// //     const item = new ItemDataModel(itemData);

// //     // Check if the item exists
// //     const existingItemResult = await pool.query(
// //       "SELECT id, description FROM invoiceItems WHERE invoice_id = ? AND userId = ?",
// //       [invoiceId, userId]
// //     );

// //     const existingItem = existingItemResult[0].find(item => item.description === itemData.description);

// //     if (existingItem) {
// //       // Item exists, check if description has changed
// //       if (existingItem.description !== itemData.description) {
// //         // Description has changed, delete the existing item
// //         await deleteInvoiceItem(existingItem.id, userId);
// //         // Save the new item
// //         await saveInvoiceItem(invoiceId, itemData, userId);
// //       } else {
// //         // Update the existing item
// //         await updateInvoiceItem(existingItem.id, itemData, userId);
// //       }
// //     } else {
// //       // Item does not exist, save it as a new item
// //       await saveInvoiceItem(invoiceId, itemData, userId);
// //     }
// //   };
// // const deleteInvoiceItem = async (itemId, userId) => {
// //   try {
// //     // Execute the SQL query to delete the item
// //     await pool.query(
// //       "DELETE FROM invoiceItems WHERE id = ? AND userId = ?",
// //       [itemId, userId]
// //     );
// //     console.log(`Item with ID ${itemId} deleted successfully.`);
// //   } catch (error) {
// //     console.error(`Error deleting item with ID ${itemId}:`, error);
// //     throw error; // Propagate the error upwards
// //   }
// // };

// const saveNewInvoice = async (invoiceData, userId) => {
//   const invoice = new InvoiceDataModel(invoiceData);

//   // Generate a new invoice number if not provided
//   if (!invoice.invoiceNo) {
//     invoice.invoiceNo = await generateInvoiceNo(userId);
//   }

//   const invoiceResult = await pool.query(
//     `INSERT INTO invoice
//        (businessName, mobileNumber, alternateMobileNumber, addressLine1, addressLine2, businessEmail,
//         clientName, clientAddress, cityStateZip, clientMobile, clientGst, invoiceNo, orderNo,
//         taxableAmountValue, totalTaxAmount, cgstPercentage, cgstAmount, sgstPercentage, sgstAmount,
//         igstPercentage, igstAmount, subTotal, totalDiscount, discountAmount, shippingCharges,
//         totalAmountAfterTax, totalInvoiceAmount, userId)
//        VALUES
//        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//        [
//          invoice.businessName,
//          invoice.mobileNumber,
//          invoice.alternateMobileNumber,
//          invoice.addressLine1,
//          invoice.addressLine2,
//          invoice.businessEmail,
//          invoice.clientName,
//          invoice.clientAddress,
//          invoice.cityStateZip,
//          invoice.clientMobile,
//          invoice.clientGst,
//          invoice.invoiceNo,
//          invoice.orderNo,
//          invoice.taxableAmountValue,
//          invoice.totalTaxAmount,
//          invoice.cgstPercentage,
//          invoice.cgstAmount,
//          invoice.sgstPercentage,
//          invoice.sgstAmount,
//          invoice.igstPercentage,
//          invoice.igstAmount,
//          invoice.subTotal,
//          invoice.totalDiscount,
//          invoice.discountAmount,
//          invoice.shippingCharges,
//          invoice.totalAmountAfterTax,
//          invoice.totalInvoiceAmount,
//          userId,
//        ]
//      );

//      // Save invoice items
//      const itemPromises = invoiceData.items.map((item) =>
//        saveInvoiceItem(invoiceResult[0].insertId, item, userId)
//      );
//      await Promise.all(itemPromises);

//      return {
//        invoiceNo: invoice.invoiceNo,
//        invoiceId: invoiceResult[0].insertId,
//      };
//    };

//    const saveInvoiceItem = async (invoiceId, itemData, userId) => {
//      const item = new ItemDataModel(itemData);

//      const itemResult = await pool.query(
//        `INSERT INTO invoiceItems
//           (invoice_id, description, code, qty, amount, unitPrice, totalAmountBT, hsnCode,
//            cgst, igst, sgst, totalAmountAT, discount, taxAmount, userId)
//           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
//        [
//          invoiceId,
//          item.description,
//          item.code,
//          item.qty,
//          item.amount,
//          item.unitPrice,
//          item.totalAmountBT,
//          item.hsnCode,
//          item.cgst,
//          item.igst,
//          item.sgst,
//          item.totalAmountAT,
//          item.discount,
//          item.taxAmount,
//          userId,
//        ]
//      );

//      return itemResult[0].insertId;
//    };

//    const updateInvoiceItem = async (itemId, itemData, userId) => {
//      const item = new ItemDataModel(itemData);

//      await pool.query(
//        `UPDATE invoiceItems
//           SET description = ?, code = ?, qty = ?, amount = ?, unitPrice = ?, totalAmountBT = ?, hsnCode = ?,
//               cgst = ?, igst = ?, sgst = ?, totalAmountAT = ?, discount = ?, taxAmount = ?
//           WHERE id = ? AND userId = ?`,
//        [
//          item.description,
//          item.code,
//          item.qty,
//          item.amount,
//          item.unitPrice,
//          item.totalAmountBT,
//          item.hsnCode,
//          item.cgst,
//          item.igst,
//          item.sgst,
//          item.totalAmountAT,
//          item.discount,
//          item.taxAmount,
//          itemId,
//          userId,
//        ]
//      );
//    };

//    const saveOrUpdateInvoice = async (invoiceData, userId) => {
//      if (invoiceData.invoiceNo) {
//        // Update existing invoice
//        const invoiceId = await updateInvoice(invoiceData, userId);
//        return {
//          message: "Invoice updated successfully",
//          status: "success",
//          invoiceNo: invoiceData.invoiceNo,
//        };
//      } else {
//        // Save new invoice
//        const invoiceResult = await saveNewInvoice(invoiceData, userId);
//        return {
//          message: "Invoice saved successfully",
//          status: "success",
//          invoiceNo: invoiceResult.invoiceNo,
//        };
//      }
//    };

//    async function getInvoicesByUserID(userId) {
//      try {
//        // Retrieve invoices associated with a user from the database
//        const invoices = await pool.query(
//          "SELECT * FROM invoice WHERE userId = ? ORDER BY id DESC",
//          [userId]
//        );

//        const invoicesWithItems = [];

//        // Fetch items for each invoice
//        for (const invoice of invoices[0]) {
//          const items = await pool.query(
//            "SELECT * FROM invoiceItems WHERE invoice_id = ? AND userId = ?",
//            [invoice.id, userId]
//          );
//          invoice.items = items[0];
//          invoicesWithItems.push(invoice);
//        }

//        return {
//          message: "Invoices retrieved successfully",
//          status: "success",
//          invoices: invoicesWithItems,
//        };
//      } catch (err) {
//        return {
//          message: "Error retrieving invoices",
//          status: "error",
//          error: err.message,
//        };
//      }
//    }

//    module.exports = {
//      getInvoicesByUserID,
//      saveOrUpdateInvoice,
//    };

const pool = require("../database/db");
const { InvoiceDataModel } = require("../models/invoiceModel");
const { ItemDataModel } = require("../models/itemModel");

const generateInvoiceNo = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT invoiceNo FROM invoice WHERE userId = ? ORDER BY id DESC LIMIT 1",
      [userId]
    );

    if (result[0].length > 0) {
      const lastInvoiceNo = result[0][0].invoiceNo;
      const invoiceNumberMatch = lastInvoiceNo.match(/(\d+)$/);
      if (invoiceNumberMatch) {
        const invoiceNumber = parseInt(invoiceNumberMatch[1], 10) + 1;
        return `INV${invoiceNumber.toString().padStart(5, "0")}`;
      }
    }

    return "INV00001";
  } catch (error) {
    console.error("Error generating invoice number:", error);
    throw error; // Propagate the error upwards
  }
};

const updateInvoice = async (invoiceData, userId) => {
  const invoice = new InvoiceDataModel(invoiceData);

  const existingInvoiceResult = await pool.query(
    "SELECT id FROM invoice WHERE invoiceNo = ? AND userId = ?",
    [invoice.invoiceNo, userId]
  );

  if (existingInvoiceResult[0].length === 0) {
    throw new Error("Invoice not found");
  }

  const invoiceId = existingInvoiceResult[0][0].id;

  await pool.query(
    `UPDATE invoice 
       SET businessName = ?, mobileNumber = ?, alternateMobileNumber = ?, addressLine1 = ?, 
           addressLine2 = ?, businessEmail = ?, clientName = ?, clientAddress = ?, cityStateZip = ?, 
           clientMobile = ?, clientGst = ?, orderNo = ?, taxableAmountValue = ?, 
           totalTaxAmount = ?, cgstPercentage = ?, cgstAmount = ?, sgstPercentage = ?, 
           sgstAmount = ?, igstPercentage = ?, igstAmount = ?, subTotal = ?, totalDiscount = ?, 
           discountAmount = ?, shippingCharges = ?, totalAmountAfterTax = ?, totalInvoiceAmount = ? , gstin=?,pan=?,state=?,accountNo=?,ifsc=?
       WHERE id = ? AND userId = ?`,
    [
      invoice.businessName,
      invoice.mobileNumber,
      invoice.alternateMobileNumber,
      invoice.addressLine1,
      invoice.addressLine2,
      invoice.businessEmail,
      invoice.clientName,
      invoice.clientAddress,
      invoice.cityStateZip,
      invoice.clientMobile,
      invoice.clientGst,
      invoice.orderNo,
      invoice.taxableAmountValue,
      invoice.totalTaxAmount,
      invoice.cgstPercentage,
      invoice.cgstAmount,
      invoice.sgstPercentage,
      invoice.sgstAmount,
      invoice.igstPercentage,
      invoice.igstAmount,
      invoice.subTotal,
      invoice.totalDiscount,
      invoice.discountAmount,
      invoice.shippingCharges,
      invoice.totalAmountAfterTax,
      invoice.totalInvoiceAmount,
      
      invoice.gstin,
      invoice.pan,
      invoice.state, invoice.accountNo, invoice.ifsc,
      invoiceId,
      userId,
    ]
  );

  // Delete existing items
  await pool.query(
    "DELETE FROM invoiceItems WHERE invoice_id = ? AND userId = ?",
    [invoiceId, userId]
  );

  // Save invoice items
  for (const item of invoiceData.items) {
    await saveInvoiceItem(invoiceId, item, userId);
  }

  return invoiceId;
};

const saveInvoice = async (invoiceData, userId) => {
  const invoice = new InvoiceDataModel(invoiceData);
  console.log(invoice,'invoice');

  // Generate a new invoice number if not provided
  if (!invoice.invoiceNo) {
    invoice.invoiceNo = await generateInvoiceNo(userId);
  }

  const invoiceResult = await pool.query(
    `INSERT INTO invoice 
       (businessName, mobileNumber, alternateMobileNumber, addressLine1, addressLine2, businessEmail, 
        clientName, clientAddress, cityStateZip, clientMobile, clientGst, invoiceNo, orderNo, 
        taxableAmountValue, totalTaxAmount, cgstPercentage, cgstAmount, sgstPercentage, sgstAmount, 
        igstPercentage, igstAmount, subTotal, totalDiscount, discountAmount, shippingCharges, 
        totalAmountAfterTax, totalInvoiceAmount,gstin,pan,state,accountNo,ifsc, userId) 
       VALUES
       (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?,?)`,
    [
      invoice.businessName,
      invoice.mobileNumber,
      invoice.alternateMobileNumber,
      invoice.addressLine1,
      invoice.addressLine2,
      invoice.businessEmail,
      invoice.clientName,
      invoice.clientAddress,
      invoice.cityStateZip,
      invoice.clientMobile,
      invoice.clientGst,
      invoice.invoiceNo,
      invoice.orderNo,
      invoice.taxableAmountValue,
      invoice.totalTaxAmount,
      invoice.cgstPercentage,
      invoice.cgstAmount,
      invoice.sgstPercentage,
      invoice.sgstAmount,
      invoice.igstPercentage,
      invoice.igstAmount,
      invoice.subTotal,
      invoice.totalDiscount,
      invoice.discountAmount,
      invoice.shippingCharges,
      invoice.totalAmountAfterTax,
      invoice.totalInvoiceAmount,
      invoice.gstin,
      invoice.pan,
      invoice.state, invoice.accountNo, invoice.ifsc,
      userId,
    ]
  );

  // Save invoice items
  for (const item of invoiceData.items) {
    await saveInvoiceItem(invoiceResult[0].insertId, item, userId);
  }

  return {
    invoiceNo: invoice.invoiceNo,
    invoiceId: invoiceResult[0].insertId,
  };
};

const saveInvoiceItem = async (invoiceId, itemData, userId) => {
  console.log(itemData,'1111');
  const item = new ItemDataModel(itemData);

  console.log(item,'item11122');

  const itemResult = await pool.query(
    `INSERT INTO invoiceItems 
       (invoice_id, description, code, qty, amount, unitPrice, totalAmountBT, hsn_code, 
        cgst_rate, igst_rate, sgst_rate, totalAmountAT, discount, taxAmount, userId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      invoiceId,
      item.itemDescription,
      item.code,
      item.qty,
      item.amount,
      item.unitPrice,
      item.totalAmountBT,
      item.hsn_code,
      item.cgst,
      item.igst,
      item.sgst,
      item.totalAmountAT,
      item.discount,
      item.taxAmount,
      userId,
    ]
  );

  return itemResult[0].insertId;
};

const saveOrUpdateInvoice = async (invoiceData, userId) => {
  if (invoiceData.invoiceNo) {
    // Update existing invoice
    const invoiceId = await updateInvoice(invoiceData, userId);
    return {
      message: "Invoice updated successfully",
      status: "success",
      invoiceNo: invoiceData.invoiceNo,
    };
  } else {
    // Save new invoice
    const invoiceResult = await saveInvoice(invoiceData, userId);
    return {
      message: "Invoice saved successfully",
      status: "success",
      invoiceNo: invoiceResult.invoiceNo,

      invoiceId: invoiceResult.invoiceId,
    };
  }
};

async function getInvoicesByUserID(userId) {
  try {
    // Retrieve invoices associated with a user from the database
    const invoices = await pool.query(
      "SELECT * FROM invoice WHERE userId = ? ORDER BY id DESC",
      [userId]
    );

    const invoicesWithItems = [];

    // Fetch items for each invoice
    for (const invoice of invoices[0]) {
      const items = await pool.query(
        "SELECT * FROM invoiceItems WHERE invoice_id = ? AND userId = ?",
        [invoice.id, userId]
      );
      invoice.items = items[0];
      invoicesWithItems.push(invoice);
    }

    return {
      message: "Invoices retrieved successfully",
      status: "success",
      invoices: invoicesWithItems,
    };
  } catch (err) {
    return {
      message: "Error retrieving invoices",
      status: "error",
      error: err.message,
    };
  }
}

async function getInvoicesByInvoiceNo(invoiceNo, userId) {
  try {
    // Retrieve invoices associated with a user from the database
    const invoices = await pool.query(
      "SELECT * FROM invoice WHERE invoiceNo=? AND userId = ?",
      [invoiceNo, userId]
    );

    const invoicesWithItems = [];

    // Fetch items for each invoice
    for (const invoice of invoices[0]) {
      const items = await pool.query(
        "SELECT * FROM invoiceItems WHERE invoice_id = ? AND userId = ?",
        [invoice.id, userId]
      );
      invoice.items = items[0];
      invoicesWithItems.push(invoice);
    }

    return {
      message: "Invoices retrieved successfully",
      status: "success",
      invoices: invoicesWithItems,
    };
  } catch (err) {
    return {
      message: "Error retrieving invoices",
      status: "error",
      error: err.message,
    };
  }
}

module.exports = {
  getInvoicesByUserID,
  saveOrUpdateInvoice,
  getInvoicesByInvoiceNo,
};
