import { Component } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-graph-all',
  templateUrl: './graph-all.component.html',
  styleUrl: './graph-all.component.css'
})
export class GraphAllComponent {
  chart: any;

  constructor() { }

  ngOnInit(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Course', 'Learner', 'Instructor'], // Course names
        datasets: [{
          label: 'Statics',
          data: [93, 78, 21], // Number of learners per course
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
