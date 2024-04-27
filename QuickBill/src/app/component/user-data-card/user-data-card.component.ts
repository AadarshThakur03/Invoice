// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-data-card',
//   templateUrl: './user-data-card.component.html',
//   styleUrl: './user-data-card.component.css'
// })
// export class UserDataCardComponent {

// }

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
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
   styleUrl: './user-data-card.component.css'
})
export class UserDataCardComponent {
  @Input() data!: UserCardDetails;

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

  deleteBusiness(index: number) {
    this.businesses.splice(index, 1);
  }
}
