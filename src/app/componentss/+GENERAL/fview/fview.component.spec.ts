// fview.component.spec.ts

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FviewComponent } from './fview.component';

describe('FViewComponent', () => {
  let component: FviewComponent;
  let fixture: ComponentFixture<FviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
