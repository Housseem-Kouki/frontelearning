import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from '../../../course.service';
import { Course } from '../../../course.model';

interface Category {
  title: string;
  courses: Course[];
}

@Component({
  selector: 'app-allcourses',
  templateUrl: './allcourses.component.html',
  styleUrls: ['./allcourses.component.css']
})
export class AllcoursesComponent implements OnInit {
  searchText: string = '';
  coursesReal: Course[] = [];
  currentIndex: { [key: string]: number } = {};

  constructor(private router: Router, private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(
      data => {
        this.coursesReal = data; console.error(" récupération des cours", this.coursesReal);
        // Initialiser currentIndex pour chaque catégorie
        this.coursesReal.forEach(course => {
          if (!this.currentIndex[course.courseCategory]) {
            this.currentIndex[course.courseCategory] = 0;
           
          }
        });
      },
      error => {
        console.error("Erreur lors de la récupération des cours", error);
      }
    );
  }

  filteredCourses(): Category[] {
    const categories = this.coursesReal.reduce((acc: { [key: string]: Category }, course: Course) => {
      const category = course.courseCategory;
      if (!acc[category]) {
        acc[category] = {
          title: category,
          courses: []
        };
      }
      if (course.courseTitle.toLowerCase().includes(this.searchText.toLowerCase())) {
        acc[category].courses.push(course);
      }
      return acc;
    }, {});
    return Object.values(categories);
  }

  nextCourse(category: Category) {
    const categoryId = category.title;
    this.currentIndex[categoryId] = (this.currentIndex[categoryId] + 1) % category.courses.length;
  }

  getCourses(courses: Course[], startIndex: number, endIndex: number): Course[] {
    if (endIndex > startIndex) {
      return courses.slice(startIndex, endIndex);
    } else {
      return courses.slice(startIndex).concat(courses.slice(0, endIndex));
    }
  }

  goToViewCourse(courseId :  number) {
    //this.router.navigate(['/viewcourse']);
    this.router.navigate(['/viewcourse', courseId]); 
  }
}
