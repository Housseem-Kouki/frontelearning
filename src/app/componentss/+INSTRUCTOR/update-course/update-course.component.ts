import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../course.service';
import { ActivatedRoute, Router } from '@angular/router';

export interface Lesson {
  lessonTitle: string;
  lessonDescription: string;
  lessonChapters: Chapter[];
  lessonQuizzes: Quiz[];
}

export interface Chapter {
  chapterTitle: string;
  chapterDescription: string;
  chapterVideoLink: string;
}

export interface Answer {
  text: string;
  isCorrect: boolean;
}

export interface Quiz {
  quizQuestion: string;
  quizDescription: string; // Added quizDescription field
  quizCorrectAnswer: string;
  quizScore: number;
  answers: Answer[];
}

export interface Course {
  courseId: number;
  courseTitle: string;
  courseDescription: string;
  courseDuration: string;
  coursePhotoFile: string;
  courseLessons: Lesson[];
}

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  course: Partial<Course> = {
    courseId: 0,
    courseTitle: '',
    courseDescription: '',
    courseDuration: '',
    coursePhotoFile: '',
    courseLessons: []
  };

  courseUpdateForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private coursService : CourseService , private router : Router,private route: ActivatedRoute ) {
    this.courseUpdateForm = this.formBuilder.group({
      courseTitle: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseDuration: ['', Validators.required],
    });
  }
  courseId !: number;
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.courseId = Number(params.get('courseId'));
     
    });
    this.course = {
      courseId: 1,
      courseTitle: 'Example Course',
      courseDescription: 'This is an example course.',
      courseLessons: [
        {
          lessonTitle: 'Introduction to Angular',
          lessonDescription: 'Learn the basics of Angular framework.',
          lessonChapters: [
            {
              chapterTitle: 'Getting Started',
              chapterDescription: 'Introduction to Angular framework.',
              chapterVideoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
            },
            {
              chapterTitle: 'Components',
              chapterDescription: 'Understanding Angular components.',
              chapterVideoLink: 'https://www.youtube.com/embed/abc123'
            }
          ],
          lessonQuizzes: [
            {
              quizQuestion: 'What is Angular?',
              quizDescription: 'Please pick one of these 3 answers: HTML framework - A Backend framework - A JavaScript framework',
              quizCorrectAnswer: 'A JavaScript framework',
              quizScore: 10,
              answers: [
                { text: 'HTML framework', isCorrect: false },
                { text: 'A Backend framework', isCorrect: false },
                { text: 'A JavaScript framework', isCorrect: true }
              ]
            }
          ]
        }
      ]
    };
  }

  onUpdateCourse(updatedCourse: Partial<Course>) {
    this.course = updatedCourse;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.courseUpdateForm.valid) {
      const allLessonsFilled = this.course.courseLessons?.every(lesson =>
        lesson.lessonTitle?.trim() !== '' && lesson.lessonDescription?.trim() !== '');
      if (allLessonsFilled) {
        console.log(this.course);
      } else {
        alert('Please fill out all lesson titles and descriptions.');
      }
    } else {
      alert('Please fill out the required course fields.');
    }
  }

  addLesson() {
    const newLesson: Lesson = {
      lessonTitle: '',
      lessonDescription: '',
      lessonChapters: [],
      lessonQuizzes: []
    };
    this.course.courseLessons?.push(newLesson);
  }

  deleteLesson(index: number) {
    this.course.courseLessons?.splice(index, 1);
  }

  addChapter(lessonIndex: number) {
    const newChapter: Chapter = {
      chapterTitle: '',
      chapterDescription: '',
      chapterVideoLink: ''
    };
    this.course.courseLessons?.[lessonIndex].lessonChapters?.push(newChapter);
  }

  deleteChapter(lessonIndex: number, chapterIndex: number) {
    this.course.courseLessons?.[lessonIndex].lessonChapters?.splice(chapterIndex, 1);
  }

  addQuiz(lessonIndex: number) {
    const newQuiz: Quiz = {
      quizQuestion: '',
      quizDescription: '', // Added quizDescription initialization
      quizCorrectAnswer: '',
      quizScore: 0,
      answers: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    };
    this.course.courseLessons?.[lessonIndex].lessonQuizzes?.push(newQuiz);
  }

  deleteQuiz(lessonIndex: number, quizIndex: number) {
    this.course.courseLessons?.[lessonIndex].lessonQuizzes?.splice(quizIndex, 1);
  }

  addAnswer(lessonIndex: number, quizIndex: number) {
    const newAnswer: Answer = { text: '', isCorrect: false };
    this.course.courseLessons?.[lessonIndex].lessonQuizzes?.[quizIndex].answers?.push(newAnswer);
  }

  deleteAnswer(lessonIndex: number, quizIndex: number, answerIndex: number) {
    this.course.courseLessons?.[lessonIndex].lessonQuizzes?.[quizIndex].answers?.splice(answerIndex, 1);
  }
}
