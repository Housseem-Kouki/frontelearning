import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../../shared/model/Course';
import { CourseService } from '../../../course.service';
import { error } from 'console';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-viewcourse',
  templateUrl: './viewcourse.component.html',
  styleUrls: ['./viewcourse.component.css']
})
export class ViewcourseComponent implements OnInit {
  course: any = {
    courseCategory: 'Data Science',
    courseTitle: 'Introduction to Data Science',
    courseDescription: 'A data science course typically covers a range of topics related to the collection, analysis, interpretation, and presentation of data to extract meaningful insights and make informed decisions. These courses often include instruction on statistical methods, machine learning algorithms, data visualization techniques, and programming languages commonly used in data science such as Python and R.',
    courseRate: 4.5,
    courseDuration: '4 Weeks',
    participantsCount: 150,
    coursePublishDate: '18/01/2024',
    coursePhotoFile : 'assets/imagecourse.jpg',
    instructor: {
      instructorName: 'Hayder Thamlaoui',
      instructorProfession: 'Music Producer',
      coursesCount: 10,
      studentsCount: 500,
      avatar : 'assets/first.jpg'
    },
    courseLessons: [
      { lessonTitle: 'Introduction to Music Production', lessonChapters: ['Chapter 1', 'Chapter 2'], lessonQuizzes: [] },
      { lessonTitle: 'Advanced Techniques', lessonChapters: ['Chapter 3', 'Chapter 4'], lessonQuizzes: ['Quiz 1', 'Quiz 2'] }
    ]
  };

  relatedCourses: any[] = [
    { courseTitle: 'Course 1', courseDescription: 'Lorem ipsum dolor sit amet', courseDuration: '4 Weeks', courseRate: 4.7, coursePhotoFile: 'assets/imagecourse.jpg' },
    { courseTitle: 'Course 2', courseDescription: 'Consectetur adipiscing elit', courseDuration: '1 Month', courseRate: 4.6, coursePhotoFile: 'assets/imagecourse.jpg' }
    // Add more related courses
  ];
  courseId!: number;
  courseReal!: any;
  idCurrentUser : number = -1;
  ngOnInit(): void {
    this.idCurrentUser = Number(localStorage.getItem('currentUserId'));
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId'));
      this.fetchCourse();
    });
  }

  fetchCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      data => {
        this.courseReal = data;
        console.log("Course récupéré : " + JSON.stringify(this.courseReal, null, 2));
      },
      error => {
        console.log("Erreur récupération course", error);
      }
    );
  }

  toggleContent(lessonIndex: number): void {
    const lesson = this.course.courseLessons[lessonIndex];
    lesson.showContent = !lesson.showContent;
  }

  constructor(private router: Router , private route: ActivatedRoute , private courseService : CourseService , private authService : AuthService) {}

  navigateToCategory(category: string) {
    this.router.navigate(['/allcourses'], { queryParams: { category: category } });
  }

  goToViewCourse() {
    this.router.navigate(['/viewcourse'])
  }


  Enroll(courseId : number) {
    if (!this.authService.isAuthenticated()){
      Swal.fire({
        title: 'Unauthorized',
        text: 'You are not authorized to access this page.',
        icon: 'error',
        confirmButtonText: 'OK',
        allowOutsideClick: false
      }).then(() => {
        this.router.navigate(['/login']);
      });
    }else{
      this.courseService.assignCourseToStudent(this.idCurrentUser,courseId).subscribe(
        data =>{alert("vous avez ete affecté a ce cours ! "),this.router.navigate(['/insidecourse', courseId]); },
        error => {alert("vous ete deja affecté a ce cours ! ")}
      );
    }
    
    
  }
  
  //goToViewCourse(courseId: number) {
    //this.router.navigate(['/view-course', courseId]); // Assuming courseId is the identifier of the course
  //}
}
