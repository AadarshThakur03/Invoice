import { Component, Input } from '@angular/core';
import { UserCardDetails } from '../user-business/user-business.component';

@Component({
  selector: 'app-user-clients',
  templateUrl: './user-clients.component.html',
  styleUrl: './user-clients.component.css',
})
export class UserClientsComponent {
  clients = [
    { businessName: 'Client 1', email: 'client1@example.com', image: 'url_to_image1' },
    { businessName: 'Client 2', email: 'client2@example.com', image: 'url_to_image2' },
  ];
  userCardDetails: UserCardDetails = {
    cardHeader: 'Client',
    buttonLabel: 'Add Clients',
    cardData: this.clients,
  };
}
