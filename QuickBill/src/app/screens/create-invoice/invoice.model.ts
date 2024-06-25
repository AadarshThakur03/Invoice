export interface Item {
  itemDescription: string;
  code: string;
  qty: number | 1;
  amount: number | null;
  unitPrice: string;
  totalAmountBT: number | null;
  hsn_code: string;
  cgst: string;
  igst: string;
  sgst: string;
  totalAmountAT: number | null;
  discount: number | null;
  taxAmount: number | null;
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
  clientGst: string = '';
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
  totalTaxAmount: number | null = null;
  taxableAmountValue: string = '';
  cgstPercentage: number | null = null;
  cgstAmount: number | null = null;
  sgstPercentage: number | null = null;
  sgstAmount: number | null = null;
  igstPercentage: number | null = null;
  igstAmount: number | null = null;
  subTotal: number | null = null;
  totalDiscount: number | null = null;
  discountAmount: number | null = null;
  shippingCharges: number | null = null;
  totalAmountAfterTax: number | null = null;
  totalInvoiceAmount: number | null = null;
  items: Item[] = [
    {
      itemDescription: '',
      code: '',
      qty: 1,
      amount: null,
      unitPrice: '',
      totalAmountBT: null,
      hsn_code: '',
      cgst: '',
      igst: '',
      sgst: '',
      totalAmountAT: null,
      discount: null,
      taxAmount: null,
    },
  ];
}
