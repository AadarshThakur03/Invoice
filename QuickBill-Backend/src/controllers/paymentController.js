const razorpay = require('../config');
const crypto = require('crypto');
const pool = require('../database/db'); // Ensure you have a MySQL connection setup

// Handle order creation
exports.createOrder = async (req, res) => {
  const { amount, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: currency,
      receipt: 'receipt#' + new Date().getTime()
    });

    // Save the transaction record with status 'initiated'
    await pool.query(
      'INSERT INTO transactions (order_id, userId,  transaction_status) VALUES (?, ?, ?)',
      [order.id, 1, 'initated']
    );

    res.json(order); // Return the order as JSON
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Error creating order' }); // Return error as JSON
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  const { orderId, signature } = req.body;

  // Generate signature
  const generatedSignature = crypto.createHmac('sha256', 'your_secret')
    .update(`${orderId}`)
    .digest('hex');

  if (generatedSignature === signature) {
    // Update transaction status to 'completed'
    await pool.query(
      'UPDATE transactions SET status = ? WHERE order_id = ?',
      ['completed', orderId]
    );

    res.json({ success: true, message: 'Payment verified successfully', data: req.body });
  } else {
    res.status(400).json({ error: 'Payment verification failed' });
  }
};

// // Handle Razorpay webhooks
// exports.webhookHandler = async (req, res) => {
//   const webhookSecret = 'your_webhook_secret';
//   const receivedSignature = req.headers['x-razorpay-signature'];

//   // Generate expected signature
//   const expectedSignature = crypto.createHmac('sha256', webhookSecret)
//     .update(JSON.stringify(req.body))
//     .digest('hex');

//   if (expectedSignature === receivedSignature) {
//     const event = req.body.event;

//     if (event === 'payment.failed') {
//       const { order_id, payment_id, error_code, error_description } = req.body.payload.payment.entity;

//       console.log('Payment failed for Order ID:', order_id);
//       console.log('Payment ID:', payment_id);
//       console.log('Error Code:', error_code);
//       console.log('Error Description:', error_description);

//       // Update transaction status to 'failed'
//       await pool.query(
//         'UPDATE transactions SET payment_id = ?, status = ? WHERE order_id = ?',
//         [payment_id, 'failed', order_id]
//       );

//       res.json({ status: 'ok' });
//     } else {
//       res.json({ status: 'ignored' });
//     }
//   } else {
//     res.status(400).json({ status: 'invalid signature' });
//   }
// };
