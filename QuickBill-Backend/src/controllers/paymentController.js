const razorpay = require("../config");
const crypto = require("crypto");
const pool = require("../database/db"); // Ensure you have a MySQL connection setup

// Handle order creation
exports.createOrder = async (req, res) => {
  const { amount, receipt, currency } = req.body;

  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: currency,
      receipt: receipt,
    });

    const [existingUser] = await pool.query(
      "SELECT * FROM transactions where userId=? and transaction_status=?",
      [1, "initated"]
    );
    console.log(existingUser);

    if (existingUser.length > 0) {
      const activeOrderId = existingUser[0].order_id;
     
      order.id = activeOrderId;
      console.log(order);
      return res.json(order);
    }

    // Save the transaction record with status 'initiated'
    await pool.query(
      "INSERT INTO transactions (order_id, userId,  transaction_status) VALUES (?, ?, ?)",
      [order.id, 1, "initated"]
    );
    console.log(order, "from createOrder");

    res.json(order); // Return the order as JSON
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating order" }); // Return error as JSON
  }
};

// Verify payment
// Verify payment
exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  console.log(orderId);

  const generatedSignature = crypto
    .createHmac("sha256", "gMGzXheCbvCf22Ll3qqTf0SP")
    .update(`${orderId}|${paymentId}`)
    .digest("hex");

  console.log(generatedSignature === signature);

  if (generatedSignature === signature) {
    await pool.query(
      "UPDATE transactions SET payment_id = ?, transaction_status = ? WHERE order_id = ?",
      [paymentId, "success", orderId]
    );
    // Payment is verified
    res.json({
      success: true,
      message: "Payment verified successfully",
      data: req.body,
    });

    
  } else {
    res.status(400).json({ error: "Payment verification failed" });
  }
};
// Handle Razorpay webhooks
// Handle Razorpay webhooks
exports.webhookHandler = async (req, res) => {
  const webhookSecret = '!!!@@@###$$$567890'; // Replace with your actual webhook secret
  const receivedSignature = req.headers['x-razorpay-signature'];
  // console.log('Received webhook request');
  // console.log('Request Headers:', req.headers);
  // console.log('Request Body:', req.body)

  // Generate expected signature
  const expectedSignature = crypto.createHmac('sha256', webhookSecret)
    .update(JSON.stringify(req.body))
    .digest('hex');

  if (expectedSignature === receivedSignature) {
    const event = req.body.event;

    console.log(req.body.payload.payment.entity,'captured');
    switch (event) {
      case 'payment.captured':
        console.log(req.body.payload.payment.entity,'captured');
        
        const capturedPayment = req.body.payload.payment.entity;
        const { order_id: capturedOrderId, payment_id: capturedPaymentId } = capturedPayment;
        console.log('Payment captured for Order ID:', capturedOrderId);
        console.log('Payment ID:', capturedPaymentId);

        // Update transaction status to 'success'
        await pool.query(
          'UPDATE transactions SET payment_id = ?, transaction_status = ? WHERE order_id = ?',
          [capturedPaymentId, 'success', capturedOrderId]
        );
        break;

      case 'payment.failed':
        const failedPayment = req.body.payload.payment.entity;
        const { order_id: failedOrderId, error_code, error_description } = failedPayment;
        console.log('Payment failed for Order ID:', failedOrderId);
        console.log('Error Code:', error_code);
        console.log('Error Description:', error_description);

        // Update transaction status to 'failed'
        await pool.query(
          'UPDATE transactions SET transaction_status = ? WHERE order_id = ?',
          ['failed', failedOrderId]
        );
        break;

      case 'payment.pending':
        const pendingPayment = req.body.payload.payment.entity;
        const { order_id: pendingOrderId } = pendingPayment;
        console.log('Payment pending for Order ID:', pendingOrderId);

        // Optionally, update transaction status to 'pending'
        await pool.query(
          'UPDATE transactions SET transaction_status = ? WHERE order_id = ?',
          ['pending', pendingOrderId]
        );
        break;

      // Handle other events as needed

      default:
        console.log('Unhandled event:', event);
        break;
    }

    res.json({ status: 'ok' });
  } else {
    res.status(400).json({ status: 'invalid signature' });
  }
};
