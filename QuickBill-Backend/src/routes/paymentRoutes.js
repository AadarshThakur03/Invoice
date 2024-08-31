const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const authenticateUser = require("../services/authService");

// Route to create an order
router.post('/orders',authenticateUser, paymentController.createOrder);

// Route to verify a payment
router.post('/verify-payment',authenticateUser, paymentController.verifyPayment);

router.post('/webhookHandler',paymentController.webhookHandler);


module.exports = router;
