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
  itemOptions: any = [];
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
    this.dataService.getItemByUserId().subscribe((data: any) => {
      console.log(data, 'create');
      this.itemOptions = data.item;
    });

    this.invoiceModel.date = new Date().toISOString().split('T')[0];
  }

  addItem() {
    this.invoiceModel.items.push({
      description: '',
      code: '',
      qty: 1,
      amount: 0,
      unitPrice: '',
      totalAmountBT: 0,
      hsnCode: '',
      cgst: '',
      igst: '',
      sgst: '',
      totalAmountAT: 0,
    });
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
  quantity() {
    console.log('called');
  }
  selectItem(data: any, i: any) {
    console.log(data, i);

    this.invoiceModel.items[i].unitPrice = data.unitPrice;
    this.invoiceModel.items[i].description = data.itemDescription;
    this.dataService
      .getHsnCodeByNameAndId(data.hsnCode, data.hsnId)
      .subscribe((data: any) => {
        this.invoiceModel.items[i].hsnCode = data.hsnCode.hsn_code;
        this.invoiceModel.items[i].igst = data.hsnCode.igst_rate;
        this.invoiceModel.items[i].cgst = data.hsnCode.cgst_rate;
        this.invoiceModel.items[i].sgst = data.hsnCode.sgst_rate;
        console.log(data);
        this.calculateTotal(i);
      });
  }

  convertToNumber(value: string | undefined): number | undefined {
    if (value === undefined) {
      return undefined; // If value is undefined, return undefined
    }

    const parsedValue = parseFloat(value);

    if (!isNaN(parsedValue)) {
      return parsedValue; // If value is a valid number, return the parsed number
    } else {
      return undefined; // If value is not a valid number, return undefined
    }
  }

  calculateTotal(index: number) {
    // const item = this.invoiceModel.items[index];
    // item.totalAmountBT = item.qty * item.unitPrice;
    // item.totalAmount = item.total + item.tax;
    const item = this.invoiceModel.items[index];
    const qty = item.qty;
    const unitPrice = this.convertToNumber(item.unitPrice);
    const cgst = this.convertToNumber(item.cgst);
    const igst = this.convertToNumber(item.igst);
    const sgst = this.convertToNumber(item.sgst);

    console.log('Qty:', qty);
    console.log('Unit Price:', unitPrice);
    console.log('CGST:', cgst);
    console.log('IGST:', igst);
    console.log('SGST:', sgst);

    // Calculate total amount before tax
    let totalAmountBT = 0;
    if (qty !== undefined && unitPrice !== undefined) {
      totalAmountBT = qty * unitPrice;
    }

    // Calculate tax amounts
    let cgstAmount = 0;
    let igstAmount = 0;
    let sgstAmount = 0;

    if (cgst !== undefined) {
      cgstAmount = (totalAmountBT * cgst) / 100;
    }

    if (igst !== undefined) {
      igstAmount = (totalAmountBT * igst) / 100;
    }

    if (sgst !== undefined) {
      sgstAmount = (totalAmountBT * sgst) / 100;
    }

    // Calculate total amount after tax
    const totalAmountAfterTax =
      totalAmountBT + (cgstAmount + igstAmount + sgstAmount);

    // Update the model
    console.log('Total Amount Before Tax:', totalAmountBT);
    console.log('Total Amount After Tax:', totalAmountAfterTax);

    item.totalAmountBT = totalAmountBT;
    item.totalAmountAT = totalAmountAfterTax;
    this.calculateTotalAndSubtotal();
  }

  // calculateTotalAndSubtotal() {
  //   let subtotal = 0;
  //   let totalAmountAfterTax = 0;

  //   console.log("called");

  //   // Calculate subtotal and total amount after tax
  //   this.invoiceModel.items.forEach((item) => {
  //     subtotal += item.totalAmountBT;
  //     totalAmountAfterTax += item.totalAmountAT;
  //   });
  //   console.log(subtotal, totalAmountAfterTax, 'total');

  //   // Assign subtotal and total amount after tax to the model
  //   // this.invoiceModel.subtotal = subtotal;
  //   // this.invoiceModel.totalAmountAfterTax = totalAmountAfterTax;
  // }

  calculateTotalAndSubtotal() {
    let subtotal = 0;
    let totalAmountAfterTax = 0;
    let totalCGST = 0;
    let totalIGST = 0;
    let totalSGST = 0;

    // Calculate subtotal, total amount after tax, and total taxes
    this.invoiceModel.items.forEach((item) => {
      const cgst = this.convertToNumber(item.cgst);
      const igst = this.convertToNumber(item.igst);
      const sgst = this.convertToNumber(item.sgst);
      subtotal += item.totalAmountBT;
      totalAmountAfterTax += item.totalAmountAT;
      totalCGST += cgst !== undefined ? cgst : 0;
      totalIGST += igst !== undefined ? igst : 0;
      totalSGST += sgst !== undefined ? sgst : 0;
    });

    // Convert back to strings if necessary
    // totalCGST = totalCGST.toString();
    // totalIGST = totalIGST.toString();
    // totalSGST = totalSGST.toString();

    console.log('Subtotal:', subtotal);
    console.log('Total Amount After Tax:', totalAmountAfterTax);
    console.log('Total CGST:', totalCGST);
    console.log('Total IGST:', totalIGST);
    console.log('Total SGST:', totalSGST);

    // Assign subtotal, total amount after tax, and total taxes to the model
    this.invoiceModel.subTotal = subtotal;
    this.invoiceModel.totalAmountAfterTax = totalAmountAfterTax;
    // this.invoiceModel.totalCGST = totalCGST;
    // this.invoiceModel.totalIGST = totalIGST;
    // this.invoiceModel.totalSGST = totalSGST;

    // console.log('Final Subtotal:', this.invoiceModel.subtotal);
    // console.log('Final Total Amount After Tax:', this.invoiceModel.totalAmountAfterTax);
    // console.log('Final Total CGST:', this.invoiceModel.totalCGST);
    // console.log('Final Total IGST:', this.invoiceModel.totalIGST);
    // console.log('Final Total SGST:', this.invoiceModel.totalSGST);
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
