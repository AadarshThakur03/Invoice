import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { EditBusinessData } from '../manage-business/business.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css',
})
export class CreateInvoiceComponent{
  businessName: string = '';
  mobileNumber: string = '';
  alternateMobileNumber: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  customerName: string = '';
  customerAddress: string = '';
  cityStateZip: string = '';
  country: string = '';
  invoiceNo: string = '';
  orderNo: string = '';
  date: string = '';
  itemDescription1: string = '';
  itemCode1: string = '';
  qty1: string = '';
  amount1: string = '';
  gstin: string = '';
  pan: string = '';
  state: string = '';
  amountInWords: string = '';
  accountNo: string = '';
  ifsc: string = '';
  termsConditions: string = '';
  taxableAmount: string = '';
  taxableAmountValue: string = '';
  cgstPercentage: string = '';
  cgstAmount: string = '';
  sgstPercentage: string = '';
  sgstAmount: string = '';
  igstPercentage: string = '';
  igstAmount: string = '';
  items: any[] = [{ description: '', code: '', qty: '', amount: '' }];
  isPreviewSelected: boolean = false;
  businessOptions: any[] = [];
  selectedOption: string = '';
  data: any;
  // selectedOptions: any[] = [];
  constructor(
    private dataService: DataService,
    private toastService: ToastService
  ) {
    this.dataService.getBusinessByUserId().subscribe((data: any) => {
      console.log(data);
      this.businessOptions = data.business;
      console.log(this.businessOptions);
    });
  }
 

  addItem() {
    this.items.push({ description: '', code: '', qty: 0, amount: 0 });
    console.log(this.items);
  }
  showPreview: boolean = false;
  editInvoice: boolean = true;
  changeInvoice() {
    this.isPreviewSelected = false;
    this.editInvoice = true;
    if (this.editInvoice) {
      console.log(this.businessName, 'edit');
      this.selectedOption = this.businessName;
      console.log(this.data.mobile);
      this.mobileNumber=this.data.mobile
      console.log(this.mobileNumber,'mob');
      
    }
    this.showPreview = false;
  }
  submittedInvoice: any = {};
  submitInvoice() {
    this.isPreviewSelected = true;
    this.submittedInvoice = {
      businessName: this.businessName,
      mobileNumber: this.mobileNumber,
      alternateMobileNumber: this.alternateMobileNumber,
      addressLine1: this.addressLine1,
      addressLine2: this.addressLine2,
      customerName: this.customerName,
      customerAddress: this.customerAddress,
      cityStateZip: this.cityStateZip,
      country: this.country,
      invoiceNo: this.invoiceNo,
      orderNo: this.orderNo,
      date: this.date,
      itemDescription1: this.itemDescription1,
      itemCode1: this.itemCode1,
      qty1: this.qty1,
      amount1: this.amount1,
      gstin: this.gstin,
      pan: this.pan,
      state: this.state,
      amountInWords: this.amountInWords,
      accountNo: this.accountNo,
      ifsc: this.ifsc,
      termsConditions: this.termsConditions,
      taxableAmount: this.taxableAmount,
      taxableAmountValue: this.taxableAmountValue,
      cgstPercentage: this.cgstPercentage,
      cgstAmount: this.cgstAmount,
      sgstPercentage: this.sgstPercentage,
      sgstAmount: this.sgstAmount,
      igstPercentage: this.igstPercentage,
      igstAmount: this.igstAmount,
      items: this.items,
    };
    this.showPreview = true;
    this.editInvoice = false;
  }
  selectedOptions(data: any): void {
    console.log(data);
    this.data = data;
    console.log(this.data, 'stored');

    this.businessName = data.businessName;
    this.mobileNumber = data.mobile;
    this.alternateMobileNumber = data.alternateMobile;
    this.addressLine1 = data.addressLine1;
  }

  clearOptions(data: any) {
    if (data) {
      this.mobileNumber = '';
      this.alternateMobileNumber = '';
      this.addressLine1 = '';
    }
  }
}
