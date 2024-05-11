import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {}

  showSuccess(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 300000;
    config.panelClass = ['success-snackbar'];
    config.verticalPosition = 'bottom'; // Adjust position if needed
    config.horizontalPosition = 'center'; // Adjust position if needed
    config.data = {
      action: this.sanitizer.bypassSecurityTrustHtml(
        '<i class="fa-solid fa-times-circle"></i>'
      ), // Font Awesome close icon
    };

    const snackBarRef = this.snackBar.open(message, '', config);

    // Handle action click
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  showError(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['error-snackbar'];
    config.verticalPosition = 'bottom'; // Adjust position if needed
    config.horizontalPosition = 'center'; // Adjust position if needed
    config.data = {
      action: this.sanitizer.bypassSecurityTrustHtml(
        '<i class="fa-solid fa-times-circle"></i>'
      ), // Font Awesome close icon
    };

    const snackBarRef = this.snackBar.open(message, '', config);

    // Handle action click
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }

  showInfo(message: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.panelClass = ['custom-toast', 'info-snackbar'];
    config.verticalPosition = 'top'; // Adjust position if needed
    config.horizontalPosition = 'end'; // Adjust position if needed
    config.data = {
      action: this.sanitizer.bypassSecurityTrustHtml(
        '<i class="fa-solid fa-times-circle"></i>'
      ), // Font Awesome close icon
    };
    // config.data = {
    //   action: '', // Font Awesome close icon
    // };

    const snackBarRef = this.snackBar.open(message, '', config);

    // Handle action click
    snackBarRef.onAction().subscribe(() => {
      snackBarRef.dismiss();
    });
  }
}
