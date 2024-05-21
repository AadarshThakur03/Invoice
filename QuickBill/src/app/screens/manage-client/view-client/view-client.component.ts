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
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrl: './view-client.component.css',
})
export class ViewClientComponent {
  constructor(private dataService: DataService) {
    this.loadBusinesses();
  }

  client: CardData[] = [];
  userCardDetails: UserCardDetails = {
    cardHeader: 'Client',
    buttonLabel: 'Add Client',
    cardData: [],
  };

  loadBusinesses() {
    this.dataService.getClientByUserId().subscribe((data: any) => {
      console.log(data.business, 'busiess-user');
      this.client = data.client;
      console.log(this.client);
      // Update userCardDetails.cardData here
      this.userCardDetails.cardData = this.client;
    });
  }

  deleteBusiness(index: number) {
    this.client.splice(index, 1);
    // Update userCardDetails.cardData after deletion if necessary
  }
}
