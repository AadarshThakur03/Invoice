import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { EditBusinessData } from '../manage-business/business.model';
import { InvoiceDataModel } from './invoice.model';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css',
})
export class CreateInvoiceComponent {
  invoiceModel: InvoiceDataModel = new InvoiceDataModel();
  businessName: string = '';
  mobileNumber: string = '';
  alternateMobileNumber: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  clientName: string = '';
  clientAddress: string = '';
  cityStateZip: string = '';
  clientMobile: string = '';
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
  clientOptions: any[] = [];
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
    this.dataService.getClientByUserId().subscribe((data: any) => {
      console.log(data, 'create');

      this.clientOptions = data.client;
    });
    this.invoiceModel.date =new Date().toISOString().split('T')[0];
  }

  addItem() {
    this.items.push({ description: '', code: '', qty: 0, amount: 0 });
    console.log(this.items);
  }
  showPreview: boolean = false;
  editInvoice: boolean = true;
  changeInvoice() {
    this.isPreviewSelected = false;
    this.showPreview = false;
    this.editInvoice = true;
    if (this.editInvoice) {
      console.log(this.businessName, 'edit');
      this.selectedOption = this.businessName;
      console.log(this.data.mobile);
      // this.mobileNumber = this.data.mobile;
      // console.log(this.mobileNumber, 'mob');
    }
  }
  submittedInvoice: any = {};
  submitInvoice() {
    this.isPreviewSelected = true;

    this.showPreview = true;
    this.editInvoice = false;
    this.submittedInvoice = this.invoiceModel;
  }
  selectedBusiness(data: any): void {
    console.log(data);
    this.data = data;
    console.log(this.data, 'stored');
    this.invoiceModel.businessName = data.businessName;
    this.invoiceModel.mobileNumber = data.mobile;
    this.invoiceModel.alternateMobileNumber = data.alternateMobile;
    this.invoiceModel.addressLine1 =
      data.addressLine1 + ' ' + data.city + '-' + data.pinCode;
    this.invoiceModel.businessEmail = data.email;
    this.invoiceModel.pan = data.panNo;
    this.invoiceModel.gstin = data.gstNo;
    this.invoiceModel.state = data.state;
    this.invoiceModel.accountNo = data.bankAccountNo;
    this.invoiceModel.ifsc = data.ifscCode;
  }
  selectedClient(data: any): void {
    console.log(data);
    this.data = data;
    console.log(this.data, 'stored');

    this.invoiceModel.clientName = data.clientName;
    this.invoiceModel.clientMobile = data.mobile;
    this.invoiceModel.cityStateZip =
      data.state + ', ' + data.city + ' - ' + data.pinCode;
    this.invoiceModel.clientAddress = data.addressLine1;
    this.invoiceModel.clientGst = data.gstNo;
    // this.addressLine1 = data.addressLine1;
  }

  clearBusiness(data: any) {
    if (data) {
      this.invoiceModel.businessName = '';
      this.invoiceModel.alternateMobileNumber = '';
      this.invoiceModel.addressLine1 = '';
      this.invoiceModel.mobileNumber = '';
      this.invoiceModel.businessEmail = '';
    }
  }
  clearClient(data: any) {
    if (data) {
      this.invoiceModel.clientName = '';
      this.invoiceModel.clientMobile = '';
      this.invoiceModel.cityStateZip = '';
      this.invoiceModel.clientAddress = '';
      this.invoiceModel.clientGst = '';
    }
  }
}
