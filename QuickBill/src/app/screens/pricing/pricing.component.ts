import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';

declare var Razorpay: any;

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent {
  trialDaysLeft = 5;
  @Input() pricingScreen: boolean = true;
  currentUser: any;

  constructor(private http: HttpClient, private authService: AuthService,private cd: ChangeDetectorRef) {}

  ngOnInit(){
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user?.user ?? null; // Handle potential null values
      console.log(this.currentUser);
      
    });

  }
  currentOrder:any;
  payNow(plan: any) {
    const amountInPaise = this.convertPriceToPaise(plan.newPrice);
  
    this.http.post('https://d832-205-254-166-87.ngrok-free.app/payments/orders', {
      amount: amountInPaise,
      currency: 'INR',
      planName: plan.name,
      receipt: 'receipt#' + new Date().getTime()
    }).subscribe((order: any) => {
      console.log(order, 'Order created successfully');
      
      this.currentOrder = {
        id: order.id,
        amount: order.amount / 100, // Convert back to INR
        currency: order.currency,
        receipt: order.receipt
      };
      this.cd.detectChanges(); // Ensure Angular detects changes
  
      const options = {
        key: 'rzp_test_haw8OcRjxUYwuw',
        amount: amountInPaise, // Ensure this is in paise
        currency: 'INR',
        name: this.currentUser?.username,
        description: ``,
        order_id: order.id,
        handler: (response: any) => {
          this.verifyPayment(response);
        },
        prefill: {
          name: this.currentUser?.username,
          email: this.currentUser?.email,
          contact: 9321998638
        },
        theme: {
          color: '#6466e3'
        },
        modal: {
          ondismiss: () => {
            console.log('Payment modal was closed by the user');
            alert('Payment process was cancelled.');
          }
        }
      };
  
      const rzp = new Razorpay(options);
      rzp.open();
    }, error => {
      console.error('Error creating order:', error);
    });
  }
  
  
  

  verifyPayment(paymentResponse: any) {
    console.log(paymentResponse, 'fromReact');

    this.http.post('https://d832-205-254-166-87.ngrok-free.app/payments/verify-payment', {
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
    // Handle cases where price might be 'Free'
    if (price === 'Free') return 0;
  
    const numericPrice = parseFloat(price.replace('₹', '').replace(/,/g, ''));
    return Math.round(numericPrice); // Convert to paise
  }

  plans = [
    {
      name: 'Basic',
      oldPrice: '₹150',
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
      oldPrice: '₹700',
      newPrice: '₹500',
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
      oldPrice: '₹1200',
      newPrice: '₹1000',
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
