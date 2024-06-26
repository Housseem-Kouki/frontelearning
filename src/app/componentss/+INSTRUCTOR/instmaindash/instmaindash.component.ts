import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Course } from '../../../shared/model/Course';
import { CourseService } from '../../../course.service';
import { error } from 'console';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-instmaindash',
  templateUrl: './instmaindash.component.html',
  styleUrls: ['./instmaindash.component.css']
})
export class InstMainDashComponent implements OnInit {
  courseCount: number = 0;
  studentCount: number = 0;
  searchQuery: string = '';
  searchMessage: string = '';
  originalCourses!: any[];
  coursesReal!: any[];

  todos: any[] = [
    { task: 'Task 1', completed: false },
    { task: 'Task 2', completed: true }
  ];
  newTodo: string = '';
  courses: any[] = [
    { 
      "courseId": 1, 
      "courseTitle": "Learn Python", 
      "coursePhotoFile": "assets/imagecourse.jpg", 
      "coursePublishedDate": '2024-04-15', 
      "rate": 4,
      "courseStudentsEnrolled": 10 
    },
    { 
      "courseId": 2, 
      "courseTitle": "Start Angular", 
      "coursePhotoFile": "assets/imagecourse.jpg", 
      "coursePublishedDate": '2024-04-16', 
      "rate": 5,
      "courseStudentsEnrolled": 15 
    }
  ];
  courseRatings: any[] = [ // New array to store ratings
    { courseId: 1, rating: 4.5 },
    { courseId: 2, rating: 3.8 }
  ];
  courseInterval: any;
  studentInterval: any;
  totalStudents: number = 0;
  constructor(private router: Router , private courseService : CourseService) { }
  totalStudentsEnrolled :number= 0;
  totalCourses :number= 0;
  ngOnInit(): void {
    // Initialize totalStudentsEnrolled
    this.startCounters();
    this.originalCourses = [...this.courses];
    this.courseService.getAllCoursesByTeacher(Number(localStorage.getItem('currentUserId')))
      .subscribe(
        data => {
          this.coursesReal = data;
          this.totalCourses = this.coursesReal.length;

          // Create an array to store all the HTTP requests for fetching enrolled students
          const requests = this.coursesReal.map(course => this.courseService.getNumberOfStudents(course.courseId));

          // Wait for all requests to complete using forkJoin
          forkJoin(requests).subscribe(
            (enrolledCounts: number[]) => {
              let tempTotalStudentsEnrolled = 0;
              
              // Update each course with its enrolled count and accumulate the total
              enrolledCounts.forEach((count, index) => {
                this.coursesReal[index].studentsEnrolled = count;
                tempTotalStudentsEnrolled += count;
              });

              // Update the totalStudentsEnrolled after all requests complete
              this.totalStudentsEnrolled = tempTotalStudentsEnrolled;

            },
            error => console.log("Error fetching enrolled counts for courses", error)
          );
        },
        error => console.log("Error fetching courses", error)
      );
}
  

  filterData() {
    if (this.searchQuery.trim() === '') {
        // If search query is empty, restore original data
        this.courses = [...this.originalCourses];
        this.searchMessage = '';
    } else {
        // If search query is not empty, filter the courses
        const filteredCourses = this.originalCourses.filter(course =>
            course.courseTitle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            course.courseId.toString().includes(this.searchQuery.toLowerCase())
        );
        if (filteredCourses.length === 0) {
            this.searchMessage = 'No courses found with this input.';
        } else {
            this.searchMessage = '';
        }
        this.courses = filteredCourses;
    }
}

  startCounters() {
    this.courseInterval = setInterval(() => {
      const targetCourseCount = this.totalCourses;
      if (this.courseCount < targetCourseCount) {
        this.courseCount++;
      } else {
        clearInterval(this.courseInterval);
      }
    }, 100);

    this.studentInterval = setInterval(() => {
      const targetStudentCount = this.totalStudentsEnrolled;
      if (this.studentCount < targetStudentCount) {
        this.studentCount++;
      } else {
        clearInterval(this.studentInterval);
      }
    }, 100);
  }

  addTodo() {
    if (this.newTodo.trim() !== '') {
      this.todos.push({ task: this.newTodo, completed: false });
      this.newTodo = '';
    }
  }

  deleteTodo(index: number): void {
    this.todos.splice(index, 1);
  }

  manageCourse(courseId: number) {
    console.log(`Managing course with ID ${courseId}`);
  }

  calculateAverageRating(course: any): number {
    const courseId = course.id;
    const ratings = this.courseRatings.filter(rating => rating.courseId === courseId);
  
    if (ratings.length === 0) {
      return 0;
    }
  
    const total = ratings.reduce((sum, rating) => sum + rating.rating, 0);
    return total / ratings.length;
  }

  deleteCourse(courseId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this course.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to delete course
        this.courseService.deleteCourse(courseId).subscribe(
          data => { Swal.fire('Deleted!', 'Course has been deleted.', 'success');},
          error => {}
        )
        this.coursesReal = this.coursesReal.filter(c => c.courseId !== courseId);
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your course is safe :)', 'error');
      }
    });
  }
  
  addCourse() {
    this.router.navigate(['/create-course']);
  }

  navigateToUpdateCourse(): void {
    this.router.navigate(['/updatecourse']); 
  }
  
}
