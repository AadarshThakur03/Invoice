const express = require("express");
const authenticateUser = require("../services/authService");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

router.get("/get-invoices", authenticateUser, invoiceController.getInvoicesByUserID);
router.get("/get-invoiceData/:invoiceNo", authenticateUser, invoiceController.getInvoicesByInvoiceNo);
router.post("/add-invoice", authenticateUser, invoiceController.addInvoice);

module.exports = router;
