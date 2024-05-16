import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css',
})
export class DialogBoxComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  getObjectKeys(obj: any): string[] {
    return Object.keys(obj);
  }
}
