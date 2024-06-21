import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarStateService } from '../../services/activeScreen.service';
import { DataService } from '../../services/data.service';

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
        invoiceNo: '123',
        business: 'John Doe',
        client: '',
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
  cards = [
    {
      title: 'Invoices',
      icon: 'fa-solid fa-file-invoice-dollar',
      text: 'Manage your invoices, track payments, and generate new ones.',
      linkText: 'View Invoices',
      link: '#'
    },
    {
      title: 'Business',
      icon: 'fa-solid fa-building',
      text: 'Configure your business details, settings, and preferences.',
      linkText: 'Manage Business',
      link: '#'
    },
    {
      title: 'Clients',
      icon: 'fa-solid fa-users',
      text: 'Keep track of your clients, their contact information, and invoices.',
      linkText: 'View Clients',
      link: '#'
    },
    {
      title: 'Items',
      icon: 'fa-solid fa-store',
      text: 'Manage the items and services you offer to your clients.',
      linkText: 'View Items',
      link: '#'
    }
  ];


  constructor(
    private router: Router,
    private sidebarStateService: SidebarStateService,
    private dataService: DataService
  ) {
    this.dataService.getInvoiceByuserId().subscribe((data: any) => {
      console.log(data.invoices, 'invoice');
      this.cardsData = data.invoices.map((data: any) => {
        return {
          title: 'Your Last Invoice',
          invoiceDetails: {
            invoiceNo: data.invoiceNo,
            business: data.businessName,
            client: data.clientName,
            invoiceDate: data.created_at.slice(0, 10),
            amount: data.totalInvoiceAmount,
          },
          buttonText: 'Edit Invoice',
        };
      });
    });
  }

  createNewInvoice() {
    // Add logic to create a new invoice
    console.log('Creating a new invoice');
  }
  navigateTo(invoiceNo: string) {
    this.router.navigate(['/user-homepage/create-invoice'], {
      state: { invoiceNo: invoiceNo, edit: true },
    });
    this.sidebarStateService.setActiveScreen('create-invoice');
  }
}
