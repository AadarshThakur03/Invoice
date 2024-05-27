import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHsnCodesComponent } from './add-hsn-codes.component';

describe('AddHsnCodesComponent', () => {
  let component: AddHsnCodesComponent;
  let fixture: ComponentFixture<AddHsnCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddHsnCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddHsnCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
