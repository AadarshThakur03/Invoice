import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocomplete } from '@angular/material/autocomplete';

import { MatAutocompleteTrigger } from '@angular/material/autocomplete';
@Component({
  selector: 'app-custom-typehead-dropdown',
  templateUrl: './custom-typehead-dropdown.component.html',
  styleUrls: ['./custom-typehead-dropdown.component.css'],
})
export class CustomTypeheadDropdownComponent {
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  @Input() selectedOption = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() options: any[] = [];
  @Input() value: string = '';
  filteredOptions: any[] = [];
  searchControl = new FormControl();
  @Output() selectedOptions = new EventEmitter<string>();
  @Output() clearOptions = new EventEmitter<boolean>();
  // selectedOption = 'Adarsh';

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredOptions) => (this.filteredOptions = filteredOptions));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.options && this.options.length > 0) {
      this.populateOptions();
    }

    if (changes['value'] && changes['value'].currentValue) {
      this.searchControl.setValue(changes['value'].currentValue);
    }
  }
  // ngAfterViewInit() {
  //   // Manually open the autocomplete panel after setting the initial value
  //   setTimeout(() => {
  //     this.searchControl.setValue("Adarsh")
  //     this.autocomplete.openPanel();
  //   });
  // }

  private populateOptions(): void {
    this.filteredOptions = this.options;
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.businessName.toLowerCase().includes(filterValue)
    );
  }

  clearInput(): void {
    // this.searchControl.reset();
    this.searchControl.reset();
    this.filteredOptions = this.options; // Clear filtered options

    // console.log(this.searchControl);
    this.clearOptions.emit(true);
  }

  selectOption(option: any): void {
    this.value = option.name;
    console.log('Selected Option:', option);
    this.selectedOptions.emit(option);
  }
}
