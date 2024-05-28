import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMainDashComponent } from './adminmaindash.component';

describe('AdminmaindashComponent', () => {
  let component: AdminMainDashComponent;
  let fixture: ComponentFixture<AdminMainDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminMainDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminMainDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
