import { Component } from '@angular/core';
import { ClientDataModel } from '../client.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent {
  clientDataModel: ClientDataModel = new ClientDataModel();
  isBusiness: boolean = true;
  labels: any;
  editData: boolean = false;
  data: any = '';

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,

    private router: Router
  ) {
    const routeData = this.router.getCurrentNavigation()?.extras.state;
    console.log(routeData);
    this.data = this.router.getCurrentNavigation()?.extras.state;
    this.labels = {
      name: 'Client Name',
      email: 'Client Email',
      phone: 'Phone No',
      altPhone: 'Alternate Phone No',
      addressLine1: 'Address Line 1',
      pinCode: 'Pin Code',
      city: 'City',
      state: 'State',
      gstNo: 'GST No',
    };

    // this.route.url.subscribe((url) => {
    //   this.isBusiness = url[0].path == 'edit-business';
    //   this.labels = this.isBusiness ? this.labels.business : this.labels.client;
    // });
  }

  // ngOnInit(): void {
  //   this.editBusinessData = new EditBusinessData();
  // }

  // onValueChanged(event: { value: string; name: string }) {
  //   this.formData[event.name] = event.value; // Update the formData with the changed value
  // }
  ngOnInit(): void {
    this.dataService.getClientByUserId().subscribe((data) => {
      console.log(data, 'cient');
    });
    // console.log(this.data);
    // if (this.data == undefined) {
    //   console.log(this.data);
    // } else {
    //   this.editBusinessData = this.data.data;
    //   console.log(this.editBusinessData, 'onnn');
    // }
    // this.cdr.detectChanges();
  }

  addDetails() {
    // console.log(this.formData);
    console.log(this.clientDataModel, 'kkkk');

    this.dataService.addClient(this.clientDataModel).subscribe((data) => {
      console.log(data);
    });
  }
}
