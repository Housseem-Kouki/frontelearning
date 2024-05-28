import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-fview',
  templateUrl: './fview.component.html',
  styleUrls: ['./fview.component.css']
})
export class FviewComponent implements OnInit {
  learnerCount: number = 100; // Placeholder value, replace with actual count
  instructorCount: number = 50; // Placeholder value, replace with actual count
  courseCount: number = 200; // Placeholder value, replace with actual count
  categoryCount: number = 10; // Placeholder value, replace with actual count
  currentReviewIndex: number = 0;
  userRole!: string;
  
  categories = [
    { name: 'Programming', icon: 'bx-code' },
    { name: 'Business', icon: 'bx-briefcase' },
    { name: 'Photography', icon: 'bx-camera' },
    { name: 'Music', icon: 'bx-music' },
    { name: 'Personal Development', icon: 'bx-smile' },
    { name: 'Trading', icon: 'bx-chart' },
    { name: 'Marketing', icon: 'bx-bullseye' },
    { name: 'Science', icon: 'bxs-thermometer' }
  ];

  constructor(private router: Router, private authService: AuthService) {}

  getUserRole(): string {
    return this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.userRole = this.getUserRole();
  }

  reviews: any[] = [
    {
      instructorPhoto: 'assets/second.jpg',
      reviewText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.',
      instructorName: 'Anis Ouerhani'
    },
    {
      instructorPhoto: 'assets/first.jpg',
      reviewText: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.',
      instructorName: 'Hayder Thamlaoui'
    },
    
  ];

  nextReview() {
    this.currentReviewIndex++;
    if (this.currentReviewIndex >= this.reviews.length) {
      this.currentReviewIndex = 0; // Reset to the first review
    }
  }

  goToSignup() {
    this.router.navigate(['/signup']);
  }

  goToExplore() {
    this.router.navigate(['/ranking']);
  }

  goToCourses() {
    this.router.navigate(['/allcourses']);
  }

  navigateToCategory(category: string) {
    this.router.navigate(['/allcourses'], { queryParams: { category: category } });
  }

  goToCreateCourse(){
    this.router.navigate(['/create-course']);
  }

  goToDash(){
    this.router.navigate(['/maindash']);
  }

  toggleDescription(stepId: string) {
    const description = document.getElementById(stepId + '-description') as HTMLElement;
    if (description.style.display === 'none' || description.style.display === '') {
      description.style.display = 'block';
    } else {
      description.style.display = 'none';
    }
  }

}