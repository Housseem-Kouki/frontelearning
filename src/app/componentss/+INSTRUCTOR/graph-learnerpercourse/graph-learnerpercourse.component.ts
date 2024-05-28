import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';
import { forkJoin } from 'rxjs';
import { CourseService } from '../../../course.service';
 // Assurez-vous de l'importer correctement

@Component({
  selector: 'app-graph-learnerpercourse',
  templateUrl: './graph-learnerpercourse.component.html',
  styleUrls: ['./graph-learnerpercourse.component.css']
})
export class GraphLearnerpercourseComponent implements OnChanges {
  @Input() courses: any[] = [];
  chart: any;

  constructor(private courseService: CourseService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['courses'] && this.courses.length > 0) {
      this.updateChart();
    }
  }

  updateChart(): void {
    const labels: string[] = [];
    const data: number[] = [];

    // Array to store observables for fetching enrolled students count
    const observables = this.courses.map(course => this.courseService.getNumberOfStudents(course.courseId));

    forkJoin(observables).subscribe(
      (enrollments: number[]) => {
        this.courses.forEach((course, index) => {
          labels.push(course.courseTitle); // Push course title as label
          data.push(enrollments[index]); // Push enrollment count from observable result
        });

        // Update or create the chart
        if (this.chart) {
          this.chart.destroy();
        }
        
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              label: 'Number of Learners',
              data: data,
              backgroundColor: 'rgba(153, 0, 0, 0.2)',
              borderColor: 'rgba(153, 0, 0, 1)',
              borderWidth: 1.5
            }]
          },
          options: {
            scales: {
              y: {
                beginAtZero: true
              }
            }
          }
        });
      },
      error => {
        console.error('Error fetching enrollment counts:', error);
      }
    );
  }
}
