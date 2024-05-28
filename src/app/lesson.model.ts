import { Chapter } from './chapter.model'; 
import { Quiz } from './quiz.model'; 

export interface Lesson {
  lessonTitle: string;
  lessonQuizzes: Quiz[];
}
