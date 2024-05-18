import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastService } from '../services/toast.service';
import { HttpHeaders } from '@angular/common/http';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private toastService: ToastService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Retrieve token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('Token not found in localStorage');
    }

    // Clone the request to add custom headers
    let modifiedReq = req;
    if (token) {
      modifiedReq = req.clone({
        headers: new HttpHeaders().set('Authorization', `Bearer ${token}`),
      });
    }

    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          if (req.method === 'POST') {
            // Display toast message with the response body
            if (event.body.status === 'success') {
              this.toastService.showSuccess(event.body.message);
            } else {
              this.toastService.showError(event.body.message);
            }
          }
        }
      })
    );
  }
}
