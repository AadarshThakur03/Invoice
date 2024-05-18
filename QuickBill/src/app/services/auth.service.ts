import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {
    // if (typeof localStorage !== 'undefined') {
    // Check if the user was previously logged in
    this.isLoggedInValue = window.localStorage.getItem('isLoggedIn') === 'true';

    //   }
  }
  currentUser: any;

  private isLoggedInValue: boolean = false;

  login(email: string, password: string): Observable<any> {
    const userData = { email, password };

    return this.http.post<any>('http://localhost:3000/users/login', userData, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  register(data: any) {
    const userData = {
      username: data.name,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
    };
    return this.http.post<any>(
      'http://localhost:3000/users/register',
      userData
    );
  }

  setLoggedIn(value: boolean) {
    this.isLoggedInValue = value;
    localStorage.setItem('isLoggedIn', value ? 'true' : 'false');
  }

  isLoggedIn(): boolean {
    // return this.isLoggedInValue;
    return localStorage.getItem('isLoggedIn') === 'true';
  }
  logout(): void {
    this.setLoggedIn(false);
    localStorage.removeItem('token');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/']); // Navigate to login page
  }

  getUserDetails() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(headers,'header');
    
    return this.http.get<any>('http://localhost:3000/users/get-userDetails', {
      headers,
    });
  }
}
