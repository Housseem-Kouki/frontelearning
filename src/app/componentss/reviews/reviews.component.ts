import { Component } from '@angular/core';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  reviews = [
    { name: 'Hayder Thamlaoui', photo: 'assets/first.jpg', feedback: 'Great platform! I learned so much.' },
    { name: 'Anis Ouerhani', photo: 'assets/second.jpg', feedback: 'Amazing experience, highly recommend.' },
  ];
  currentReviewIndex = 0;

  nextReview() {
    this.currentReviewIndex = (this.currentReviewIndex + 1) % this.reviews.length;
  }

  getCurrentReview() {
    return this.reviews[this.currentReviewIndex];
  }
}
