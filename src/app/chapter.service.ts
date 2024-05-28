import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  private baseUrl = 'http://localhost:8080/api/v1/chapters'; // Update this URL according to your Spring application's URL

  constructor(private http: HttpClient) { }

  getChapters(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
  }

  getChapterById(chapterId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${chapterId}`);
  }

  addChapter(courseId: number, chapter: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/lessons/${courseId}/chapters`, chapter);
  }

  updateChapter(chapter: any, chapterId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${chapterId}`, chapter);
  }

  deleteChapter(chapterId: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${chapterId}`);
  }
}
