import { Component } from '@angular/core';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css'
})
export class CreateInvoiceComponent {
  businessName: string = 'Your Business Name';
  phoneNumber: string = '123-456-7890';
  addressLine1: string = '123 Main St';
  addressLine2: string = 'Suite 100';
  city: string = 'City';
  state: string = 'State';
  zipCode: string = 'Zip Code';
  country: string = 'Country';
  customerName: string = 'Customer Name';
  customerAddress: string = 'Customer Address';
  orderNo: string = 'Order No';
  invoiceNo: string = 'Invoice No';
  date: string = 'Date';
  itemDescription: string = 'Item Description';
  itemCode: string = 'Item Code';
  quantity: string = 'Quantity';
  amount: string = 'Amount';
  taxableAmount: string = 'Taxable Amount';
  cgst: string = 'CGST';
  sgst: string = 'SGST';
  igst: string = 'IGST';
  subtotal: string = 'Subtotal';
  total: string = 'Total';
  gstin: string = 'GSTIN Number';
  pan: string = 'PAN Number';
  stateName: string = 'State Name';
  bankDetails: string = 'Account No - XXXX, IFSC - XXXX';
  termsConditions: string = 'Terms & Conditions';
  amountInWords: string = 'Amount in Words';
  items: any[] = [
    { description: 'Item Description 1', code: 'Code 1', qty: 1, amount: 10.00 }
  ];

  constructor() { }
  addItem() {
    this.items.push({ description: '', code: '', qty: 0, amount: 0 });
    console.log(this.items);
    
  }
}
