import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router, private authService: AuthService) {}
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
