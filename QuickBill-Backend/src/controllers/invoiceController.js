const invoiceService = require("../services/invoiceService");

async function getInvoicesByUserID(req, res) {
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  try {
    const invoices = await invoiceService.getInvoicesByUserID(req.userId);
    res.json(invoices);
  } catch (err) {
    res.status(500).send(`Error fetching invoices: ${err.message}`);
  }
}

async function getInvoicesByInvoiceNo(req, res) {
  const { invoiceNo } = req.params;
  if (req.userId == "" || req.userId == undefined) {
    return res.json({ error: "Invalid User" });
  }
  try {
    const invoices = await invoiceService.getInvoicesByInvoiceNo(
      invoiceNo,
      req.userId
    );
    res.json(invoices);
  } catch (err) {
    res.status(500).send(`Error fetching invoices: ${err.message}`);
  }
}

async function addInvoice(req, res) {
  const invoiceData = req.body;
  if (!req.userId) {
    return res.json({ error: "Invalid User" });
  }
  if (!invoiceData || Object.keys(invoiceData).length === 0) {
    return res.json({ error: "Empty request!!" });
  }
  try {
    const result = await invoiceService.saveOrUpdateInvoice(
      invoiceData,
      req.userId
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  addInvoice,
  getInvoicesByUserID,
  getInvoicesByInvoiceNo
};
