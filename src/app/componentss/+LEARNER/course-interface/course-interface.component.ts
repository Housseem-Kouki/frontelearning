import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CourseService } from '../../../course.service';
import { Answer } from '../../+INSTRUCTOR/update-course/update-course.component';
import { Quiz } from '../../../quiz.model';

@Component({
  selector: 'app-course-interface',
  templateUrl: './course-interface.component.html',
  styleUrls: ['./course-interface.component.css']
})
export class CourseInterfaceComponent {
  // Assign example course data
  courseReal: any; // Modifier le type si possible
  isSidebarHidden: boolean = false;
  selectedContent: any;
  answers: any = {};
  currentLessonIndex: number = 0; // Track current lesson
  totalCorrectAnswers: number = 0; // Track total correct answers
  totalQuestions: number = 0; // Track total questions
  showRateBox: boolean = false;
  rating!: number;
  currentuserid !: number;

  constructor(private router: Router , private route: ActivatedRoute , private courseService : CourseService) {}
  courseId!: number;
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId'));
      this.fetchCourse();
    }
  
   );
   this.currentuserid = Number(localStorage.getItem('currentUserId'))
    console.log("id user connected : ", this.currentuserid)
  }

  fetchCourse(): void {
    this.courseService.getCourseById(this.courseId).subscribe(
      data => {
        this.courseReal = data;
        console.log("Course récupéré : " + JSON.stringify(this.courseReal, null, 2));
        this.courseReal.lessons.sort((a: any, b: any) => a.lessonId - b.lessonId); // Trie les leçons par lessonId
      },
      error => {
        console.log("Erreur récupération course", error);
      }
    );
  }

  sortLessons(): void {
    this.courseReal.lessons.sort((a: any, b: any) => a.lessonId - b.lessonId); // Trie les leçons par lessonId, changez cela si nécessaire
  }

  displayContent(content: any) {
    if (content.hasOwnProperty('quizQuestion')) {
      this.selectedContent = { quiz: content };
    } else {
      this.selectedContent = content;
    }
  }

  closeRateBox(): void {
    this.showRateBox = false;
  }

  submitQuiz() {
    const quiz = this.selectedContent?.quiz;
    if (!quiz) {
      console.error('No quiz selected.');
      return;
    }
  
    const correctAnswer = quiz.answers.find((answer: any) => answer.correct);
    if (!correctAnswer) {
      console.error('No correct answer found for this quiz.');
      return;
    }
  
    const userAnswer = this.answers[quiz.quizQuestion];
    const isCorrect = userAnswer === correctAnswer.answer;
  
    if (isCorrect) {
      this.totalCorrectAnswers++;
    }
    this.totalQuestions++;
  
    const currentLesson = this.courseReal.lessons[this.currentLessonIndex];
    const currentQuizIndex = currentLesson.quizzes.findIndex((q: any) => q === quiz);
  
    const isLastQuizInLesson = currentQuizIndex === currentLesson.quizzes.length - 1;
    const isLastLesson = this.currentLessonIndex === this.courseReal.lessons.length - 1;
  
    Swal.fire({
      title: isCorrect ? 'Correct!' : 'Incorrect!',
      text: isCorrect ? 'Your answer is correct.' : `Your answer is incorrect. The correct answer is: ${correctAnswer.answer}`,
      icon: isCorrect ? 'success' : 'error',
      confirmButtonText: 'Next'
    }).then(() => {
      if (isLastLesson && isLastQuizInLesson) {
        const result = `You answered ${this.totalCorrectAnswers} correct quizzes out of ${this.totalQuestions}.`;
        if (this.totalCorrectAnswers === this.totalQuestions) {
          Swal.fire({
            title: 'Congratulations!',
            text: "You've completed the course.",
            icon: 'success'
          }).then(() => {
            this.courseService.updateEtatProgressCourse(this.courseReal.courseId,this.currentuserid).subscribe();
            this.showRateBox = true; // Show the rate box
          });
        } else {
          Swal.fire({
            title: 'Failure',
            text: `${result} You need to go back and have all quizzes correct.`,
            icon: 'error',
            confirmButtonText: 'Proceed'
          }).then((result) => {
            if (result.isConfirmed) {
              // Reset quiz progress and navigate to the first quiz
              this.resetQuizProgress();
            }
          });
        }
      } else {
        this.navigateToNextQuizOrLesson(currentQuizIndex, currentLesson);
      }
    });
  }
  
  
  resetQuizProgress() {
    this.currentLessonIndex = 0;
    this.totalCorrectAnswers = 0;
    this.totalQuestions = 0;
    this.selectedContent = { quiz: this.courseReal.lessons[0].quizzes[0] };
  }
  
  navigateToNextQuizOrLesson(currentQuizIndex: number, currentLesson: any) {
    if (currentQuizIndex < currentLesson.quizzes.length - 1) {
      this.selectedContent = { quiz: currentLesson.quizzes[currentQuizIndex + 1] };
    } else {
      this.currentLessonIndex++;
      const nextLesson = this.courseReal.lessons[this.currentLessonIndex];
      if (nextLesson && nextLesson.quizzes.length > 0) {
        this.selectedContent = { quiz: nextLesson.quizzes[0] };
      } else if (nextLesson && nextLesson.chapters.length > 0) {
        this.selectedContent = nextLesson.chapters[0];
      } else {
        console.error('Next lesson or chapter not found.');
      }
    }
  }
  

  onRateChange(value: number) {
    this.rating = value;
  }

  onSubmit(): void {
    if (this.rating > 0) {
      this.courseService.addRating(this.courseId, this.rating).subscribe(
        response => {
          console.log('Rating added successfully:', response);
          this.router.navigate(['/mycourses']);
        },
        error => {
          console.error('Error adding rating:', error);
        }
      );
    } else {
      console.warn('Please select a rating before submitting.');
    }
  }

  
  
  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  isVideoContent(content: any): boolean {
    return content && content.chapterVideo && !content.quiz;
  }
}
