import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomInputBoxComponent } from './custom-input-box.component';

describe('CustomInputBoxComponent', () => {
  let component: CustomInputBoxComponent;
  let fixture: ComponentFixture<CustomInputBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomInputBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomInputBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
