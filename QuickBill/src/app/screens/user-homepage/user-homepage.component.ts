import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { UserDashboardComponent } from '../../component/user-dashboard/user-dashboard.component';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ModalComponent } from '../../component/modal/modal.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css',
})
export class UserHomepageComponent implements OnInit {
  currentUser: any;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private dialog: MatDialog
  ) {}
  sideNavStatus: boolean = true;
  selectedComponent: any = UserDashboardComponent;
  trialRemainingDays: any;
  showModal: any;

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }

  ngOnInit(): void {
    this.authService.getTrialRemainingDays().subscribe((user: any) => {
      this.trialRemainingDays = user.remainingDays.days_remaining;

      this.showModal = localStorage.getItem('showModal');
      if (this.showModal == 'true' && this.trialRemainingDays <= 0) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '90vw'; // 90% of the viewport width
        dialogConfig.height = '95vh'; // 90% of the viewport height
        dialogConfig.maxWidth = '90vw'; // Max width
        dialogConfig.maxHeight = '95vh'; // Max height

        const dialogRef = this.dialog.open(ModalComponent, dialogConfig);

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log('Modal closed:', result);
          // localStorage.setItem('showModal', 'false');
          // Handle modal close event if needed
        });
      }
    });
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user.user;
      console.log(this.currentUser, 'currentuser');
    });

    this.dataService.getBusinessByUserId().subscribe((user) => {
      console.log(user, 'From Home');
    });
  }
}
