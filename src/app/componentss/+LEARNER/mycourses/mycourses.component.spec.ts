import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCoursesComponent } from './mycourses.component';

describe('MycoursesComponent', () => {
  let component: MyCoursesComponent;
  let fixture: ComponentFixture<MyCoursesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyCoursesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
