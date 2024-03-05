import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  successMessage: String = '';
  isSuccess: boolean = false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  onClose() {
    this.successMessage = '';
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(data: any) {
    this.authService.register(data).subscribe((data) => {
      console.log(data);

      this.successMessage = data.message;
      this.isSuccess = data.status === 'success';
    });
  }
}
