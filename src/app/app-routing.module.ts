import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateCourseComponent } from './componentss/+INSTRUCTOR/create-course/create-course.component';
import { AddcontentComponent } from './componentss/+INSTRUCTOR/addcontent/addcontent.component';
import { FviewComponent } from './componentss/+GENERAL/fview/fview.component';
import { LogComponent } from './componentss/+GENERAL/log/log.component';
import { SupComponent } from './componentss/+GENERAL/sup/sup.component';
import { ProfileComponent } from './componentss/+3USERS/profile/profile.component'; 
import { InstMainDashComponent } from './componentss/+INSTRUCTOR/instmaindash/instmaindash.component';
import { UpdateCourseComponent } from './componentss/+INSTRUCTOR/update-course/update-course.component';
import { CourseInterfaceComponent } from './componentss/+LEARNER/course-interface/course-interface.component';
import { AllcoursesComponent } from './componentss/+GENERAL/allcourses/allcourses.component'; 
import { ViewcourseComponent } from './componentss/+GENERAL/viewcourse/viewcourse.component'; 
import { RankingsComponent } from './componentss/+GENERAL/rankings/rankings.component'; 
import { AdminMainDashComponent } from './componentss/+ADMIN/adminmaindash/adminmaindash.component';
import { MyCoursesComponent } from './componentss/+LEARNER/mycourses/mycourses.component';
import { ChangePasswordComponent } from './componentss/+3USERS/change-password/change-password.component';
import { AuthGuard } from './auth.guard'
import { LinkPasswordComponent } from './componentss/+3USERS/link-password/link-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'mycourses', component: MyCoursesComponent , canActivate: [AuthGuard], data: { roles: ['learner'] }},//
    { path: 'admin', component: AdminMainDashComponent, canActivate: [AuthGuard], data: { roles: ['admin'] } },
    { path: 'changepass', component: ChangePasswordComponent, canActivate: [AuthGuard], data: { roles: ['admin','instructor','learner'] } },
    { path: 'linkpassword/:token', component: LinkPasswordComponent },
    { path: 'ranking', component: RankingsComponent },
    { path: 'insidecourse/:courseId', component: CourseInterfaceComponent , canActivate: [AuthGuard], data: { roles: ['learner'] } },//
    { path: 'viewcourse/:courseId', component: ViewcourseComponent },
    { path: 'home', component: FviewComponent },
    { path: 'create-course', component: CreateCourseComponent, canActivate: [AuthGuard], data: { roles: ['instructor'] }  }, //
    { path: 'addcontent/:courseId', component: AddcontentComponent, canActivate: [AuthGuard], data: { roles: ['instructor'] } }, //
    { path: 'login', component: LogComponent },
    { path: 'signup', component: SupComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { roles: ['instructor','learner'] } },
    { path: 'maindash', component: InstMainDashComponent, canActivate: [AuthGuard], data: { roles: ['instructor'] } },
    { path: 'updatecourse', component: UpdateCourseComponent, canActivate: [AuthGuard], data: { roles: ['instructor'] } },
    { path: 'allcourses', component: AllcoursesComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
