import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { ItemDataModel } from '../../../models/itemData.model';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrl: './add-items.component.css',
})
export class AddItemsComponent {
  itemDataModel: ItemDataModel = new ItemDataModel();
  // hsnCode: any = [];
  constructor(private dataService: DataService) {
    // this.dataService.getHsnCodeByUserId().subscribe((data: any) => {
    //   console.log(data, 'hsn');
    //   this.hsnCode = data.hsnCode;
    // });
  }
  selectedHsnCode(data: any) {
    console.log(data);
    this.itemDataModel.hsn_code = data.hsn_code;
    this.itemDataModel.hsnId = data.id;
  }

  addItemDetails() {
    this.dataService.addItem(this.itemDataModel).subscribe((data) => {
      console.log(data);
    });
    console.log(this.itemDataModel, 'item');
  }
}
