import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users'; // Replace 'api/users' with your API endpoint

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>("/rest/user/users");
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>("/rest/user/getUserById/"+userId);
  }
  
  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  deleteUser(userId: number): Observable<void> {
    return this.http.delete<void>("/rest/user/users/"+userId);
  }

  validateUser(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/validate`, { email, password });
  }


  forgetPassword(email:string){
    return this.http.get<String>("/rest/user/requestPasswordReset/"+email);
  }

  resetPassword(data:any,token:string){
    return this.http.post<any>("/rest/user/password-reset?token="+token, data);

  }
  suspendUser(userId:number){
    return this.http.put<any>("/rest/user/users/"+userId+"/suspend",{});
  }

  reactivateUser(userId:number){
    return this.http.put<any>("/rest/user/users/"+userId+"/reactivate",{});
  }


  changePassword(idUserconnected: number, currentPassword: string, newPassword: string, confirmPassword: string): Observable<any> {
    const params = {
      idUserconnected: idUserconnected.toString(),
      currentPassword,
      newPassword,
      confirmPassword
    };
    return this.http.put<any>(`/rest/user//changePassword`, null, { params });
  }


  updateUser(user: any) {
    return this.http.put<any>(`/rest/user/updateUser`, user);
  }
  updateImageUser(idUserconnected: number,file: File) {
    const formData = new FormData();
    formData.append('file', file);
    //return this.http.put<any>(`/rest/user/updateImageUser/`+idUserconnected,{});
    return this.http.put<any>("/rest/user/updateImageUser/"+idUserconnected,{formData});
  }
}
