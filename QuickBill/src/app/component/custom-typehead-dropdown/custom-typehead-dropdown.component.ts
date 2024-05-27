import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ViewChild,
  OnInit,
  OnChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material/autocomplete';

interface Option {
  businessName?: string;
  clientName?: string;
  hsn_code?: string;
  itemDescription?: string;
}

@Component({
  selector: 'app-custom-typehead-dropdown',
  templateUrl: './custom-typehead-dropdown.component.html',
  styleUrls: ['./custom-typehead-dropdown.component.css'],
})
export class CustomTypeheadDropdownComponent implements OnInit, OnChanges {
  @ViewChild(MatAutocompleteTrigger) autocomplete!: MatAutocompleteTrigger;
  @Input() selectedOption = '';
  @Input() placeholder: string = '';
  @Input() required: boolean = true;
  @Input() options: Option[] = [];
  @Input() value: string = '';
  @Input() labelClass: string = '';
  @Input() label: string = '';
  @Input() onlyInput: boolean = false;
  filteredOptions: Option[] = [];
  searchControl = new FormControl();
  @Output() selectedOptions = new EventEmitter<Option>();
  @Output() clearOptions = new EventEmitter<boolean>();

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map((value) => this._filter(value))
      )
      .subscribe((filteredOptions) => (this.filteredOptions = filteredOptions));

    // Initialize selectedOption based on the initial value
    if (this.value) {
      this.setSelectedOption(this.value);
    }

    // Listen for changes in the input field value
    this.searchControl.valueChanges.subscribe((value) => {
      if (!value) {
        this.clearSelectedOption();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['options'] && this.options && this.options.length > 0) {
      this.populateOptions();
    }

    if (changes['value'] && changes['value'].currentValue) {
      this.searchControl.setValue(changes['value'].currentValue);
      this.setSelectedOption(changes['value'].currentValue);
    }
  }

  private populateOptions(): void {
    this.filteredOptions = this.options;
  }

  private _filter(value: string): Option[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      this.getDisplayName(option).toLowerCase().includes(filterValue)
    );
  }

  public getDisplayName(option: Option): string {
    return option.businessName || option.clientName || option.hsn_code ||option.itemDescription|| '';
  }

  clearInput(): void {
    this.searchControl.reset();
    this.filteredOptions = this.options;
    this.clearOptions.emit(true);
    this.clearSelectedOption();
  }

  selectOption(option: Option): void {
    const displayName = this.getDisplayName(option);
    this.value = displayName;
    this.selectedOption = displayName;
    this.selectedOptions.emit(option);
  }

  private setSelectedOption(value: string): void {
    const matchingOption = this.options.find(
      (option) => this.getDisplayName(option) === value
    );
    if (matchingOption) {
      this.selectedOption = this.getDisplayName(matchingOption);
    }
  }

  private clearSelectedOption(): void {
    this.selectedOption = '';
    this.selectedOptions.emit(); // Emitting null to indicate no selected option
  }
}
