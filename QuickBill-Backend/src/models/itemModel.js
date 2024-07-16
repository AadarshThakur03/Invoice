class ItemDataModel {
  constructor(data) {
      this.itemDescription = data.itemDescription || "";
      this.code = data.code || "";
      this.qty = data.qty || null;
      this.amount = data.amount || null;
      this.unitPrice = data.unitPrice || null;
      this.totalAmountBT = data.totalAmountBT || 0;
      this.hsn_code = data.hsn_code || "";
      this.hsnDescription = data.hsnDescription || "";
      this.cgst = data.cgst || null;
      this.igst = data.igst || null;
      this.sgst = data.sgst || null;
      this.totalAmountAT = data.totalAmountAT || 0;
      this.discount = data.discount || null;
      this.taxAmount = data.taxAmount || 0;
     
  }
}

module.exports = { ItemDataModel };
