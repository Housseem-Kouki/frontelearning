import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import { LessonService } from '../../../lesson.service';
import { ChapterService } from '../../../chapter.service';
import { QuizService } from '../../../quiz.service';
import { CourseService } from '../../../course.service';

interface Answer {
  text: string;
  correct: boolean;
}

interface Quiz {
  quizQuestion: string;
  quizDescription: string;
  answers: Answer[];
  quizScore: number;
}

interface Chapter {
  chapterTitle: string;
  chapterDescription: string;
  chapterVideoLink: string;
}

interface Lesson {
  lessonTitle: string;
  lessonDescription: string;
  lessonQuizzes: Quiz[];
  lessonChapters: Chapter[];
}

interface CourseContent {
  lessons: Lesson[];
}

@Component({
  selector: 'app-addcontent',
  templateUrl: './addcontent.component.html',
  styleUrls: ['./addcontent.component.css']
})
export class AddcontentComponent implements OnInit {
  courseLessons: Lesson[] = [{ lessonTitle: '', lessonDescription: '', lessonQuizzes: [], lessonChapters: [] }];

  constructor(private route: ActivatedRoute, private router: Router, private lessonService: LessonService, private chapterService: ChapterService, private quizService: QuizService, private courseService: CourseService) { }

  courseId!: number;

  ngOnInit(): void {
    this.route.paramMap.subscribe(
      params => this.courseId = Number(params.get('courseId'))
    );
  }

  addLesson(): void {
    this.courseLessons.push({ lessonTitle: '', lessonDescription: '', lessonQuizzes: [], lessonChapters: [] });
  }

  deleteLesson(index: number): void {
    if (index !== 0) {
      this.courseLessons.splice(index, 1);
    } else {
      alert("Cannot delete the first lesson.");
    }
  }

  addChapter(lessonIndex: number): void {
    this.courseLessons[lessonIndex].lessonChapters.push({ chapterTitle: '', chapterDescription: '', chapterVideoLink: '' });
  }

  deleteChapter(lessonIndex: number, chapterIndex: number): void {
    this.courseLessons[lessonIndex].lessonChapters.splice(chapterIndex, 1);
  }

  addQuiz(lessonIndex: number): void {
    this.courseLessons[lessonIndex].lessonQuizzes.push({
      quizQuestion: '',
      quizDescription: '',
      answers: [{ text: '', correct: false }, { text: '', correct: false }],
      quizScore: 100
    });
  }

  deleteQuiz(lessonIndex: number, quizIndex: number): void {
    this.courseLessons[lessonIndex].lessonQuizzes.splice(quizIndex, 1);
  }

  addAnswer(lessonIndex: number, quizIndex: number): void {
    this.courseLessons[lessonIndex].lessonQuizzes[quizIndex].answers.push({ text: '', correct: false });
  }

  deleteAnswer(lessonIndex: number, quizIndex: number, answerIndex: number): void {
    if (this.courseLessons[lessonIndex].lessonQuizzes[quizIndex].answers.length > 2) {
      this.courseLessons[lessonIndex].lessonQuizzes[quizIndex].answers.splice(answerIndex, 1);
    } else {
      alert("At least two answers are required for a quiz.");
    }
  }

  getErrorMessage(): string {
    for (let lessonIndex = 0; lessonIndex < this.courseLessons.length; lessonIndex++) {
      const lesson = this.courseLessons[lessonIndex];
      if (!lesson.lessonTitle.trim()) {
        return `Lesson ${lessonIndex + 1} is missing a title.`;
      }
      if (!lesson.lessonDescription.trim()) {
        return `Lesson ${lessonIndex + 1} is missing a description.`;
      }
      for (let chapterIndex = 0; chapterIndex < lesson.lessonChapters.length; chapterIndex++) {
        const chapter = lesson.lessonChapters[chapterIndex];
        if (!chapter.chapterTitle.trim()) {
          return `Chapter ${chapterIndex + 1} in Lesson ${lessonIndex + 1} is missing a title.`;
        }
        if (!chapter.chapterDescription.trim()) {
          return `Chapter ${chapterIndex + 1} in Lesson ${lessonIndex + 1} is missing a description.`;
        }
      }
      for (let quizIndex = 0; quizIndex < lesson.lessonQuizzes.length; quizIndex++) {
        const quiz = lesson.lessonQuizzes[quizIndex];
        if (!quiz.quizQuestion.trim()) {
          return `Quiz ${quizIndex + 1} in Lesson ${lessonIndex + 1} is missing a question.`;
        }
        if (!quiz.quizDescription.trim()) {
          return `Quiz ${quizIndex + 1} in Lesson ${lessonIndex + 1} is missing a description.`;
        }
        console.log("answers : ",quiz.answers)
        if (!quiz.answers.some(answer => answer.text.trim() && answer.correct)) {
          return `Quiz ${quizIndex + 1} in Lesson ${lessonIndex + 1} must have at least one correct answer with text.`;
        }
      }
    }
    return '';
  }

  onSubmit(event: Event): void {
    event.preventDefault();

    const errorMessage = this.getErrorMessage();
    if (errorMessage) {
      Swal.fire({
        icon: 'error',
        title: 'No Content Added!',
        text: errorMessage,
        confirmButtonText: 'OK'
      });
    } else {
      console.log('Form submitted! Here is the content:', { lessons: this.courseLessons });

      const courseContent = {
        lessons: this.courseLessons
      };
        console.log("content final : " , courseContent)
      this.courseService.addContentToCourse(this.courseId, courseContent).subscribe(response => {
        console.log("final submit : ",courseContent)
        Swal.fire({
          icon: 'success',
          title: 'Content Added Successfully!',
          text: 'Your content has been added successfully.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/maindash']);
        });
      });
    }
  }
}
