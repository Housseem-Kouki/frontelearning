import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-link-password',
  templateUrl: './link-password.component.html',
  styleUrl: './link-password.component.css'
})
export class LinkPasswordComponent implements OnInit {
    currentPassword: string = '';
    NewPassword : string = '';
    ConfirmPassword : string = '';
    errorMessage: string = '';
    token!:string;
    passwordStrengthMessage: string = '';
    passwordStrengthColor: string = '';
    constructor(private recp:ActivatedRoute,private r: Router, private userService:UserService) {}

    ngOnInit(): void {
      this.recp.paramMap.subscribe(
        params => this.token= String(params.get('token'))  
        );
    }
    checkPasswordStrength(): void {
  
      if (!this.NewPassword) {
        this.passwordStrengthMessage = '';
        this.passwordStrengthColor = '';
        return;
      }
    
      // Check for each strength criteria
      const hasLowercase = /[a-z]/.test(this.NewPassword);
      const hasNumber = /[0-9]/.test(this.NewPassword);
    
      let strength = 0;
      if (hasLowercase) strength++;
      if (hasNumber) strength++;
    
      // Check length
      if (this.NewPassword.length > 5) {
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
  

    resetPasswordData = {} as any;
    changePassword() {
      // Implement your change password logic here
      if (this.NewPassword  !== this.ConfirmPassword) {
        // Passwords match, proceed with changing password
        const errorMessage = 'Password does not match. Please try again. ';
        this.errorMessage = errorMessage; 
        // Add your logic to call the API or service to change the password
      } else{
        this.resetPasswordData.NewPassword = this.NewPassword;
        this.resetPasswordData.ConfirmPassword = this.ConfirmPassword;
console.log("resetPasswordData", this.resetPasswordData)
this.userService.resetPassword(this.resetPasswordData, this.token).subscribe(
  data => {
      alert("password was changed successfully");
      this.r.navigate(['login']);
  },
  error => {
      if (error.status === 200 && error.error instanceof ProgressEvent) {
          // If the status is 200 and the error is a ProgressEvent, it means the response was plain text
          alert(error.message);
      } else {
          alert("problem with reset password!");
          console.log("problem with reset password!", error);
      }
  }
);
      }
    }
}