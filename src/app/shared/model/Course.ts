export class Course {
    courseId!: string;
    courseTitle!: string;
    courseCategory!: string;
    courseDescription!: string;
    courseDuration!: string;
    courseLevel!: string;
    courseIsPremium!: string;
   // coursePhotoFile!: File; // Using the File type for file upload

    constructor(init?: Partial<Course>) {
        Object.assign(this, init);
    }
}

