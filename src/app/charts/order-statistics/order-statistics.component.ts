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

  aggregatedResult: OrderStatisticsResultDateAggregate[]

  aggregate: string = "Month"
  display: string = "countOrders"

  dataLabels: string[] = ["Sun", "Mon", "Tue"]
  specificData: number[] = [10, 50, 45]
  headlineLabel: string = 'Sales Numbers'

  ngOnInit(): void {
    this.createChart()
  }


  createChart() {
    if (this.cartChart) this.cartChart.destroy();
    this.cartChart = new Chart("cartStatistics", {
      type: 'bar',
      data: {
        labels: this.dataLabels,
        datasets: [
          {
            data: this.specificData,
            label: this.headlineLabel,
            backgroundColor: '#f88406'
          }]
      }
    })
  }

  prepareData(){

    this.dataLabels = []
    this.specificData = []

    for(const item of this.aggregatedResult) {
      this.dataLabels.push(item.date.slice(0,9))
      this.specificData.push(item.sumOfOrders)
    }
    this.createChart()
  }

  fromDateChanged($event: Date) {
    this.fromDate = $event
    this.updateData()
  }

  untilDateChanged($event: Date) {
    this.untilDate = $event
    this.updateData()
  }

  updateData() {
    this.statisticsService.orderStatisticsAggregated(this.fromDate, this.untilDate, "Month").subscribe(res => {
      this.aggregatedResult = res
      console.log(this.aggregatedResult)

      this.prepareData()
    })
  }

}
