import { Component } from '@angular/core';
import { HsnCodeDataModel } from '../../../models/hsn-codes.model';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-hsn-codes',
  templateUrl: './add-hsn-codes.component.html',
  styleUrl: './add-hsn-codes.component.css',
})
export class AddHsnCodesComponent {
  hsnCodeDataModel: HsnCodeDataModel = new HsnCodeDataModel();
  constructor(private dataService: DataService) {}
  addHsnCodeDetails() {
    this.dataService.addHsnCode(this.hsnCodeDataModel).subscribe((data) => {
      console.log(data);
    });
  }
}
