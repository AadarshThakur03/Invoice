import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private http: HttpClient, private authService: AuthService,private router:Router) {}

  successMessage: String = '';
  isSuccess: boolean = false;


  onClose() {
    this.successMessage = '';
  }
  login(data: any) {
    this.authService.login(data.email, data.password).subscribe((data) => {
      console.log(data);
      this.successMessage = data.message;
      this.isSuccess = data.status === 'success';
      if (data.status === 'success') {
        this.authService.setLoggedIn(true);
        localStorage.setItem('token', data.token);
        this.router.navigate(['/user-homepage']);
      }
    });
  }
}

//interceptor - error success
