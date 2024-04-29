import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-custom-input-box',
  templateUrl: './custom-input-box.component.html',
  styleUrl: './custom-input-box.component.css'
})
export class CustomInputBoxComponent {

 @Input() label: string="";
  @Input() required: boolean = false;
  @Input() placeholder: string = "";
  @Input() ngModel: string = "";
  @Input() type: string = 'text';
  @Input() value: string ="";
  @Input() name: string ="";
  @Input() labelClass: string ="";
  @Input() inputClass: string="";
  @Output() valueChange: EventEmitter<{ value: string, name: string }> = new EventEmitter<{ value: string, name: string }>();
  @Output() ngModelChange: EventEmitter<string> = new EventEmitter<string>();

  // Method to handle value changes
  onValueChange(newValue: string) {
    this.value = newValue; // Update the component property
  
    
    this.valueChange.emit({ value: newValue, name: this.name });
   // Emit the value change event with input name
  }
  onModelChange(newValue: string) {
    this.ngModel = newValue; // Update ngModel with new value
    this.ngModelChange.emit(newValue); // Emit the ngModelChange event
  }
  

  
}
