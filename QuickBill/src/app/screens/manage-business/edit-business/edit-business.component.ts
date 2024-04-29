import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrl: './edit-business.component.css',
})
export class EditBusinessComponent {
  isBusiness: boolean = true;
  labels: any;
  name:string ='';
  formData: any = {};

  constructor(private route: ActivatedRoute) {
    this.labels = {
      business: {
        name: 'Business Name',
        email: 'Business Email',
        phone: 'Phone No',
        altPhone: 'Alternate Phone No',
        addressLine1: 'Address Line 1',
        pinCode: 'Pin Code',
        city: 'City',
        state: 'State',
        gstNo: 'GST No',
      },
      client: {
        name: 'Client Name',
        email: 'Client Email',
        phone: 'Phone No',
        altPhone: 'Alternate Phone No',
        addressLine1: 'Address Line 1',
        pinCode: 'Pin Code',
        city: 'City',
        state: 'State',
      },
    };

    this.route.url.subscribe((url) => {
      this.isBusiness = url[0].path == 'user-profile';
      this.labels = this.isBusiness ? this.labels.business : this.labels.client;
    });
  }
  onValueChanged(event: { value: string, name: string }) {
    console.log(event);
    
    this.formData[event.name] = event.value; // Update the formData with the changed value
  }

  addDetails() {
    console.log(this.formData);
  }
}
