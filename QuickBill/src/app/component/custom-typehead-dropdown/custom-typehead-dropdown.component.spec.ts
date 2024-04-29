import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTypeheadDropdownComponent } from './custom-typehead-dropdown.component';

describe('CustomTypeheadDropdownComponent', () => {
  let component: CustomTypeheadDropdownComponent;
  let fixture: ComponentFixture<CustomTypeheadDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomTypeheadDropdownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomTypeheadDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
