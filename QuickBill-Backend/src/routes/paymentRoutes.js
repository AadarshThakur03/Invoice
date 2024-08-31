const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to create an order
router.post('/orders', paymentController.createOrder);

// Route to verify a payment
router.post('/verify-payment', paymentController.verifyPayment);

router.post('/webhookHandler', paymentController.webhookHandler);


module.exports = router;
