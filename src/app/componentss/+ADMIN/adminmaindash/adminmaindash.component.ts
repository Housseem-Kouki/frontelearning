import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { error } from 'console';
import { CourseService } from '../../../course.service';

@Component({
  selector: 'app-adminmaindash',
  templateUrl: './adminmaindash.component.html',
  styleUrls: ['./adminmaindash.component.css']
})
export class AdminMainDashComponent implements OnInit {
  instructorCount: number = 0;
  learnerCount: number = 0;
  courseCount: number = 0;
  searchQuery: string = '';
  searchMessage: string = '';
  originalLearners!: any[];
  originalCourses!: any[];
  originalInstructors!: any[];
  activeTable: string = '';
  realUsers!: any[];
  realInstructors !: any[];
  realAdmins !: any[];
  realLearners !: any[];
  realCourses !: any[];
  
  NumberOfStudents: number = 0;
  // Sample data
  learners: any[] = [
    { id: 1, fullName: 'Anis Ouerhani', phoneNumber: '+216 50 100 200', status: true },
    { id: 2, fullName: 'Hayder Thamlaoui', phoneNumber: '+216 50 200 300', status: false }
  ];

  instructors: any[] = [
    { id: 1, fullName: 'Hanen Brahmi', phoneNumber: '+216 50 300 400', status: true },
    { id: 2, fullName: 'Khalil Landolsi', phoneNumber: '+216 50 400 500', status: false }
  ];

  courses: any[] = [
    { courseId: 1, courseTitle: 'Start Angular', coursePublishedDate: '2024-05-01', rate: 4 , courseStudentsEnrolled: 20, status: true },
    { courseId: 2, courseTitle: 'Learn Java', coursePublishedDate: '2024-05-02', rate: 3, courseStudentsEnrolled: 15, status: false }
  ];

  constructor(private userService : UserService , private courseService : CourseService) { }

  

  ngOnInit(): void {
    this.originalLearners = [...this.learners];
    this.originalCourses = [...this.courses];
    this.originalInstructors = [...this.instructors];
    this.startCounters();

    this.userService.getUsers().subscribe(
      data => {
        this.realUsers = data;
        console.log("list user : ", this.realUsers);
        
        // Initialisation des listes
        this.realInstructors = [];
        this.realAdmins = [];
        this.realLearners = [];
        
        // Filtrage des utilisateurs en fonction de leur rôle
        this.realUsers.forEach(user => {
          if (user.role === 0) {
            this.realAdmins.push(user);
          } else if (user.role === 1) {
            this.realLearners.push(user);
          } else if (user.role !== 0 && user.role !== 1) {
            this.realInstructors.push(user);
          }
        });
    
        // Affichage des listes pour vérification
        console.log("Admins : ", this.realAdmins);
        console.log("Learners : ", this.realLearners);
        console.log("Instructors : ", this.realInstructors);
      },
      error => {
        console.log("error fetching users ");
      }
    );


    this.courseService.getCourses().subscribe(
      data => {this.realCourses = data , console.log("la liste courses : ", this.realCourses) , 
        this.realCourses.forEach(course =>{
          this.courseService.getNumberOfStudents(course.courseId).subscribe(
            enrolled => {course.studentsEnrolled = enrolled, console.log("student enrolled",enrolled)},
            error => console.log(`error fetching students enrolled for course ${course.courseId}`, error)

          );
        })
      },
      error => {console.log("error fetching courses ! ")}
    );
  }

  filterData() {
    if (this.searchQuery.trim() === '') {
        // If search query is empty, restore original data for the active table
        if (this.activeTable === 'learners') {
            this.learners = [...this.originalLearners];
        } else if (this.activeTable === 'courses') {
            this.courses = [...this.originalCourses];
        } else if (this.activeTable === 'instructors') {
            this.instructors = [...this.originalInstructors];
        }
        this.searchMessage = '';
    } else {
        // If search query is not empty, filter the data for the active table
        if (this.activeTable === 'learners') {
            const filteredLearners = this.originalLearners.filter(learner =>
                learner.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                learner.id.toString().includes(this.searchQuery.toLowerCase())
            );
            if (filteredLearners.length === 0) {
                this.searchMessage = 'No learners found with this input.';
            } else {
                this.searchMessage = '';
            }
            this.learners = filteredLearners;
        } else if (this.activeTable === 'courses') {
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
        } else if (this.activeTable === 'instructors') {
            const filteredInstructors = this.originalInstructors.filter(instructor =>
                instructor.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                instructor.id.toString().includes(this.searchQuery.toLowerCase())
            );
            if (filteredInstructors.length === 0) {
                this.searchMessage = 'No instructors found with this input.';
            } else {
                this.searchMessage = '';
            }
            this.instructors = filteredInstructors;
        }
    }
}


  startCounters() {
    // Simulate incrementing counters
    setInterval(() => {
      this.instructorCount++;
    }, 2500);

    setInterval(() => {
      this.learnerCount++;
    }, 1500);

    setInterval(() => {
      this.courseCount++;
    }, 1000);
  }

  calculateAverageRating(course: any): number {
    // Logic to calculate average rating
    return 0; // Placeholder value
  }

  toggleTable(table: string) {
    this.activeTable = table;
  }

  deleteLearner(learnerId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this instructor.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(learnerId).subscribe(
          data => {
            Swal.fire('Deleted!', 'Instructor has been deleted.', 'success');
            // Remove the deleted instructor from the local list
            this.realLearners = this.realLearners.filter(instructor => instructor.userId !== learnerId);
            this.realLearners = this.realLearners.filter(instructor => instructor.userId !== learnerId);
           //window.location.reload()
          },
          error => {
            Swal.fire('Error!', 'There was an issue deleting the instructor.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your instructor is safe 🙂', 'error');
      }
    });
  }

  suspendLearner(learnerId: number) {
    const learner = this.realLearners.find(i => i.userId === learnerId);
    if (learner && !learner.status) {
      Swal.fire('Already Suspended', 'This learner is already suspended.', 'info');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to suspend this learner.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, suspend it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to suspend instructor
        console.log("instructor : ", learner)
        learner.status = false; // Update the instructor's status to suspended
        this.userService.suspendUser(learnerId).subscribe(
          data=>{ Swal.fire('Suspended!', 'learner has been suspended.', 'success');},
          error =>{}
        );
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your learner is safe 🙂', 'error');
      }
    });
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
          data=>{ Swal.fire('Deleted!', 'Course has been deleted.', 'success');
                // Remove the deleted instructor from the local list
                this.realCourses = this.realCourses.filter(course => course.courseId !== course);
                this.realCourses = this.realCourses.filter(course => course.courseId !== course);
          },
          error =>{}
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your course is safe 🙂', 'error');
      }
    });
  }

  hideCourse(courseId: number) {
    const course = this.realCourses.find(c => c.courseId === courseId);
    if (course) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You are about to hide this course.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, hide it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          if (!course.status) {
            Swal.fire('Already Hidden', 'This course is already hidden.', 'info');
          } else {
            course.status = false; // Hide the course
            this.courseService.hideCourse(courseId).subscribe(
              data => {  Swal.fire('Hidden!', 'Course has been hidden.', 'success');}
            );
          
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your course is safe 🙂', 'error');
        }
      });
    }
  }
  
  
  revealCourse(courseId: number) {
    
    const course = this.realCourses.find(c => c.courseId === courseId);
    console.log(course);
    if (course) {
      if (course.status) {
        this.courseService.revealCourse(courseId).subscribe(
          data => {Swal.fire('Already Visible', 'This course is already visible.', 'info');}
        );
        
      } else {
        course.status = true; // Reveal the course
        this.courseService.revealCourse(courseId).subscribe(
          data => {  Swal.fire('Visible!', 'Course has been made visible.', 'success');}
        );
        
      
      }
    }
  }
  
  

  deleteInstructor(instructorId: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this instructor.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(instructorId).subscribe(
          data => {
            Swal.fire('Deleted!', 'Instructor has been deleted.', 'success');
            // Remove the deleted instructor from the local list
            this.realInstructors = this.realInstructors.filter(instructor => instructor.userId !== instructorId);
            this.realInstructors = this.realInstructors.filter(instructor => instructor.userId !== instructorId);
           // window.location.reload()
          },
          error => {
            Swal.fire('Error!', 'There was an issue deleting the instructor.', 'error');
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your instructor is safe 🙂', 'error');
      }
    });
  }

  suspendInstructor(instructorId: number) {
    const instructor = this.realInstructors.find(i => i.userId === instructorId);
    if (instructor && !instructor.status) {
      Swal.fire('Already Suspended', 'This instructor is already suspended.', 'info');
      return;
    }
  
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to suspend this instructor.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, suspend it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        // Logic to suspend instructor
        console.log("instructor : ", instructor)
        instructor.status = false; // Update the instructor's status to suspended
        this.userService.suspendUser(instructorId).subscribe(
          data=>{ Swal.fire('Suspended!', 'Instructor has been suspended.', 'success');},
          error =>{}
        );
       
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your instructor is safe 🙂', 'error');
      }
    });
  }
  

  reactivateLearner(learnerId: number) {
    const learner = this.realLearners.find(i => i.userId === learnerId);
    if (learner) {
      
      if (learner.status) {

        Swal.fire('Already Active', 'This learner is already active.', 'info');
      } else {
        learner.status = true; // Reactivate the learner
        this.userService.reactivateUser(learnerId).subscribe(
          data => {Swal.fire('Reactivated!', 'learner has been reactivated.', 'success');}
        );
        
      }
    }
  }
  

  reactivateInstructor(instructorId: number) {


    const instructor = this.realInstructors.find(i => i.userId === instructorId);
    if (instructor) {
      
      if (instructor.status) {

        Swal.fire('Already Active', 'This instructor is already active.', 'info');
      } else {
        instructor.status = true; // Reactivate the instructor
        this.userService.reactivateUser(instructorId).subscribe(
          data => {Swal.fire('Reactivated!', 'Instructor has been reactivated.', 'success');}
        );
        
      }
    }
  }
  
}