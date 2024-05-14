import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';

export interface CardData {
  name: string;
  email: string;
  image: string; // Assuming you also have an image property
}

export interface UserCardDetails {
  cardHeader: string;
  buttonLabel: string;
  cardData: CardData[];
}

@Component({
  selector: 'app-user-business',
  templateUrl: './user-business.component.html',
  styleUrl: './user-business.component.css',
})
export class UserBusinessComponent {
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
      this.userCardDetails.cardData = this.businesses.slice(0,3);
    });
  }

  deleteBusiness(index: number) {
    this.businesses.splice(index, 1);
    // Update userCardDetails.cardData after deletion if necessary
    this.userCardDetails.cardData = this.businesses;
  }
}
