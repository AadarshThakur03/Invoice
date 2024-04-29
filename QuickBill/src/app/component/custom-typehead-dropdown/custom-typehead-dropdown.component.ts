
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-custom-typehead-dropdown',
  templateUrl: './custom-typehead-dropdown.component.html',
  styleUrl: './custom-typehead-dropdown.component.css'
})
export class CustomTypeheadDropdownComponent {


  // @Input() label: string ="";
  // @Input() placeholder: string = '';
  // @Input() required: boolean = true;
  // @Input() options: string[] = [];
  // @Output() optionSelected = new EventEmitter<string>();

  // filteredOptions: Observable<string[]>;
  // searchControl = new FormControl();

  // constructor() {
  //   this.filteredOptions = this.searchControl.valueChanges.pipe(
  //     startWith(''),
  //     map(value => this._filter(value))
  //   );
  // }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  // clearInput(): void {
  //   this.searchControl.setValue('');
  // }

  // selectOption(option: string): void {
  //   this.optionSelected.emit(option);
  // }
  @Input() placeholder: string = "";
  @Input() required: boolean = true;
  @Input() options: string[] = [];
  filteredOptions: string[] = [];
  searchControl = new FormControl();

  constructor() {
    this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    ).subscribe(filteredOptions => this.filteredOptions = filteredOptions);

    this.populateOptions();
  }

  private populateOptions(): void {
    if (this.options.length < 8) {
      const emptySlots = 8 - this.options.length;
      for (let i = 0; i < emptySlots; i++) {
        this.options.push(`ab${i}`);
      }
    }
    this.filteredOptions = this.options.slice(0, 10); // Initially display the first 10 options
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  clearInput(): void {
    this.searchControl.setValue('');
  }

  selectOption(option: string): void {
    console.log('Selected Option:', option);
    // Emit the selected option to parent component if needed
  }

}




