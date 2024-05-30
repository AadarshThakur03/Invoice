const pool = require("../database/db");
const { InvoiceDataModel } = require("../models/invoiceModel");

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

  console.log(invoice);
  const existingInvoiceResult = await pool.query(
    "SELECT id FROM invoice WHERE invoiceNo = ? AND userId = ?",
    [invoice.invoiceNo, userId]
  );

  if (existingInvoiceResult.length === 0) {
    throw new Error("Invoice not found");
  }

  const invoiceId = existingInvoiceResult[0][0].id;

  await pool.query(
    `UPDATE invoice 
       SET businessName = ?, mobileNumber = ?, alternateMobileNumber = ?, addressLine1 = ?, 
           addressLine2 = ?, businessEmail = ?, clientName = ?, clientAddress = ?, cityStateZip = ?, 
           clientMobile = ?, clientGst = ?, orderNo = ?, date = ?, taxableAmountValue = ?, 
           totalTaxAmount = ?, cgstPercentage = ?, cgstAmount = ?, sgstPercentage = ?, 
           sgstAmount = ?, igstPercentage = ?, igstAmount = ?, subTotal = ?, totalDiscount = ?, 
           discountAmount = ?, shippingCharges = ?, totalAmountAfterTax = ?, totalInvoiceAmount = ? 
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
      invoice.date,
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
      invoiceId,
      userId,
    ]
  );

  // Update invoice items
  console.log(invoiceData.items, "uite");
  for (const item of invoiceData.items) {
    await updateOrSaveInvoiceItem(item, userId, invoiceId);
  }

  return invoiceId;
};

const updateOrSaveInvoiceItem = async (itemData, userId,invoiceId) => {
  const { description } = itemData;
  console.log(description);

  // Check if the item exists
  const existingItemResult = await pool.query(
    "SELECT id FROM invoiceItems WHERE description = ? AND userId = ?",
    [description, userId]
  );
  console.log(existingItemResult[0]);

  if (existingItemResult[0].length > 0) {
    console.log("item exists");
    updateInvoiceItem(itemData, userId, invoiceId)
    // Item exists, update itF
  } else {
    console.log("item new");
    saveInvoiceItem(invoiceId,itemData )
    // Item does not exist, save it as a new item
  }
};

const saveNewInvoice = async (invoiceData, userId) => {
  const invoice = new InvoiceDataModel(invoiceData);

  // Generate a new invoice number if not provided
  if (!invoice.invoiceNo) {
    invoice.invoiceNo = await generateInvoiceNo(userId);
  }

  const invoiceResult = await pool.query(
    `INSERT INTO invoice 
       (businessName, mobileNumber, alternateMobileNumber, addressLine1, addressLine2, businessEmail, 
        clientName, clientAddress, cityStateZip, clientMobile, clientGst, invoiceNo, orderNo, date, 
        taxableAmountValue, totalTaxAmount, cgstPercentage, cgstAmount, sgstPercentage, sgstAmount, 
        igstPercentage, igstAmount, subTotal, totalDiscount, discountAmount, shippingCharges, 
        totalAmountAfterTax, totalInvoiceAmount, userId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
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
      invoice.date,
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
      userId,
    ]
  );

  // Save invoice items
  const itemPromises = invoiceData.items.map((item) =>
    saveInvoiceItem(invoiceResult[0].insertId, item, userId)
  );
  await Promise.all(itemPromises);

  return {
    invoiceNo: invoice.invoiceNo,
    invoiceId: invoiceResult[0].insertId,
  };
};

const saveInvoiceItem = async (invoiceId, itemDatas, userId) => {
    const itemData = new InvoiceDataModel(itemDatas);

  const itemResult = await pool.query(
    `INSERT INTO invoiceItems 
       (invoice_id, description, code, qty, amount, unitPrice, totalAmountBT, hsnCode, 
        cgst, igst, sgst, totalAmountAT, discount, taxAmount, userId) 
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      invoiceId,
      itemData.description,
      itemData.code,
      itemData.qty,
      itemData.amount,
      itemData.unitPrice,
      itemData.totalAmountBT,
      itemData.hsnCode,
      itemData.cgst,
      itemData.igst,
      itemData.sgst,
      itemData.totalAmountAT,
      itemData.discount,
      itemData.taxAmount,
      userId,
    ]
  );

  return itemResult.insertId;
};

const updateInvoiceItem = async (itemDatas, userId, invoiceId) => {
    const itemData = new InvoiceDataModel(itemDatas);

  console.log(itemData, "up");
  const {
    id,
    description,
    code,
    qty,
    amount,
    unitPrice,
    totalAmountBT,
    hsnCode,
    cgst,
    igst,
    sgst,
    totalAmountAT,
    discount,
    taxAmount,
  } = itemData;

  await pool.query(
    `UPDATE invoiceItems 
       SET description = ?, code = ?, qty = ?, amount = ?, unitPrice = ?, totalAmountBT = ?, hsnCode = ?, 
           cgst = ?, igst = ?, sgst = ?, totalAmountAT = ?, discount = ?, taxAmount = ?
       WHERE invoice_id = ? AND userId = ?`,
    [
      description,
      code,
      qty,
      amount,
      unitPrice,
      totalAmountBT,
      hsnCode,
      cgst,
      igst,
      sgst,
      totalAmountAT,
      discount,
      taxAmount,
      invoiceId,
      userId,
    ]
  );
};

const saveOrUpdateInvoice = async (invoiceData, userId) => {
  if (invoiceData.invoiceNo) {
    // Update existing invoice
    const invoiceId = await updateInvoice(invoiceData, userId);
    // const itemPromises = invoiceData.items.map((item) =>
    //   saveInvoiceItem(invoiceId, item, userId)
    // );
    // await Promise.all(itemPromises);
    return {
      message: "Invoice updated successfully",
      status: "success",
      invoiceNo: invoiceData.invoiceNo,
    };
  } else {
    // Save new invoice
    const invoiceResult = await saveNewInvoice(invoiceData, userId);
    // const itemPromises = invoiceData.items.map((item) =>
    //   saveInvoiceItem(invoiceResult.invoiceId, item, userId)
    // );
    // await Promise.all(itemPromises);
    return {
      message: "Invoice saved successfully",
      status: "success",
      invoiceNo: invoiceResult.invoiceNo,
    };
  }
};

async function getInvoicesByUserID(userId) {
  try {
    // Retrieve invoices associated with a user from the database
    const invoices = await pool.query(
      "SELECT * FROM invoices WHERE userId = ? ORDER BY id DESC",
      [userId]
    );

    const invoicesWithItems = [];

    // Fetch items for each invoice
    for (const invoice of invoices) {
      const items = await pool.query(
        "SELECT * FROM invoice_items WHERE invoice_id = ? AND userId=?",
        [invoice.id]
      );
      invoice.items = items;
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
};
