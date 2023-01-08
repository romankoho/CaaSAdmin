import {Component, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";


@Component({
  selector: 'wea5-cart-statistics',
  templateUrl: './cart-statistics.component.html',
  styles: [
  ]
})
export class CartStatisticsComponent implements OnInit {

  constructor() {
  }

  cartChart: Chart

  ngOnInit(): void {
    if (this.cartChart) this.cartChart.destroy();
    this.createChart()
  }

  createChart() {

    new Chart("chartStatistics", {
      type: 'bar',
      data: {
        labels: ["Sun", "Mon", "Tue"],
        datasets: [
          {
            data: [10, 50, 45],
            label: 'Sales Numbers',
            backgroundColor: '#f88406'
          }]
      }
    })
  }

}
