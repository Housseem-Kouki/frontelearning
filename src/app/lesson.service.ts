import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LessonService {
  private baseUrl = 'http://localhost:8080/api/v1/lessons'; // Update this URL according to your Spring application's URL

  constructor(private http: HttpClient) { }

  getLessons(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getLessonById(lessonId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${lessonId}`);
  }

  addLesson(lesson: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, lesson);
  }

  updateLesson(lesson: any, lessonId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${lessonId}`, lesson);
  }

  deleteLesson(lessonId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${lessonId}`);
  }
}
