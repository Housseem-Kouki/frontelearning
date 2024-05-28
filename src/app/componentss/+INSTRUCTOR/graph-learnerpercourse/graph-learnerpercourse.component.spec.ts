import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphLearnerpercourseComponent } from './graph-learnerpercourse.component';

describe('GraphLearnerpercourseComponent', () => {
  let component: GraphLearnerpercourseComponent;
  let fixture: ComponentFixture<GraphLearnerpercourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GraphLearnerpercourseComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GraphLearnerpercourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
