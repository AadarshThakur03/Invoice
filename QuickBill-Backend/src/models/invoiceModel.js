const { InvoiceItem } = require("./invoiceItemModel");

class InvoiceDataModel {
    constructor(data) {
      this.businessName = data.businessName || "";
      this.mobileNumber = data.mobileNumber || "";
      this.alternateMobileNumber = data.alternateMobileNumber || "";
      this.addressLine1 = data.addressLine1 || "";
      this.addressLine2 = data.addressLine2 || "";
      this.businessEmail = data.businessEmail || "";
      this.clientName = data.clientName || "";
      this.clientAddress = data.clientAddress || "";
      this.cityStateZip = data.cityStateZip || "";
      this.clientMobile = data.clientMobile || "";
      this.clientGst = data.clientGst || "";
      this.invoiceNo = data.invoiceNo || "";
      this.orderNo = data.orderNo || "";
      this.date = data.date || "";
      this.itemDescription1 = data.itemDescription1 || "";
      this.itemCode1 = data.itemCode1 || "";
      this.qty1 = data.qty1 || "";
      this.amount1 = data.amount1 || "";
      this.gstin = data.gstin || "";
      this.pan = data.pan || "";
      this.state = data.state || "";
      this.amountInWords = data.amountInWords || "";
      this.accountNo = data.accountNo || "";
      this.ifsc = data.ifsc || "";
      this.termsConditions = data.termsConditions || "";
      this.totalTaxAmount = data.totalTaxAmount || null;
      this.taxableAmountValue = data.taxableAmountValue || "";
      this.cgstPercentage = data.cgstPercentage || null;
      this.cgstAmount = data.cgstAmount || null;
      this.sgstPercentage = data.sgstPercentage || null;
      this.sgstAmount = data.sgstAmount || null;
      this.igstPercentage = data.igstPercentage || null;
      this.igstAmount = data.igstAmount || null;
      this.subTotal = data.subTotal || null;
      this.totalDiscount = data.totalDiscount || null;
      this.discountAmount = data.discountAmount || null;
      this.shippingCharges = data.shippingCharges || null;
      this.totalAmountAfterTax = data.totalAmountAfterTax || null;
      this.totalInvoiceAmount = data.totalInvoiceAmount || null;
      this.items = (data.items || []).map(item => new InvoiceItem(item));
    }
  }
  
  module.exports = { InvoiceDataModel };
  