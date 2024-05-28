import Swal from 'sweetalert2';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const userRole =  localStorage.getItem("userRole")  || '';
    const requiredRoles = (route.data as { roles: string[] }).roles;

    if (requiredRoles.includes(userRole)) {
      return true;
    } else {
      if (userRole === 'learner' && requiredRoles.includes('instructor')) {
        Swal.fire({
          title: "Unauthorized. Instructor's Interface",
          text: "This is an instructor's interface. Do you want to become an instructor?",
          icon: 'question',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
          allowOutsideClick: false
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(['/become-inst']); 
          } else {
            window.history.back(); 
          }
        });
      } else {
        Swal.fire({
          title: 'Unauthorized',
          text: 'You are not authorized to access this page.',
          icon: 'error',
          confirmButtonText: 'OK',
          allowOutsideClick: false
        }).then(() => {
          window.history.back(); 
        });
      }

      return false;
    }
  }
}
