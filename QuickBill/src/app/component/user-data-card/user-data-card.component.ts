import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
import { Router } from '@angular/router';
import { SidebarStateService } from '../../services/activeScreen.service';

export interface CardData {
  businessName: string;
  email: string;
  image: string; // Assuming you also have an image property
}

export interface UserCardDetails {
  cardHeader: string;
  buttonLabel: string;
  cardData: CardData[];
  // cardRoute: string;
}

@Component({
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
  styleUrls: ['./user-data-card.component.css'],
})
export class UserDataCardComponent {
  @Input() data!: UserCardDetails;
  businesses = [
   
  ];

  deleteBusiness(index: number) {
    this.businesses.splice(index, 1);
  }
  constructor(
    public dialog: MatDialog,
    private router: Router,
    private sidebarStateService: SidebarStateService
  ) {

    console.log(this.data,'card');
    
  }
  editBusiness(data: any) {
    console.log(data, 'from card');

    this.router.navigate(['user-homepage/add-business'], {
      state: { data: data, edit: true },
    });
    this.sidebarStateService.setActiveScreen('add-business');
    this.sidebarStateService.setExpandedState('Manage Business', true);

    // this.router.navigate(['/user-homepage/edit-business'], { queryParams: { data: data } });
  }

  openDialog(business: CardData): void {
    this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: business,
    });
  }
}
