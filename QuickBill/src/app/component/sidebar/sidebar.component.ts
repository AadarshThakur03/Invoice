import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LoginComponent } from '../../screens/login/login.component';
import { RegisterComponent } from '../../screens/register/register.component';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {}

  list = [
    {
      number: '1',
      name: 'Dashboard',
      icon: 'fa-solid fa-chart-line',
      components: 'user-dashboard',
    },
    {
      number: '2',
      name: 'Profile',
      icon: 'fa-solid fa-user',
      components: 'register',
    },
    {
      number: '3',
      name: 'Settings',
      icon: 'fa-solid fa-gear',
      components: 'register',
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
  selectScreen(component: string) {
    this.router.navigateByUrl(component);
    this.screenSelected.emit(component);
  }
}
