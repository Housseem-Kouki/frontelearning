import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from '../../../course.service';

@Component({
  selector: 'app-mycourses',
  templateUrl: './mycourses.component.html',
  styleUrls: ['./mycourses.component.css']
})
export class MyCoursesComponent {
  courses: Course[]; 

  constructor(private router: Router ,private courseService:CourseService) {
    this.courses = [
      {
        image: 'path/to/course/image',
        courseTitle: 'Course 1',
        courseCategory: 'Category 1',
        completed: true,
        courseId: 'course-1'
      },
      {
        image: 'path/to/course/image',
        courseTitle: 'Course 2',
        courseCategory: 'Category 2',
        completed: false,
        courseId: 'course-2'
      },
      // Add more courses as needed
    ];
  }
  idCurrentUser !: number;
  courseReal !: any[];
  ngOnInit(): void {
    this.idCurrentUser = Number(localStorage.getItem('currentUserId'));
    this.courseService.getCoursesForStudent(this.idCurrentUser).subscribe(
      data => {
        this.courseReal = data;
        console.log("course student:", this.courseReal); // Ensure courses are correctly retrieved
        this.loadProgressForCourses();
      },
      error => {
        console.log("Error fetching courses for student");
      }
    );
  }

  loadProgressForCourses(): void {
    this.courseReal.forEach(course => {
      console.log("Fetching progress for course:", course); // Additional logging
      this.courseService.getEtatCourseByStudent(this.idCurrentUser, course.courseId).subscribe(
        data => {
          console.log("Fetched progress for course", course.courseId, ":", data); // Ensure data is fetched
          course.progress = data;
        },
        error => {
          console.error('Error fetching course progress', error);
        }
      );
    });
  }

  proceedToCourse(course: Course) {
    // Implement the logic to proceed to the course based on the course parameter
    // This can involve navigating to the course page or performing any other required actions
    console.log('Proceeding to course:', course);
    this.router.navigate(['/insidecourse', course.courseId]);
  }

  generateCertificate(course: any) {
    const learnerName = "Hayder Thamloui"; // Replace with actual learner's name
    const certificateName = `${learnerName}_${course.courseTitle}_Certificate.jpg`;

    const img = new Image();
    img.onload = () => {
      // Create canvas 
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        // canvas
        ctx.drawImage(img, 0, 0);

        ctx.font = 'bold 200px Arial'; 
        ctx.fillStyle = '#000066'; 

        // Calculate text width and height for learner name
        const learnerTextWidth = ctx.measureText(`${learnerName}`).width;
        const learnerTextHeight = 200; 

        // place
        const centerX = (canvas.width - learnerTextWidth) / 2 - 300; // left
        const centerY = (canvas.height + learnerTextHeight) / 2 - 200; // further up

        // Draw learner's name centered
        ctx.fillText(`${learnerName}`, centerX, centerY - 100); // up

        
        ctx.fillStyle = '#646c75';
        ctx.font = 'bold 50px Arial';

        // Calculate text width for course name
        const courseTextWidth = ctx.measureText(`Course: ${course.courseTitle}`).width;

        // place
        const centerXx = (canvas.width - courseTextWidth) / 2 - 250; // left
        const centerYy = (canvas.height + courseTextWidth) / 2 - 200; // further up
        ctx.fillText(`${course.courseTitle}`, centerXx, centerYy + 50); // between space

        // Convert canvas to image
        const dataURL = canvas.toDataURL('image/jpeg');

        // Trigger download
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = certificateName;
        link.click();
      } else {
        console.error('Canvas context is null');
      }
    };
    img.src = 'assets/certificate.jpg';
}

}

interface Course {
  image: string;
  courseTitle: string;
  courseCategory: string;
  completed: boolean;
  courseId: string;
}