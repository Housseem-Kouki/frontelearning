import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';
import { Course } from './shared/model/Course';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8080/api/v1/courses'; // Update this URL according to your Spring application's URL

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>("/rest/course/getAllCourses");
  }

  getAllCoursesByTeacher(idteacher : number): Observable<any[]> {
    return this.http.get<any[]>("/rest/course/getAllCoursesByTeacher/"+idteacher);
  }

  getCourseById(courseId: number): Observable<any> {
    return this.http.get<any>("/rest/course/getCourseById/"+courseId);
  }

  // addCourse(course: any): Observable<any> {
  //   const formData = new FormData();
  //   // for (const key in course) {
  //   //   formData.append(key, course[key]);
  //   // }
  //   formData.append('course',JSON.stringify(course));
  //   formData.append('coursePhotoFile', course.coursePhotoFile);
  //   return this.http.post<any>(`${this.baseUrl}`, formData);
  // }

  


  addCourse(course: Course, file: File) {
    const formData = new FormData();
    formData.append('course', JSON.stringify(course));
    formData.append('file', file);
    const idUser = Number(localStorage.getItem('currentUserId'));
    return this.http.post<any>("/rest/course/addCoursesFinal/"+idUser, formData)
        .pipe(
            catchError(error => {
                console.error('Error in API call:', error);
                return throwError(error);
            })
        );
}

addContentToCourse(courseId: number, courseDTO: any): Observable<any> {
  return this.http.post("/rest/course/addContentToCourse/"+courseId, courseDTO);
}









  updateCourse(course: any, courseId: number): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${courseId}`, course);
  }

  deleteCourse(courseId: number): Observable<any> {
    return this.http.delete<any>("/rest/course/deleteCourse/"+courseId);
  }


  getCoursesForStudent(studentId : number): Observable<any[]> {
    return this.http.get<any[]>("/rest/course/getCoursesForStudent/"+studentId);
  }

  assignCourseToStudent(studentId: number, courseId: number): Observable<any> {
    return this.http.post(`/rest/course/assignCourseToStudent2/${studentId}/${courseId}`, {});
}

getEtatCourseByStudent(studentId: number, courseId: number): Observable<any[]> {
  return this.http.get<any>(`/rest/course/getEtatCourseByStudent/${studentId}/${courseId}`);
}


hideCourse(courseId:number){
  return this.http.put<any>("/rest/course/courses/"+courseId+"/hide",{});
}

revealCourse(courseId:number){
  return this.http.put<any>("/rest/course/courses/"+courseId+"/reveal",{});
}

getNumberOfStudents(courseId:number){
  return this.http.get<any>("/rest/course/getNumberOfStudents/"+courseId);
}

updateEtatProgressCourse(courseId:number,studentId:number){
  return this.http.put<any>("/rest/course/updateEtatProgressCourse/"+courseId+"/"+studentId,{});
}

addRating(courseId: number, rating: number): Observable<any> {
  return this.http.post<any>(`/rest/course/addRating/${courseId}?rating=${rating}`, {})
    .pipe(
      catchError(error => {
        console.error('Error in API call:', error);
        return throwError(error);
      })
    );
}
}