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

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css',
})
export class UserHomepageComponent implements OnInit {
  currentUser: any;

  constructor(private authService: AuthService, private router: Router, private dataService:DataService) {}
  sideNavStatus: boolean = true;
  selectedComponent: any = UserDashboardComponent;

  navigateTo(routePath: string) {
    this.router.navigate([routePath]);
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user.user;
      console.log(this.currentUser);
    });

    this.dataService.getBusinessByUserId().subscribe(user=>{
      console.log(user,"From Home");
      
    })
  }
}
