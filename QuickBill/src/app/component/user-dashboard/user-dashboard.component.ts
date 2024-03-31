import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarStateService } from '../../services/activeScreen.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
})
export class UserDashboardComponent {
  cardsData = [
    {
      title: 'Your Last Invoice',
      invoiceDetails: {
        invoiceNo: 123,
        billedTo: 'John Doe',
        invoiceDate: '2024-03-19',
        amount: 100,
      },
      buttonText: 'Create New Invoice',
    },
    // {
    //   title: 'Card 2',
    //   invoiceDetails: {
    //     billedTo: 'Jane Smith',
    //     invoiceDate: '2024-03-20',
    //     amount: 150,
    //   },
    //   buttonText: 'Pay Invoice',
    // },
    // {
    //   title: 'Card 3',
    //   invoiceDetails: {
    //     billedTo: 'Alice Johnson',
    //     invoiceDate: '2024-03-21',
    //     amount: 200,
    //   },
    //   buttonText: 'Pay Invoice',
    // },
  ];

  constructor(private router:Router,private sidebarStateService: SidebarStateService) {}

  createNewInvoice() {
    // Add logic to create a new invoice
    console.log('Creating a new invoice');
  }
  navigateTo(){
    this.router.navigate(['/user-homepage/create-invoice']);
    this.sidebarStateService.setActiveScreen('create-invoice');
  }
}
