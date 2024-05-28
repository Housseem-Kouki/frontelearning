import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-navhome',
  templateUrl: './navhome.component.html',
  styleUrls: ['./navhome.component.css']
})
export class NavHomeComponent implements OnInit {
  userRole!: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Assign the value of userRole when the component initializes
    this.userRole = this.getUserRole();
    this.whenConnect;
    }

  isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  getUserRole(): string {
    return this.authService.getUserRole();
  }

  whenConnect(): void {
    if (this.isLoggedIn()) {
      const userRole = this.getUserRole();

      if (userRole === 'instructor') {
        this.router.navigate(['/maindash']);
      } else if (userRole === 'admin') {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/home']);
      }
    } else {
      // Redirect to login page or display a message for non-authenticated users
    }
  }

  goToAdminDashboard(){
    this.router.navigate(['/admin']);
  }

  goToInstructorDashboard(){
    this.router.navigate(['/maindash']);
  }

  goToChangePassword() {
    this.router.navigate(['/changepass'])
  }

  goToMyCourses(){
    this.router.navigate(['/mycourses']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToFView() {
    this.router.navigate(['/home']);
  }

  goToCourses(): void {
    this.router.navigate(['/allcourses']);
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }

  goToSignUp(): void {
    this.router.navigate(['/signup']);
  }

  logout() {
    this.authService.logoutUser();
    this.router.navigate(['/login']); // Redirect to the login page after logout
  }
}
