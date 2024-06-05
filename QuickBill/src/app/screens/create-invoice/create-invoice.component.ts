import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { EditBusinessData } from '../manage-business/business.model';
import { InvoiceDataModel } from './invoice.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrl: './create-invoice.component.css',
})
export class CreateInvoiceComponent {
  invoiceModel: InvoiceDataModel = new InvoiceDataModel();

  isPreviewSelected: boolean = false;
  businessOptions: any[] = [];
  clientOptions: any[] = [];
  selectedOption: string = '';
  data: any;
  itemOptions: any = [];
  multipleTaxData: boolean = false;
  // selectedOptions: any[] = [];
  constructor(
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router
  ) {
    const routeData = this.router.getCurrentNavigation()?.extras.state;
    if (routeData != undefined && routeData['edit'] == true) {
      console.log(this.router.getCurrentNavigation()?.extras.state, 'nav');
      this.dataService
        .getInvoiceByInvoiceNo(routeData['invoiceNo'])
        .subscribe((data: any) => {
          console.log(data, 'data from in');
          this.invoiceModel = data.invoices[0];
          this.invoiceModel.date = data.invoices[0].created_at.slice(0, 10);
          this.invoiceModel.items.forEach((item, index) => {
            this.calculateTotal(index);
          });
        });
    }
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
    this.dataService.getInvoiceByuserId().subscribe((data: any) => {
      console.log(data.invoices.length > 0, 'invoice');
      // if (data.invoices.length >0) {
      //   this.invoiceModel = data.invoices[0];
      //   this.invoiceModel.items.forEach((item, index) => {
      //     this.calculateTotal(index);
      //   });
      // }
    });

    this.invoiceModel.date = new Date().toISOString().split('T')[0];
  }
  toggle() {
    this.multipleTaxData = !this.multipleTaxData;
    this.invoiceModel.items.forEach((item, index) => {
      this.calculateTotal(index);
    });
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
      discount: 0,
      taxAmount: 0,
    });
    console.log(this.invoiceModel.items);
  }
  showPreview: boolean = false;
  editInvoice: boolean = true;
  changeInvoice() {
    this.isPreviewSelected = false;
    this.showPreview = false;
    this.editInvoice = true;
    if (this.editInvoice) {
      console.log(this.invoiceModel.businessName, 'edit');
      this.selectedOption = this.invoiceModel.businessName;
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
    const item = this.invoiceModel.items[index];
    const qty = item.qty ?? 0;
    const unitPrice = this.convertToNumber(item.unitPrice);
    const cgst = this.convertToNumber(item.cgst);
    const igst = this.convertToNumber(item.igst);
    const sgst = this.convertToNumber(item.sgst);

    const discount = item.discount ?? 0;
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
    const totalTaxAmount = cgstAmount + igstAmount + sgstAmount;
    const totalAmountAfterTax = totalAmountBT + totalTaxAmount;

    // Apply discount based on multipleTaxData
    if (this.multipleTaxData) {
      console.log(this.multipleTaxData, 'multi');

      // If multipleTaxData is true, apply discount to totalAmountAfterTax
      item.totalAmountBT = totalAmountBT;
      item.taxAmount = totalTaxAmount;
      item.totalAmountAT = totalAmountAfterTax;
    } else {
      console.log(this.multipleTaxData, 'multi');
      // If multipleTaxData is false, apply discount to totalAmountBeforeTax
      item.totalAmountBT = totalAmountBT - discount;
      item.taxAmount = totalTaxAmount;
      item.totalAmountAT = totalAmountAfterTax;
    }

    // Update the model
    this.calculateTotalAndSubtotal();
  }

  calculateTotalAndSubtotal() {
    let subtotal = 0;
    let totalAmountAfterTax = 0;
    let totalDiscountAmount = 0;
    let totalTaxAmount = 0;
    let totalCGST = 0;
    let totalIGST = 0;
    let totalSGST = 0;

    // Calculate subtotal, total amount after tax, and total taxes
    this.invoiceModel.items.forEach((item) => {
      const cgst = this.convertToNumber(item.cgst);
      const igst = this.convertToNumber(item.igst);
      const sgst = this.convertToNumber(item.sgst);
      subtotal += item.totalAmountBT ?? 0;
      totalAmountAfterTax += item.totalAmountAT ?? 0;
      totalTaxAmount += item.taxAmount ?? 0;
      totalDiscountAmount += Number(item.discount);
      totalCGST += cgst !== undefined ? cgst : 0;
      totalIGST += igst !== undefined ? igst : 0;
      totalSGST += sgst !== undefined ? sgst : 0;
    });

    // Assign subtotal, total amount after tax, and total taxes to the model
    this.invoiceModel.subTotal = subtotal;
    this.invoiceModel.totalAmountAfterTax = totalAmountAfterTax;
    this.invoiceModel.totalTaxAmount = totalTaxAmount;
    this.invoiceModel.totalDiscount = totalDiscountAmount;

    if (this.multipleTaxData) {
      this.billSummaryTotalMultipleTax();
    } else {
      this.billSummaryTotal();
    }
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
  billSummaryTotal() {
    const cgst = this.invoiceModel.cgstPercentage ?? 0;
    const igst = this.invoiceModel.igstPercentage ?? 0;
    const sgst = this.invoiceModel.sgstPercentage ?? 0;
    const totalAmountBT = this.invoiceModel.subTotal ?? 0;
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
    this.invoiceModel.cgstAmount = cgstAmount;
    this.invoiceModel.sgstAmount = sgstAmount;
    this.invoiceModel.igstAmount = igstAmount;

    // Calculate total amount after tax
    const totalAmount =
      cgstAmount +
      igstAmount +
      sgstAmount +
      totalAmountBT +
      Number(this.invoiceModel.shippingCharges) -
      Number(this.invoiceModel.totalDiscount);
    this.invoiceModel.totalInvoiceAmount = totalAmount;
  }
  billSummaryTotalMultipleTax() {
    const totalAmountAfterTax = this.invoiceModel.totalAmountAfterTax ?? 0;
    const shippingCharges = Number(this.invoiceModel.shippingCharges);
    const totalAmount =
      totalAmountAfterTax +
      shippingCharges -
      Number(this.invoiceModel.discountAmount);

    this.invoiceModel.totalInvoiceAmount = totalAmount;
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
  addInvoiceDetails() {
    console.log(this.invoiceModel);
    
    this.dataService.addInvoice(this.invoiceModel).subscribe((data) => {
      console.log(data);
      this.invoiceModel.invoiceNo = data.invoiceNo;
    });
  }
}
