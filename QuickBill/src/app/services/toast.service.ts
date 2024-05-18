import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomSnackbarComponent } from '../component/custom-snackbar/custom-snackbar.component';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private snackBar: MatSnackBar, private sanitizer: DomSanitizer) {}

  private createConfig(panelClass: string): MatSnackBarConfig {
    return {
      duration: 3000,
      panelClass: [panelClass],
      verticalPosition: 'bottom', // Adjust position if needed
      horizontalPosition: 'center', // Adjust position if needed
    };
  }

  showSuccess(message: string): void {
    const iconHtml = this.sanitizer.bypassSecurityTrustHtml(
      '<i class="fa-solid fa-check" style="font-size: 18px;"></i>'
    );
    const config = this.createConfig('success-snackbar');
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: message, icon: iconHtml },
      ...config,
    });
  }

  showError(message: string): void {
    const iconHtml = this.sanitizer.bypassSecurityTrustHtml(
      '<i class="fa fa-times-circle"></i>'
    );
    const config = this.createConfig('error-snackbar');
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: message, icon: iconHtml },
      ...config,
    });
  }

  showInfo(message: string): void {
    const iconHtml = this.sanitizer.bypassSecurityTrustHtml(
      '<i class="fa fa-info-circle"></i>'
    );
    const config = this.createConfig('info-snackbar');
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message: message, icon: iconHtml },
      ...config,
    });
  }
}
