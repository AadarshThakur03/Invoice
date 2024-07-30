import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarStateService } from '../../services/activeScreen.service';
import { DataService } from '../../services/data.service';
import { ProfileCompletion } from '../../services/profileCompletion.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
})
export class UserDashboardComponent implements OnInit {
  businessCount: number = 0;
  clientsCount: number = 0;
  invoiceCount: number = 0;
  itemCount: number = 0;
  completionPercentage: number = 0;
  cardsData: any[] = [
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
  ];
  cards = [
    {
      title: 'Invoices',
      icon: 'fa-solid fa-file-invoice-dollar',
      text: 'Manage your invoices, track payments, and generate new ones.',
      linkText: 'View Invoices',
      link: '/user-homepage/edit-invoice',
    },
    {
      title: 'Business',
      icon: 'fa-solid fa-building',
      text: 'Configure your business details, settings, and preferences.',
      linkText: 'Manage Business',
      link: '/user-homepage/view-business',
    },
    {
      title: 'Clients',
      icon: 'fa-solid fa-users',
      text: 'Keep track of your clients, their contact information, and invoices.',
      linkText: 'View Clients',
      link: '/user-homepage/view-client',
    },
    {
      title: 'Items',
      icon: 'fa-solid fa-store',
      text: 'Manage the items and services you offer to your clients.',
      linkText: 'View Items',
      link: '/user-homepage/view-items',
    },
  ];

  constructor(
    private router: Router,
    private sidebarStateService: SidebarStateService,
    private dataService: DataService,
    private profileCompletion: ProfileCompletion
  ) {}

  ngOnInit() {
    this.profileCompletion.setIncompleteItems(['business', 'client', 'item']);
    
    this.dataService.getBusinessByUserId().subscribe((data: any) => {
      this.businessCount = data?.business?.length ?? 0;
      if (this.businessCount > 1) {
        this.profileCompletion.updateProfileCompletion('business', true);
      }
      this.updateCompletionPercentage();
    });
    
    this.dataService.getClientByUserId().subscribe((data: any) => {
      this.clientsCount = data?.client?.length ?? 0;
      if (this.clientsCount > 1) {
        this.profileCompletion.updateProfileCompletion('client', false);
      }
      this.updateCompletionPercentage();
    });
    
    this.dataService.getItemByUserId().subscribe((data: any) => {
      this.itemCount = data?.item?.length ?? 0;
      if (this.itemCount > 1) {
        this.profileCompletion.updateProfileCompletion('item', true);
      }
      this.updateCompletionPercentage();
    });
    
    this.dataService.getInvoiceByuserId().subscribe((data: any) => {
      const invoices = data?.invoices ?? [];
      this.invoiceCount = invoices.length;
      
      this.cardsData = invoices.map((invoice: any) => ({
        title: 'Your Last Invoice',
        invoiceDetails: {
          invoiceNo: invoice?.invoiceNo ?? 'N/A',
          business: invoice?.businessName ?? 'N/A',
          client: invoice?.clientName ?? 'N/A',
          invoiceDate: invoice?.created_at?.slice(0, 10) ?? 'N/A',
          amount: invoice?.totalInvoiceAmount ?? 0,
        },
        buttonText: 'Edit Invoice',
      }));
    });
  }

  private updateCompletionPercentage() {
    this.completionPercentage = this.profileCompletion.getCompletionPercentage() ?? 0;
    console.log('Completion Percentage:', this.completionPercentage);
  }

  createNewInvoice() {
    console.log('Creating a new invoice');
  }

  navigateTo(invoiceNo: string) {
    this.router.navigate(['/user-homepage/create-invoice'], {
      state: { invoiceNo, edit: true },
    });
    this.sidebarStateService.setActiveScreen('create-invoice');
  }
}
