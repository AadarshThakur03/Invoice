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

@Component({
  selector: 'app-user-homepage',
  templateUrl: './user-homepage.component.html',
  styleUrl: './user-homepage.component.css',
})
export class UserHomepageComponent implements OnInit {
  currentUser: any;
  activeScreen: string = 'user-dashboard';

  constructor(
    private authService: AuthService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}
  sideNavStatus: boolean = true;
  selectedComponent: any = UserDashboardComponent;
  loadComponent(component: string) {
    this.activeScreen = component;
    switch (component) {
      case 'user-dashboard':
        this.selectedComponent = UserDashboardComponent;
        break;
      case 'register':
        this.selectedComponent = RegisterComponent;
        break;
      // Add more cases for other components
      default:
        this.selectedComponent = UserDashboardComponent;
        break;
    }
  }

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user.user;
      console.log(this.currentUser);
    });
  }
}
