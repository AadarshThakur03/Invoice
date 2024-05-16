import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { SidebarStateService } from '../../services/activeScreen.service';

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
  styleUrls: ['./user-data-card.component.css'],
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
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sidebarStateService: SidebarStateService
  ) {}
  editBusiness(data: any) {
    console.log(data, 'from card');

    this.router.navigate(['user-homepage/edit-business'], {
      state: { data: data, edit: true },
    });
    this.sidebarStateService.setActiveScreen('edit-business');

    // this.router.navigate(['/user-homepage/edit-business'], { queryParams: { data: data } });
  }

  openDialog(business: CardData): void {
    this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: business,
    });
  }
}
