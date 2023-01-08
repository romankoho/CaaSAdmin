import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chart} from "chart.js";
import {StatisticsService} from "../../shared/statistics.service";
import {OrderStatisticsResultDateAggregate} from "../../models/order/orderStatisticsResultDateAggregate";



@Component({
  selector: 'wea5-order-statistics',
  templateUrl: './order-statistics.component.html',
  styles: [
  ]
})
export class OrderStatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService) {
  }

  cartChart: Chart
  fromDate: Date = new Date()
  untilDate: Date = new Date()

  data: OrderStatisticsResultDateAggregate[]

  ngOnInit(): void {
    this.createChart()
  }


  createChart() {
    if (this.cartChart) this.cartChart.destroy();
    this.cartChart = new Chart("cartStatistics", {
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


  fromDateChanged($event: Date) {
    this.fromDate = $event
    this.updateData()
  }

  untilDateChanged($event: Date) {
    this.untilDate = $event
    this.updateData()
  }

  private updateData() {
    this.statisticsService.orderStatisticsAggregated(this.fromDate, this.untilDate, "Month").subscribe(res => {
      this.data = res
      console.log(this.data)
    })
  }
}
