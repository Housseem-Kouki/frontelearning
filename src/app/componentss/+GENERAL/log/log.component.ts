import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { error } from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  loginData = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;
  errorMessage: string = '';
currentUser !: User;
userRole!: string;
  constructor(private router: Router, private authService: AuthService , private userService:UserService) {}

  ngOnInit(): void {}

  login(): void {
    this.authService.login(this.loginData).subscribe(
      (data) => {
        if(data.status == false){
          Swal.fire({
           title: 'Account Blocked',
           text: 'Account Blocked',
           icon: 'error',
           confirmButtonText: 'OK',
           allowOutsideClick: false
         }).then(() => {
           this.authService.logoutUser();
         });
          return;
           
       }
        localStorage.setItem("token", data.token);
        this.authService.getUserRole2(data.email).subscribe(
          (user) => {
            this.currentUser = user;
           // localStorage.setItem("token", data.token);
           
            if (user.userId !== undefined) {
              localStorage.setItem("currentUserId", user.userId.toString());
          } else {
              // Handle the case where user.userId is undefined, e.g., set a default value or handle the error
              console.error("userId is undefined");
          }
            let userRole: string;
            if (this.currentUser.role === 0) {
              userRole = 'admin';

            } else if (this.currentUser.role === 1) {
              userRole = 'learner';
            } else {
              userRole = 'instructor';
            }
            localStorage.setItem("userRole",userRole);
            switch (userRole) {
              case 'admin':
                this.router.navigate(['/admin']);
                break;
              case 'learner':
                this.router.navigate(['/home']);
                break;
              case 'instructor':
                this.router.navigate(['/maindash']);
                break;
              default:
                // Handle invalid user role
                this.errorMessage = 'Invalid email and password combination. Please try again.';
                break;
            }
          },
          (error) => {
            console.log("error get role");
            this.errorMessage = 'An error occurred during login. Please try again.';
          }
        );
      },
      (error) => {
        // Handle login error
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    );
  }
  

  goToSignup(): void {
    this.router.navigate(['/signup']);
  }

  forgotPassword(): void {
    Swal.fire({
      title: 'Forgot Password',
      html: 
        `<p>Please enter your email.</p>
        <input type="email" id="forgot-email" class="swal2-input" placeholder="Enter your email">`,
      confirmButtonText: 'Send',
      showCancelButton: true,
      cancelButtonText: 'Cancel',
      preConfirm: () => {
        const emailInput = Swal.getPopup()?.querySelector('#forgot-email') as HTMLInputElement;
        const email = emailInput?.value.trim();
        if (!email) {
          Swal.showValidationMessage(`Please enter your email`);
        } else {
           //success!
           Swal.fire({
            title: 'Success',
            text: 'An email has been sent to you. Please check it out.',
            icon: 'success',
            confirmButtonColor: '#000',
            cancelButtonColor: '#333' 
          });
          // Call your API or service to send the password reset email
          this.userService.forgetPassword(email).subscribe(
            () => {
              
              //success!
              Swal.fire({
                title: 'Success',
                text: 'An email has been sent to you. Please check it out.',
                icon: 'success',
                confirmButtonColor: '#000',
                cancelButtonColor: '#333' 
              });
            },
            (error) => {
              //failure!
             // Swal.showValidationMessage(`The email entered is not valid`);
            }
          );
        }
      },
      confirmButtonColor: '#000', 
      cancelButtonColor: '#333'
    });
  }
}
