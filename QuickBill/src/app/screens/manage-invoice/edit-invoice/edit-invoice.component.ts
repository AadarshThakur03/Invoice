import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-invoice',
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent {
  search: string = '';
  sort: { key: string, order: string } = { key: 'invoiceNumber', order: 'asc' };
  page: number = 1;
  pageSize: number = 10;
  showSortDropdown: boolean = false;
  invoices: any[] = [
    { invoiceNumber: 'INV-001', date: '2023-04-15', business: 'Acme Inc.', client: 'John Doe', amount: 1500.0 },
    { invoiceNumber: 'INV-002', date: '2023-03-20', business: 'Globex Corp.', client: 'Jane Smith', amount: 2800.75 },
    { invoiceNumber: 'INV-003', date: '2023-02-05', business: 'Stark Industries', client: 'Tony Stark', amount: 950.0 },
    { invoiceNumber: 'INV-004', date: '2023-01-30', business: 'Wayne Enterprises', client: 'Bruce Wayne', amount: 3200.5 },
    { invoiceNumber: 'INV-005', date: '2023-01-15', business: 'Stark Industries', client: 'Pepper Potts', amount: 1200.0 },
    { invoiceNumber: 'INV-006', date: '2023-01-01', business: 'Acme Inc.', client: 'John Doe', amount: 2500.0 },
    { invoiceNumber: 'INV-007', date: '2022-12-20', business: 'Globex Corp.', client: 'Jane Smith', amount: 1800.25 },
    { invoiceNumber: 'INV-008', date: '2022-11-10', business: 'Wayne Enterprises', client: 'Selina Kyle', amount: 1400.0 },
    { invoiceNumber: 'INV-009', date: '2022-10-25', business: 'Stark Industries', client: 'Natasha Romanoff', amount: 2100.75 },
    { invoiceNumber: 'INV-010', date: '2022-09-30', business: 'Acme Inc.', client: 'John Doe', amount: 1750.0 },
    { invoiceNumber: 'INV-005', date: '2023-01-15', business: 'Stark Industries', client: 'Pepper Potts', amount: 1200.0 },
    { invoiceNumber: 'INV-006', date: '2023-01-01', business: 'Acme Inc.', client: 'John Doe', amount: 2500.0 },
    { invoiceNumber: 'INV-007', date: '2022-12-20', business: 'Globex Corp.', client: 'Jane Smith', amount: 1800.25 },
    { invoiceNumber: 'INV-008', date: '2022-11-10', business: 'Wayne Enterprises', client: 'Selina Kyle', amount: 1400.0 },
    { invoiceNumber: 'INV-009', date: '2022-10-25', business: 'Stark Industries', client: 'Natasha Romanoff', amount: 2100.75 },
    { invoiceNumber: 'INV-010', date: '2022-09-30', business: 'Acme Inc.', client: 'John Doe', amount: 1750.0 }
  ];

  constructor() {}

  ngOnInit(): void {}

  get filteredInvoices(): any[] {
    return this.invoices
      .filter(invoice =>
        invoice.invoiceNumber.toLowerCase().includes(this.search.toLowerCase()) ||
        invoice.business.toLowerCase().includes(this.search.toLowerCase()) ||
        invoice.client.toLowerCase().includes(this.search.toLowerCase())
      )
      .sort((a, b) => {
        if (this.sort.order === 'asc') {
          return a[this.sort.key] > b[this.sort.key] ? 1 : -1;
        } else {
          return a[this.sort.key] < b[this.sort.key] ? 1 : -1;
        }
      })
      .slice((this.page - 1) * this.pageSize, this.page * this.pageSize);
  }

  get totalPages(): number {
    return Math.ceil(this.invoices.length / this.pageSize);
  }

  setSort(key: string, order: string): void {
    this.sort = { key, order };
    this.showSortDropdown = false;
  }

  toggleSortDropdown(): void {
    this.showSortDropdown = !this.showSortDropdown;
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
    }
  }

}
