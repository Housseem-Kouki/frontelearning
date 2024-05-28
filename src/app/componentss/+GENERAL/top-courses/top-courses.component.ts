import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../course.service';

@Component({
  selector: 'app-top-courses',
  templateUrl: './top-courses.component.html',
  styleUrls: ['./top-courses.component.css']
})
export class TopCoursesComponent implements OnInit {

  coursesReal!: any[];
  displayedCourses: any[] = [];

  constructor(private router: Router, private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.getCourses().subscribe(
      data => {
        this.coursesReal = data;
        console.log("list courses bd : ", this.coursesReal);
        this.updateDisplayedCourses();
      },
      error => {
        console.error('Error fetching courses', error);
      }
    );
  }

  onNext(): void {
    // Logic for next button click (if needed)
  }

  onPrev(): void {
    // Logic for previous button click (if needed)
  }

  updateDisplayedCourses(): void {
    // Sort courses by averageRating in descending order
    const sortedCourses = this.coursesReal.sort((a, b) => b.averageRating - a.averageRating);
    // Take the top 10 courses
    this.displayedCourses = sortedCourses.slice(0, 10);
  }

  goToViewCourse(course: any) {
    // Navigate to view course with the course ID
    this.router.navigate(['/view-course', course.id]); // Assuming courseId is the identifier of the course
  }
}
