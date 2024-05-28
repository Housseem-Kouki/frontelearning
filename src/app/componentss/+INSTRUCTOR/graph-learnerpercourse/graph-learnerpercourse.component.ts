import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph-learnerpercourse',
  templateUrl: './graph-learnerpercourse.component.html',
  styleUrl: './graph-learnerpercourse.component.css'
})
export class GraphLearnerpercourseComponent {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['Course 1', 'Course 2', 'Course 3', 'Course 4'], // Course names
        datasets: [{
          label: 'Number of Learners',
          data: [7, 13, 9, 36], // Number of learners per course
          backgroundColor: [
            'rgba(153, 0, 0, 0.2)',   // Dark red
            'rgba(0, 51, 102, 0.2)',  // Dark blue
            'rgba(128, 128, 0, 0.2)', // Dark yellow
          ],
          borderColor: [
            'rgba(153, 0, 0, 1)',     // Dark red
            'rgba(0, 51, 102, 1)',    // Dark blue
            'rgba(128, 128, 0, 1)',   // Dark yellow
          ],
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
  }
}

