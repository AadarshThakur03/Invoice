import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../../screens/login/login.component';
import { RegisterComponent } from '../../screens/register/register.component';
import { SidebarStateService } from '../../services/activeScreen.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() sideNavStatus: boolean = false;
  @Input() activeScreen: String = 'user-dashboard';

  // @Output() screenSelected= new EventEmitter<string>();
  @Output() screenSelected = new EventEmitter<string>();

  constructor(private sidebarStateService: SidebarStateService) {
    this.sidebarStateService.activeScreen$.subscribe((screen) => {
      this.activeScreen = screen;
    });
  }

  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      routes: {
        components: 'user-dashboard',
        path: 'user-homepage/user-dashboard',
      },
    },
    {
      number: '2',
      name: 'Invoice',
      icon: 'fa-solid fa-receipt',
      routes: {
        components: 'create-invoice',
        path: 'user-homepage/create-invoice',
      },
    },
    {
      number: '3',
      name: 'Profile',
      icon: 'fa-solid fa-user',
      routes: {
        components: 'user-profile',
        path: 'user-homepage/user-profile',
      },
    },
    {
      number: '4',
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      routes: {
        components: 'login',
        path: 'user-homepage/user-dashboard',
      },
    },
    // {
    //   number:'3',
    //   name:'home',
    //   icon:'fa-solid fa-house'
    // },
    // {
    //   number:'4',
    //   name:'home',
    //   icon:'fa-solid fa-house'
    // },
  ];
  selectScreen(routePath: any) {
    console.log(routePath.routes.path);

    this.screenSelected.emit(routePath.routes.path);
    // this.activeScreen = routePath.routes.components;
    this.sidebarStateService.setActiveScreen(routePath.routes.components);
  }
}
