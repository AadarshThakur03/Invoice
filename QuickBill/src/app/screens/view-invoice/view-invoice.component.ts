import { Component, ViewChild, ElementRef,Input } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-view-invoice',
  templateUrl: './view-invoice.component.html',
  styleUrl: './view-invoice.component.css',
})
export class ViewInvoiceComponent {
  
  @ViewChild('content', { static: false }) content!: ElementRef;
  @Input() 
  invoiceData: any;

  downloadPDF() {
    const pdf = new jsPDF('p', 'mm', 'a4');
  html2canvas(this.content.nativeElement, { scale: 4, logging: true }).then((canvas) => {
    const imgData = canvas.toDataURL('image/jpeg', 1.0);
    const imgWidth = 210; // A4 size
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
    pdf.save('invoice.pdf');
  });
  }
}
