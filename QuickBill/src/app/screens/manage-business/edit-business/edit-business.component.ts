import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';
import { AuthService } from '../../../services/auth.service';
import { DataService } from '../../../services/data.service';
import { Observable } from 'rxjs';
import { ToastService } from '../../../services/toast.service';

interface BusinessData {
  businesses: Array<any>;
  message: string;
  status: string;
}
@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrl: './edit-business.component.css',
})
export class EditBusinessComponent {
  isBusiness: boolean = true;
  labels: any;
  name: string = '';
  formData: any = {};
  options: any = ['Adarsh', 'Mayak'];

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService
  ) {
    // this.toastService.showSuccess("data.message");
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
      this.isBusiness = url[0].path == 'edit-business';
      this.labels = this.isBusiness ? this.labels.business : this.labels.client;
    });
    this.dataService.getBusinessByUserId().subscribe((data: any) => {
      console.log(data.business, 'edit');
      this.options = data.business;
    });
  }
  onValueChanged(event: { value: string; name: string }) {
    // console.log(event);

    this.formData[event.name] = event.value; // Update the formData with the changed value
  }

  addDetails() {
    console.log(this.formData);

    this.dataService.addBusiness(this.formData).subscribe((data) => {
      console.log(data);
      if (data.status == 'success') {
        this.toastService.showSuccess(data.message);
      }

      // this.successMessage = data.message;
      // this.isSuccess = data.status === 'success';
      // if (data.status === 'success') {
      //   this.authService.setLoggedIn(true);
      //   localStorage.setItem('token', data.token);
      //   this.router.navigate(['/user-homepage']);
      //   this.sidebarStateService.setActiveScreen('user-dashboard');
      // }
    });
  }
}
