import { Component } from '@angular/core';
import { DataService } from '../../../services/data.service';
export interface UserCardDetails {
  cardHeader: string;
  buttonLabel: string;
  cardData: CardData[];
  // cardRoute:string
}

export interface CardData {
  businessName: string;
  email: string;
  image: string; // Assuming you also have an image property
}

@Component({
  selector: 'app-view-hsn-codes',
  templateUrl: './view-hsn-codes.component.html',
  styleUrl: './view-hsn-codes.component.css',
})
export class ViewHsnCodesComponent {
  constructor(private dataService: DataService) {
    this.loadBusinesses();
  }

  hsnCodes: CardData[] = [];
  userCardDetails: UserCardDetails = {
    cardHeader: 'HSN Codes',
    buttonLabel: 'Add HSN Code',
    cardData: [],
  };

  loadBusinesses() {
    this.dataService.getHsnCodeByUserId().subscribe((data: any) => {
      console.log(data, 'hsncode');

      this.hsnCodes = data.hsnCode;
      console.log(this.hsnCodes);
      // Update userCardDetails.cardData here
      this.userCardDetails.cardData = this.hsnCodes;
    });
  }

  deleteBusiness(index: number) {
    this.hsnCodes.splice(index, 1);
    // Update userCardDetails.cardData after deletion if necessary
  }
}
