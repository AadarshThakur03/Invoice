import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = true;

  sideNavToggled1() {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  // private isLoggedIn:boolean=false;
  currentUser: any;
  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user.user;
      console.log(this.currentUser);
    });
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
  isSidebarCollapsed: boolean = true;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
  get isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  logout() {
    this.authService.logout();
  }
}
