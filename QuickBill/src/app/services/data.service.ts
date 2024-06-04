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
    return this.http.post<any>(
      'http://localhost:3000/client/add-client',
      clientData
    );
  }
  getClientByUserId() {
    return this.http.get('http://localhost:3000/client/get-client', {});
  }
  addHsnCode(hsnCodeData: Object) {
    return this.http.post<any>(
      'http://localhost:3000/users/add-hsnCode',
      hsnCodeData
    );
  }
  getHsnCodeByUserId() {
    return this.http.get('http://localhost:3000/users/get-hsnCode', {});
  }
  getHsnCodeByNameAndId(hsnCode: string, id: string): Observable<any> {
    return this.http.get<any>(
      `http://localhost:3000/users/get-hsnCode/${hsnCode}/${id}`
    );
  }
  addItem(itemData: Object) {
    return this.http.post<any>('http://localhost:3000/item/add-item', itemData);
  }
  getItemByUserId() {
    return this.http.get('http://localhost:3000/item/get-items', {});
  }
  addInvoice(invoiceData: Object) {
    return this.http.post<any>(
      'http://localhost:3000/invoice/add-invoice',
      invoiceData
    );
  }
  getInvoiceByuserId() {
    return this.http.get('http://localhost:3000/invoice/get-invoices', {});
  }
  getInvoiceByInvoiceNo(invoiceNo: string) {
    return this.http.get(
      `http://localhost:3000/invoice/get-invoiceData/${invoiceNo}`,
      {}
    );
  }
}
