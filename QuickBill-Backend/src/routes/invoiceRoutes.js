const express = require("express");
const authenticateUser = require("../services/authService");
const invoiceController = require("../controllers/invoiceController");

const router = express.Router();

router.get("/", authenticateUser, invoiceController.getInvoicesByUserID);
router.post("/add-invoice", authenticateUser, invoiceController.addInvoice);

module.exports = router;
