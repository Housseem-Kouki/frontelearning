import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcontentComponent } from './addcontent.component';

describe('AuthComponent', () => {
  let component: AddcontentComponent;
  let fixture: ComponentFixture<AddcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddcontentComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});