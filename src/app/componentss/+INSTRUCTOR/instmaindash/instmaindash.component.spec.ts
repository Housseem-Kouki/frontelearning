import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InstMainDashComponent } from './instmaindash.component';

describe('InstmaindashComponent', () => {
  let component: InstMainDashComponent;
  let fixture: ComponentFixture<InstMainDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstMainDashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstMainDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
