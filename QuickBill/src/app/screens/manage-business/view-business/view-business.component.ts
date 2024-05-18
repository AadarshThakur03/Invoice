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
  selector: 'app-view-business',
  templateUrl: './view-business.component.html',
  styleUrl: './view-business.component.css',
})
export class ViewBusinessComponent {
  constructor(private dataService: DataService) {
    this.loadBusinesses();
  }

  businesses: CardData[] = [];
  userCardDetails: UserCardDetails = {
    cardHeader: 'Business',
    buttonLabel: 'Add Business',
    cardData: [],
  };

  loadBusinesses() {
    this.dataService.getBusinessByUserId().subscribe((data: any) => {
      console.log(data.business, 'busiess-user');
      this.businesses = data.business;
      console.log(this.businesses);
      // Update userCardDetails.cardData here
      this.userCardDetails.cardData = this.businesses;
    });
  }

  deleteBusiness(index: number) {
    this.businesses.splice(index, 1);
    // Update userCardDetails.cardData after deletion if necessary
    this.userCardDetails.cardData = this.businesses;
  }
}
