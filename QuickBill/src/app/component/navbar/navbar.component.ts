import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SidebarStateService } from '../../services/activeScreen.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  menuStatus: boolean = true;
  trialRemainingDays: number = 0;
  currentUser: any;
  isSidebarCollapsed: boolean = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private sidebarStateService: SidebarStateService
  ) {}

  ngOnInit(): void {
    this.authService.getUserDetails().subscribe((user) => {
      this.currentUser = user.user;
    });

    this.authService.getTrialRemainingDays().subscribe((user: any) => {
      this.trialRemainingDays = user.remainingDays.days_remaining;
    });

    this.sidebarStateService.activeScreen$.subscribe((screen) => {
      // Handle active screen changes if needed
    });
  }

  sideNavToggled1(): void {
    this.menuStatus = !this.menuStatus;
    this.sideNavToggled.emit(this.menuStatus);
  }

  toggleSidebar(): void {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  logout(): void {
    this.authService.logout();
    this.sidebarStateService.setActiveScreen('');
    this.router.navigate(['/login']);  // Redirect to login after logout
  }
}
