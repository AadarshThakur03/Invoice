import { Component, Input } from '@angular/core';

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
  businesses = [
    {
      name: 'Business 1',
      email: 'business1@example.com',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      name: 'Business 2',
      email: 'business2@example.com',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
    {
      name: 'Business 3',
      email: 'business3@example.com',
      image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    },
  ];
  userCardDetails: UserCardDetails = {
    cardHeader: 'Business',
    buttonLabel: 'Add Business',
    cardData: this.businesses,
  };
  

  deleteBusiness(index: number) {
    this.businesses.splice(index, 1);
  }
}
