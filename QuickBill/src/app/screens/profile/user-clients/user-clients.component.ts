import { Component, Input } from '@angular/core';
import { UserCardDetails } from '../user-business/user-business.component';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-user-clients',
  templateUrl: './user-clients.component.html',
  styleUrl: './user-clients.component.css',
})
export class UserClientsComponent {
  clients = [];
  userCardDetails: UserCardDetails = {
    cardHeader: 'Client',
    buttonLabel: 'Add Clients',
    cardData: this.clients,
  };
  constructor(private dataService: DataService) {
    this.loadBusinesses();
  }

  // businesses: any[] = [];

  loadBusinesses() {
    this.dataService.getClientByUserId().subscribe((data: any) => {
      console.log(data.business, 'busiess-user');
      this.clients = data.client;
      console.log(this.clients);
      // Update userCardDetails.cardData here
      this.userCardDetails.cardData = this.clients.slice(0, 8);
    });
  }

  deleteBusiness(index: number) {
    this.clients.splice(index, 1);
    // Update userCardDetails.cardData after deletion if necessary
    this.userCardDetails.cardData = this.clients;
  }
}
