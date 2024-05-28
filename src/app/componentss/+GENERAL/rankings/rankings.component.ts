import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CourseService } from '../../../course.service';

interface Instructor {
  name: string;
  score: number;
  subscribedLearners: number;
  numberOfCourses: number;
  learnerEngagement: number;
  averageCourseRating: number;
}

@Component({
  selector: 'app-rankings',
  templateUrl: './rankings.component.html',
  styleUrls: ['./rankings.component.css']
})
export class RankingsComponent implements OnInit {
  instructors: Instructor[] = [
    { name: 'John Doe', score: 95, subscribedLearners: 1000, numberOfCourses: 15, learnerEngagement: 85, averageCourseRating: 4.7 },
    { name: 'Jane Smith', score: 92, subscribedLearners: 800, numberOfCourses: 12, learnerEngagement: 80, averageCourseRating: 4.6 },
    { name: 'Bob Johnson', score: 88, subscribedLearners: 600, numberOfCourses: 10, learnerEngagement: 75, averageCourseRating: 4.5 },
    { name: 'Alice Brown', score: 85, subscribedLearners: 400, numberOfCourses: 8, learnerEngagement: 70, averageCourseRating: 4.4 },
    { name: 'Mike Davis', score: 82, subscribedLearners: 200, numberOfCourses: 6, learnerEngagement: 65, averageCourseRating: 4.3 }
  ];
  realInstructors!: any[];
  realUsers!: any[];
  totalStudents : number = 0;
  constructor(private userService : UserService , private courseService : CourseService) { }
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      data => {
        this.realUsers = data;  
        // Initialisation des listes
        this.realInstructors = [];
        // Filtrage des utilisateurs en fonction de leur rôle
        this.realUsers.forEach(user => {
          if (user.role !== 0 && user.role !== 1) {
            this.realInstructors.push(user);
          }
        });
        console.log("Instructors : ", this.realInstructors);
        // Calcul de la moyenne des évaluations de chaque instructeur
        this.realInstructors.forEach(instructor => {
          let totalRating = 0;
          let totalStudents = 0;
          if (instructor.coursesAsTeacher.length > 0) {
            instructor.coursesAsTeacher.forEach((course: any) => {
              totalRating += course.averageRating;
              this.courseService.getNumberOfStudents(course.courseId).subscribe(
                enrolled => {
                  course.studentsEnrolled = enrolled;
                  totalStudents += enrolled;
                  instructor.learnerEngagement = totalStudents; // Mettre à jour le total des étudiants pour l'instructeur
                  console.log("instructor.learnerEngagement ",totalStudents)
                },
                error => console.log(`error fetching students enrolled for course ${course.courseId}`, error)
              );
            });
            if (totalStudents === 0) {
              instructor.learnerEngagement = 0; // Affecter 0 si aucun étudiant n'est inscrit
          }
            instructor.averageCourseRating = totalRating / instructor.coursesAsTeacher.length;
          } else {
            instructor.averageCourseRating = 0; // Affecter 0 si aucune donnée n'est disponible
            instructor.learnerEngagement = 0;
          }
          console.log("instructor.numberOfCourses ",instructor.coursesAsTeacher.length)
          console.log("instructor.learnerEngagement ",instructor.learnerEngagement)
          console.log("instructor.averageCourseRating ",instructor.averageCourseRating)
          instructor.score = (0.4 * instructor.coursesAsTeacher.length) + (0.4 * instructor.learnerEngagement) + (0.2 * instructor.averageCourseRating);
        });

           // Trier les instructeurs par score décroissant
      this.realInstructors.sort((a, b) => b.score - a.score);
      },
      error => {
        console.log("error fetching users ", error);
      }
    );
  }

  getRankBadgeClass(index: number): string {
    if (index === 0) {
      return 'badge-1';
    } else if (index === 1) {
      return 'badge-2';
    } else if (index === 2) {
      return 'badge-3';
    } else {
      return 'no-border';
    }
  }

  getRankNumber(index: number): string {
    if (index <= 2) {
      return (index + 1).toString();
    } else {
      return '' + (index + 1);
    }
  }
}
