import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseInterfaceComponent } from './course-interface.component';

describe('CourseInterfaceComponent', () => {
  let component: CourseInterfaceComponent;
  let fixture: ComponentFixture<CourseInterfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseInterfaceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseInterfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
