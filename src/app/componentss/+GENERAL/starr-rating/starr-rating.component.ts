import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';

@Component({
  selector: 'app-starr-rating',
  templateUrl: './starr-rating.component.html',
  styleUrls: ['./starr-rating.component.css'],
})
export class StarrRatingComponent {
  faStar = faStar;

  @Input() rating: number = 0;
  @Input() readonly: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  setRating(value: number) {
    if (this.readonly) return;
    this.rating = value;
    this.ratingChange.emit(this.rating);
  }
}
