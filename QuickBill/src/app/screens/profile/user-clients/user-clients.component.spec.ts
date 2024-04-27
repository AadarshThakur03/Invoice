import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserClientsComponent } from './user-clients.component';

describe('UserClientsComponent', () => {
  let component: UserClientsComponent;
  let fixture: ComponentFixture<UserClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserClientsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
