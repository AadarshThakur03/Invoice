class ItemDataModel {
    constructor(data) {
      this.itemDescription = data.itemDescription || "";
      this.unitPrice = data.unitPrice || null;
      this.hsnCode = data.hsnCode || "";
      this.hsnId = data.hsnId || "";
    }
  }
  
  module.exports = { ItemDataModel };
  