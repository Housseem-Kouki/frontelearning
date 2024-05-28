import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuizService {
  private baseUrl = 'http://localhost:8080/api/v1/quizzes'; // Update this URL according to your Spring application's URL

  constructor(private http: HttpClient) { }

  getQuizzes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getQuizById(quizId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${quizId}`);
  }

  addQuiz(lessonId: number, quiz: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/lessons/${lessonId}/quizzes`, quiz);
  }

  updateQuiz(quiz: any, quizId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${quizId}`, quiz);
  }

  deleteQuiz(quizId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${quizId}`);
  }
}
