import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CourseService } from '../../../course.service';
import { Course } from '../../../shared/model/Course';

@Component({
  selector: 'app-create-course',
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  courseCreationForm: FormGroup;
  formSubmitted = false;
  successAddCourse = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private courseService: CourseService) {
    this.courseCreationForm = this.formBuilder.group({
      courseTitle: ['', Validators.required],
      courseCategory: ['', Validators.required],
      courseDescription: ['', Validators.required],
      courseLevel: ['', Validators.required],
      courseIsPremium: [false],
      courseDuration: ['', Validators.required],
      durationUnit: ['hours', Validators.required],
      coursePhotoFile: [null],
    });
  }

  ngOnInit(): void {}

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.courseCreationForm.patchValue({ coursePhotoFile: file });
    }
  }

  onSubmit(): void {
    this.formSubmitted = true;

    if (this.courseCreationForm.valid) {
        const formData = this.courseCreationForm.value;
        const course: Course = this.transformFormDataToCourse(formData);
        console.log("course : ", course);
        this.courseService.addCourse(course, formData.coursePhotoFile).subscribe(
            (data) => {
                //console.log('Course added successfully:', data.courseId);
                this.successAddCourse = true;
                console.log('Course status:', this.successAddCourse);
                Swal.fire({
                    title: 'Course Added Successfully!',
                    text: "Please proceed to fill the course's content",
                    icon: 'success',
                    confirmButtonText: 'Proceed',
                }).then((result: { isConfirmed: boolean }) => {
                    if (result.isConfirmed) {
                        //ici 
                        console.log('Navigating to /addcontent... with data',data);
                        this.router.navigate(['./addcontent',data.courseId]);
                    }
                });
            },
            error => {
                console.error('Error adding course:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error adding course',
                    text: 'An error occurred while adding the course. Please try again.',
                    confirmButtonText: 'OK'
                });
            }
        );
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Course Information Not Filled',
            text: 'Please fill the required information and select a photo to proceed.',
            confirmButtonText: 'OK'
        });
    }
}

  transformFormDataToCourse(formData: any): Course {
    const course: Course = new Course();
    course.courseTitle = formData.courseTitle;
    course.courseCategory = formData.courseCategory;
    course.courseDescription = formData.courseDescription;
    course.courseLevel = formData.courseLevel;
    course.courseIsPremium = formData.courseIsPremium;
    course.courseDuration = formData.courseDuration;
    //course.coursePhotoFile = formData.coursePhotoFile;

    return course;
  }
}