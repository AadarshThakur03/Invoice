class HsnCodeDataModel {
  constructor(data) {
    this.hsnCode = data.hsnCode || "";
    this.description = data.description || "";
    this.mobile = data.mobile || "";
    this.cgst_rate = data.cgst_rate || null;
    this.sgst_rate = data.sgst_rate || null;
    this.igst_rate = data.igst_rate || null;
  }
}

module.exports = { HsnCodeDataModel };
