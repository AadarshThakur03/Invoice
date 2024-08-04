const Razorpay = require('razorpay');

const razorpay = new Razorpay({
  key_id: 'rzp_test_haw8OcRjxUYwuw', // Replace with your Razorpay Key ID
  key_secret: 'gMGzXheCbvCf22Ll3qqTf0SP' // Replace with your Razorpay Key Secret
});

module.exports = razorpay;
