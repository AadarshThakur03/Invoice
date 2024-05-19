import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private router: Router) {
    // if (typeof localStorage !== 'undefined') {
    // Check if the user was previously logged in
    // this.isLoggedInValue = window.localStorage.getItem('isLoggedIn') === 'true';
    //   }
  }
  currentUser: any;

  private isLoggedInValue: boolean = false;

  addBusiness(businessData: Object) {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(
      'http://localhost:3000/business/add-business',
      businessData,
      { headers }
    );
  }
  getBusinessByUserId() {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/business/get-business', {
      headers,
    });
  }

  addClient(clientData: Object) {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   console.error('Token not found in localStorage');
    // }
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<any>(
      'http://localhost:3000/client/add-client',
      clientData
    );
  }
  getClientByUserId() {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   console.error('Token not found in localStorage');
    // }
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('http://localhost:3000/client/get-client', {});
  }
}
