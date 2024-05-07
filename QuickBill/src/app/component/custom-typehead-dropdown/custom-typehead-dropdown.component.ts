import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-custom-typehead-dropdown',
  templateUrl: './custom-typehead-dropdown.component.html',
  styleUrls: ['./custom-typehead-dropdown.component.css'],
})
export class CustomTypeheadDropdownComponent {
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() options: any[] = []; // Change type to array of objects
  filteredOptions: any[] = []; // Change type to array of objects
  searchControl = new FormControl();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredOptions) => (this.filteredOptions = filteredOptions));

    this.populateOptions(); // Populate initial options
  }

  private populateOptions(): void {
    this.filteredOptions = this.options.slice(0, 10); // Initially display the first 10 options
  }

  private _filter(value: string): any[] { // Change return type to array of objects
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue) // Assuming 'name' is the property to filter
    );
  }

  clearInput(): void {
    this.searchControl.setValue('');
  }

  selectOption(option: any): void { // Change type to any
    console.log('Selected Option:', option);
    // Emit the selected option to parent component if needed
  }
}
