export interface Item {
  description: string;
  code: string;
  qty: string;
  amount: string;
}
export class InvoiceDataModel {
  businessName: string = '';
  mobileNumber: string = '';
  alternateMobileNumber: string = '';
  addressLine1: string = '';
  addressLine2: string = '';
  businessEmail: string = '';
  clientName: string = '';
  clientAddress: string = '';
  cityStateZip: string = '';
  clientMobile: string = '';
  clientGst:string=''
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
  items: Item[] = [{ description: '', code: '', qty: '', amount: '' }];
}
