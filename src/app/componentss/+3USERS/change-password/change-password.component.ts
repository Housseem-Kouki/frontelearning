import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import {  Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  currentPassword: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  successMessage: string = '';

  passwordStrengthMessage: string = '';
  passwordStrengthColor: string = '';
constructor( private userService : UserService , private authService : AuthService , private router : Router) { }
  checkPasswordStrength(): void {

    if (!this.newPassword) {
      this.passwordStrengthMessage = '';
      this.passwordStrengthColor = '';
      return;
    }
  
    // Check for each strength criteria
    const hasLowercase = /[a-z]/.test(this.newPassword);
    const hasNumber = /[0-9]/.test(this.newPassword);
  
    let strength = 0;
    if (hasLowercase) strength++;
    if (hasNumber) strength++;
  
    // Check length
    if (this.newPassword.length > 5) {
      strength++;
    }
  
    // Determine strength message and color based on the number of fulfilled criteria
    if (strength === 3) {
      this.passwordStrengthMessage = 'Strong password';
      this.passwordStrengthColor = 'green';
    } else if (strength === 2) {
      this.passwordStrengthMessage = 'Moderate password';
      this.passwordStrengthColor = 'orange';
    } else {
      this.passwordStrengthMessage = 'Weak password';
      this.passwordStrengthColor = 'red';
    }
  }

  changePassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'New password and confirm password do not match. Please try again.';
      return;
    }

    const idUserconnected = Number(localStorage.getItem('currentUserId'));
    this.userService.changePassword(idUserconnected, this.currentPassword, this.newPassword, this.confirmPassword)
      .subscribe(
        response => {
        Swal.fire({
          title: 'You must re-authenticate',
          text: 'Password has been changed successfully.',
          icon: 'success'
        }).then((result) => {
          if (result.isConfirmed) {
            // Appeler la fonction logout de authService ici
            this.authService.logoutUser(); // Assurez-vous que la méthode s'appelle correctement
          }
        });
     

        this.authService.logoutUser();
      },
        
        error => {
          console.log("error",error)
          this.errorMessage = error.error.message || 'An error occurred while changing the password.';
      //    Swal.fire(error.error, 'An error occurred while changing the password.', 'info');
        }
      );
  }
}