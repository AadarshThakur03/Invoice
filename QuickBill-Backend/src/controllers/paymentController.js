const razorpay = require("../config");
const crypto = require("crypto");
const pool = require("../database/db"); // Ensure you have a MySQL connection setup

// Handle order creation
exports.createOrder = async (req, res) => {
  const { amount, receipt, planName } = req.body;
  console.log(req.body);

  try {
    // Validate userId
    console.log(req.userId);

    if (!req.userId) {
      return res.status(400).json({ error: "Invalid User" });
    }

    // Reuse existing order if it exists with status 'initiated'
    // Uncomment if needed
    /*
    const [existingOrders] = await pool.query(
      "SELECT * FROM transactions WHERE userId = ? AND status = 'initiated'",
      [req.userId]
    );

    if (existingOrders.length > 0) {
      const activeOrderId = existingOrders[0].order_id;
      console.log('Reusing existing order ID:', activeOrderId);

      // Return existing order details
      return res.json({ id: activeOrderId, amount: existingOrders[0].amount, currency: 'INR', receipt });
    }
    */

    // Create a new order
    const order = await razorpay.orders.create({
      amount: amount * 100, // amount in paise
      currency: 'INR',
      receipt: receipt,
    });

    // Save the transaction record with status 'initiated'
    await pool.query(
      "INSERT INTO transactions (order_id, userId, amount, status, plan_name) VALUES (?, ?, ?, ?, ?)",
      [order.id, req.userId, amount, 'initiated', planName] // Save amount in paise
    );

    res.json(order); // Return the order as JSON
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message || "Error creating order" });
  }
};

// Verify payment
exports.verifyPayment = async (req, res) => {
  const { orderId, paymentId, signature } = req.body;
  const razorpaySecret = process.env.RAZORPAY_SECRET || 'gMGzXheCbvCf22Ll3qqTf0SP'; // Use environment variable

  try {
    // Generate the signature
    const generatedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(`${orderId}|${paymentId}`)
      .digest("hex");

    // Check if the generated signature matches the provided signature
    if (generatedSignature === signature) {
      // Update the transaction record to mark the payment as successful
      await pool.query(
        "UPDATE transactions SET payment_id = ?, status = ? WHERE order_id = ?",
        [paymentId, 'success', orderId]
      );

      res.json({
        success: true,
        message: "Payment verified successfully",
        data: req.body,
      });
    } else {
      res.status(400).json({ error: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: error.message || "Error verifying payment" });
  }
};

// Handle Razorpay webhooks
exports.webhookHandler = async (req, res) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET || '!!!@@@###$$$567890'; // Use environment variable
  const receivedSignature = req.headers['x-razorpay-signature'];

  try {
    // Parse the request body as raw buffer
    const body = JSON.stringify(req.body);

    // Generate expected signature
    const expectedSignature = crypto.createHmac('sha256', webhookSecret)
      .update(body)
      .digest('hex');

    if (expectedSignature === receivedSignature) {
      const event = req.body.event;
      const paymentDetails = req.body.payload.payment.entity;

      switch (event) {
        case 'payment.captured':
        case 'payment.failed':
        case 'payment.pending':
          const { order_id, payment_id, amount, method, fee, status } = paymentDetails;
          console.log(paymentDetails, 'Payment details from webhook');

          // Update transaction record
          await pool.query(
            `UPDATE transactions 
             SET payment_id = ?, amount = ?, method = ?, fee = ?, status = ?
             WHERE order_id = ?`,
            [payment_id, amount/100, method, fee/100, status, order_id] // amount and fee should be in paise
          );
          break;

        default:
          console.log('Unhandled event:', event);
          break;
      }

      res.json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'invalid signature' });
    }
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).json({ status: 'error', message: error.message || "Error handling webhook" });
  }
};
