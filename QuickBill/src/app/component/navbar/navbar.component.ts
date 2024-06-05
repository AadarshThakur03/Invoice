import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarStateService } from '../../services/activeScreen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private sidebarStateService: SidebarStateService
  ) {}

  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = true;
  trialRemainingDays: number;

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
    this.authService.getTrialRemainingDays().subscribe((user:any) => {
      console.log(user.remainingDays.days_remaining, 'getTrialRemainingDays');
      this.trialRemainingDays=user.remainingDays.days_remaining
    });
    this.sidebarStateService.activeScreen$.subscribe((screen) => {});
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
    this.sidebarStateService.setActiveScreen('');
  }
}
