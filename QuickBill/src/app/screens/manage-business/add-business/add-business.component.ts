
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';
import { ToastService } from '../../../services/toast.service';
import { EditBusinessData } from '../business.model';
@Component({
  selector: 'app-add-business',
  templateUrl: './add-business.component.html',
  styleUrl: './add-business.component.css'
})
export class AddBusinessComponent {
  editBusinessData: EditBusinessData = new EditBusinessData();

  labels: any;
  // formData: any = {};
  // options: any = ['Adarsh', 'Mayak'];
  editData: boolean = false;
  data: any = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private toastService: ToastService,
    private router: Router
  ) {
    const routeData = this.router.getCurrentNavigation()?.extras.state;
    console.log(routeData);
    this.data = this.router.getCurrentNavigation()?.extras.state;
    this.labels = {
      name: 'Business Name',
      email: 'Business Email',
      phone: 'Phone No',
      altPhone: 'Alternate Phone No',
      addressLine1: 'Address Line 1',
      pinCode: 'Pin Code',
      city: 'City',
      state: 'State',
      gstNo: 'GST No',
    };

   
  }

  // ngOnInit(): void {
  //   this.editBusinessData = new EditBusinessData();
  // }

  // onValueChanged(event: { value: string; name: string }) {
  //   this.formData[event.name] = event.value; // Update the formData with the changed value
  // }
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
