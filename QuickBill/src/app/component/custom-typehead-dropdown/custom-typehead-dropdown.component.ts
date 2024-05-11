import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
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
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() options: any[] = [];
  @Input() value: string = '';
  filteredOptions: any[] = [];
  searchControl = new FormControl();
  @Output() selectedOptions = new EventEmitter<string>();
  @Output() clearOptions = new EventEmitter<boolean>();

  constructor() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe(
        (filteredOptions) => (
          console.log(filteredOptions,'fo'), (this.filteredOptions = filteredOptions)
        )
      );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.options && this.options.length > 0) {
      this.populateOptions();
    }

    if (changes['value'] && changes['value'].currentValue) {
      this.searchControl.setValue(changes['value'].currentValue);
    }
  }

  private populateOptions(): void {
    this.filteredOptions = this.options.slice(0, 10);
  }

  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  clearInput(): void {
    this.searchControl.setValue('');
    console.log('cleared');
    this.clearOptions.emit(true);
  }

  selectOption(option: any): void {
    this.value = "Adarsh";
    console.log('Selected Option:', option);
    this.selectedOptions.emit(option);
  }
}
