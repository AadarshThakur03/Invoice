import { Component, Input } from '@angular/core';

declare var Razorpay: any; 
@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  trialDaysLeft = 5; // Example trial period days left
  @Input() pricingScreen: boolean = true;
  payNow() {
    const RozarpayOptions = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: 100000,
      name: 'Sai',
      key: 'rzp_test_ub9SQ6yNcg45qb',
      image: 'https://i.imgur.com/FApqk3D.jpeg',
      prefill: {
        name: 'sai kumar',
        email: 'sai@gmail.com',
        phone: '9898989898'
      },
      theme: {
        color: '#6466e3'
      },
      modal: {
        ondismiss:  () => {
          console.log('dismissed')
        }
      }
    }

    const successCallback = (paymentid: any) => {
      console.log(paymentid);
    }

    const failureCallback = (e: any) => {
      console.log(e);
    }

    Razorpay.open(RozarpayOptions,successCallback, failureCallback)
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
