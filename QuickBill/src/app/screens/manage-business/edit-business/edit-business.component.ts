import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ToastService } from '../../../services/toast.service';
import { EditBusinessData } from '../business.model';

@Component({
  selector: 'app-edit-business',
  templateUrl: './edit-business.component.html',
  styleUrls: ['./edit-business.component.css'],
})
export class EditBusinessComponent implements OnInit {
  editBusinessData: EditBusinessData = new EditBusinessData();
  isBusiness: boolean = true;
  labels: any;
  formData: any = {};
  options: any = ['Adarsh', 'Mayak'];
  editData: boolean = false;
  data: any = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const routeData = this.router.getCurrentNavigation()?.extras.state;
    console.log(routeData);
    this.data = this.router.getCurrentNavigation()?.extras.state;
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

  // ngOnInit(): void {
  //   this.editBusinessData = new EditBusinessData();
  // }

  onValueChanged(event: { value: string; name: string }) {
    this.formData[event.name] = event.value; // Update the formData with the changed value
  }
  ngOnInit(): void {
    console.log(this.data);
    if (this.data == undefined) {
      console.log(this.data);
    } else {
      this.editBusinessData = this.data.data;
      console.log(this.editBusinessData, 'onnn');
    }

    // this.cdr.detectChanges();
  }

  addDetails() {
    // console.log(this.formData);
    console.log(this.editBusinessData, 'kkkk');

    this.dataService.addBusiness(this.editBusinessData).subscribe((data) => {
      console.log(data);
      if (data.status == 'success') {
        this.toastService.showSuccess(data.message);
      }
    });
  }
}
