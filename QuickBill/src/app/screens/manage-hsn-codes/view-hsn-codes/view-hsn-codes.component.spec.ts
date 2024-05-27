import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHsnCodesComponent } from './view-hsn-codes.component';

describe('ViewHsnCodesComponent', () => {
  let component: ViewHsnCodesComponent;
  let fixture: ComponentFixture<ViewHsnCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewHsnCodesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewHsnCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
