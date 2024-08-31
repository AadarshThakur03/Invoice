import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';

declare var Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  trialDaysLeft = 5;
  @Input() pricingScreen: boolean = true;

  constructor(private http: HttpClient) {}

  payNow(plan: any) {
    const amountInPaise = this.convertPriceToPaise(plan.newPrice);

    this.http.post('https://e793-205-254-166-87.ngrok-free.app/payments/orders', {
      amount: amountInPaise,
      currency: 'INR',
      receipt: 'receipt#' + new Date().getTime() // Generate a unique receipt ID
    }).subscribe((order: any) => {
      const options = {
        key: 'rzp_test_haw8OcRjxUYwuw', // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: (response: any) => {
          this.verifyPayment(response);
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          phone: '9999999999'
        },
        theme: {
          color: '#6466e3'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal was closed by the user');
            // Show a message or handle modal close
            alert('Payment process was cancelled.');
          }
        }
      };

      const rzp = new Razorpay(options);
      rzp.open();
    }, error => {
      console.error('Error creating order:', error);
      // Handle error creating order
    });
  }

  verifyPayment(paymentResponse: any) {
    console.log(paymentResponse, 'fromReact');

    this.http.post('https://e793-205-254-166-87.ngrok-free.app/payments/verify-payment', {
      orderId: paymentResponse.razorpay_order_id,
      paymentId: paymentResponse.razorpay_payment_id,
      signature: paymentResponse.razorpay_signature
    }).subscribe(response => {
      console.log('Payment verified:', response);
      // Handle successful payment verification
      alert('Payment verified successfully!');
    }, error => {
      console.error('Payment verification failed:', error);
      // Handle payment verification failure
      alert('Payment verification failed. Please try again.');
    });
  }

  convertPriceToPaise(price: string): number {
    const numericPrice = parseFloat(price.replace('$', ''));
    return Math.round(numericPrice * 100); // Convert to paise
  }

  plans = [
    {
      name: 'Basic',
      oldPrice: '$15',
      newPrice: 'Free',
      benefits: [
        { icon: 'fas fa-download', text: 'Limited download count' },
        { icon: 'fas fa-save', text: 'Save up to 10 invoices' },
        { icon: 'fas fa-headset', text: 'Basic support' },
        { icon: 'fas fa-file-invoice', text: 'Basic invoicing features' },
        { icon: 'fas fa-cloud', text: 'Cloud storage up to 1GB' },
      ],
      buttonText: 'Get Started',
      popular: false,
    },
    {
      name: 'Simple',
      oldPrice: '$20',
      newPrice: '$10',
      benefits: [
        { icon: 'fas fa-download', text: 'Unlimited download count' },
        { icon: 'fas fa-save', text: 'Save up to 100 invoices' },
        { icon: 'fas fa-headset', text: 'Priority support' },
        { icon: 'fas fa-file-invoice', text: 'Advanced invoicing features' },
        { icon: 'fas fa-cloud', text: 'Cloud storage up to 10GB' },
      ],
      buttonText: 'Subscribe',
      popular: true,
    },
    {
      name: 'Super',
      oldPrice: '$30',
      newPrice: '$20',
      benefits: [
        { icon: 'fas fa-download', text: 'Unlimited download count' },
        { icon: 'fas fa-save', text: 'Save unlimited invoices' },
        { icon: 'fas fa-headset', text: '24/7 support' },
        { icon: 'fas fa-file-invoice', text: 'All invoicing features' },
        { icon: 'fas fa-cloud', text: 'Unlimited cloud storage' },
      ],
      buttonText: 'Subscribe',
      popular: false,
    },
  ];
}
