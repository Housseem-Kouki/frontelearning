import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CreateCourseComponent } from './componentss/+INSTRUCTOR/create-course/create-course.component';
import { AddcontentComponent } from './componentss/+INSTRUCTOR/addcontent/addcontent.component';
import { InstMainDashComponent } from './componentss/+INSTRUCTOR/instmaindash/instmaindash.component';
import { FviewComponent } from './componentss/+GENERAL/fview/fview.component';
import { LogComponent } from './componentss/+GENERAL/log/log.component';
import { SupComponent } from './componentss/+GENERAL/sup/sup.component';
import { ProfileComponent } from './componentss/+3USERS/profile/profile.component';
import { NavHomeComponent } from './componentss/+GENERAL/navhome/navhome.component';
import { ReviewsComponent } from './componentss/reviews/reviews.component';
import { FooterComponent } from './componentss/+GENERAL/footer/footer.component';
import { UpdateCourseComponent } from './componentss/+INSTRUCTOR/update-course/update-course.component';
import { HttpClientModule } from '@angular/common/http';
import { CourseInterfaceComponent } from './componentss/+LEARNER/course-interface/course-interface.component';
import { SafeUrlPipe } from './safe-url.pipe';
import { AllcoursesComponent } from './componentss/+GENERAL/allcourses/allcourses.component';
import { TopCoursesComponent } from './componentss/+GENERAL/top-courses/top-courses.component';
import { ViewcourseComponent } from './componentss/+GENERAL/viewcourse/viewcourse.component';
import { StarRatingComponent } from './componentss/+GENERAL/star-rating/star-rating.component';
import { RankingsComponent } from './componentss/+GENERAL/rankings/rankings.component';
import { GraphLearnerpercourseComponent } from './componentss/+INSTRUCTOR/graph-learnerpercourse/graph-learnerpercourse.component';
import { AdminMainDashComponent } from './componentss/+ADMIN/adminmaindash/adminmaindash.component';
import { GraphAllComponent } from './componentss/+ADMIN/graph-all/graph-all.component';
import { MyCoursesComponent } from './componentss/+LEARNER/mycourses/mycourses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StarrRatingComponent } from './componentss/+GENERAL/starr-rating/starr-rating.component';
import { ChangePasswordComponent } from './componentss/+3USERS/change-password/change-password.component';
import { LinkPasswordComponent } from './componentss/+3USERS/link-password/link-password.component';
// import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptorService } from './services/token-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    CreateCourseComponent,
    AddcontentComponent,
    InstMainDashComponent,
    FviewComponent,
    LogComponent,
    SupComponent,
    ProfileComponent,
    NavHomeComponent,
    ReviewsComponent,
    FooterComponent,
    UpdateCourseComponent,
    CourseInterfaceComponent,
    SafeUrlPipe,
    AllcoursesComponent,
    TopCoursesComponent,
    ViewcourseComponent,
    StarRatingComponent,
    RankingsComponent,
    GraphLearnerpercourseComponent,
    AdminMainDashComponent,
    GraphAllComponent,
    MyCoursesComponent,
    StarrRatingComponent,
    ChangePasswordComponent,
    LinkPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS  , useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }