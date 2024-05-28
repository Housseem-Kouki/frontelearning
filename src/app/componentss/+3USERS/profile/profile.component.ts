import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { error } from 'console';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isEditMode = false;
  cannot = false;

  firstName: string = 'John';
  lastName: string = 'Doe';
  email: string = 'johndoe@example.com';
  birthdate: string = '1990-01-01';
  phoneNumber: string = '123456789';
  country: string = 'USA';
  location: string = 'New York';
  role: string = 'Software Developer';
currentUser !:any;
  constructor(private router: Router , private userService : UserService){}

  ngOnInit(): void {
    const idUser = Number(localStorage.getItem('currentUserId'));
    console.log("current user id ",idUser)
    this.userService.getUserById(idUser).subscribe(
data =>{this.currentUser = data , console.log("current user object : ",this.currentUser)},
error => {console.log("error fetch user current",error)}
    );
  }
  

  editMode() {
    this.isEditMode = true;
  }
  
  cantEdit() {
    return false;
  }

  editPhoto(event: any): void {
    console.log("target event:",event.target)
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      
   
    //  const file = event.target.files[0];
      this.userService.updateImageUser(this.currentUser.userId,event).subscribe(
        data => {console.log("image updated !")},
        error => {console.log("error update image  !",error)}
      );
      //this.currentUser.patchValue({ userPhotoFile: file });
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.editPhoto(file);
    }
  }

  saveChanges() {
    this.isEditMode = false;
    this.userService.updateUser(this.currentUser).subscribe(
      data => {console.log("user updated")},
      error => {console.log("error update user",error)}
    );
    // Add logic to save changes here
  }

  cancelEdit() {
    this.isEditMode = false;
    // Reset fields to their original values
  }

  changePassword() {
    this.router.navigate(['/changepass'])
  }
}
