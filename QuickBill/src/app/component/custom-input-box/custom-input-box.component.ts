import {
  Component,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ElementRef,
} from '@angular/core';

@Component({
  selector: 'app-custom-input-box',
  templateUrl: './custom-input-box.component.html',
  styleUrls: ['./custom-input-box.component.css'],
})
export class CustomInputBoxComponent {
  @Input() label: string = '';
  @Input() ngModel: any = '';
  @Input() required: boolean = false;
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() value: any = '';
  @Input() name: string = '';
  @Input() labelClass: string = '';
  @Input() inputClass: string = '';
  @Input() inputDiv: string = '';
  @Input() onlyInput: boolean = false;
  @Output() valueChange: EventEmitter<{ value: string; name: string }> =
    new EventEmitter<{ value: string; name: string }>();
    @Output() ngModelChange = new EventEmitter<any>();
  @Input() disable: boolean = false;
  @Output() blur: EventEmitter<any> = new EventEmitter();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) {}

  onBlur(event: any) {
    this.blur.emit(event);
  }
  get value1(): any {
    return this.ngModel;
  }
  set value1(val: any) {
    this.ngModel = val;
  }
  onInputChange(value: string) {
    this.ngModelChange.emit(value); // Emit ngModelChange event
  }
  // Method to handle value changes
  onValueChange(newValue: string) {
    console.log('onCalledV');

    // this.setInputWidth();
    this.value = newValue; // Update the component property
    this.valueChange.emit({ value: newValue, name: this.name });

    // Set input width dynamically
  }
  // ngAfterViewInit() {
  //   this.setInputWidth();
  // }

  // Method to set input width dynamically based on content
  // setInputWidth() {
  //   console.log('Setting input width');
  //   const input = this.elementRef.nativeElement.querySelector('input');
  //   input.style.width = input.scrollWidth + 2 + 'px'; // Add 2 pixels to prevent content from getting cut off
  // }
}
