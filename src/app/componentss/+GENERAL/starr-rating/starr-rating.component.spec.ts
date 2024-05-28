import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarrRatingComponent } from './starr-rating.component';

describe('StarrRatingComponent', () => {
  let component: StarrRatingComponent;
  let fixture: ComponentFixture<StarrRatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StarrRatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StarrRatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
