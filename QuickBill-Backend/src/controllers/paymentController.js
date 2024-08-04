const razorpay = require('../config');
const crypto = require('crypto');
const { createOrder } = require('../models/orderModel');

// Handle order creation
exports.createOrder = async (req, res) => {
  const { amount, currency, receipt } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: currency,
      receipt: receipt
    });

    // Optionally, save the order details to the database
    await createOrder(order);

    res.json(order); // Return the order as JSON
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' }); // Return error as JSON
  }
};

// Verify payment
exports.verifyPayment = (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log(req.body);

  // Generate signature
  const generatedSignature = crypto.createHmac('sha256', 'gMGzXheCbvCf22Ll3qqTf0SP')
    .update(`${orderId}|${paymentId}`)
    .digest('hex');

    console.log(generatedSignature===signature);

  if (generatedSignature === signature) {
    // Payment is verified
    res.json({ success: true, message: 'Payment verified successfully',data: req.body }); // Return success as JSON
  } else {
    // Payment verification failed
    res.status(400).json({ error: 'Payment verification failed' }); // Return error as JSON
  }
};
