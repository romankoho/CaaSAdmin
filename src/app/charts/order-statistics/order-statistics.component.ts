import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {StatisticsService} from "../../shared/statistics.service";
import {OrderStatisticsResultDateAggregate} from "../../models/order/orderStatisticsResultDateAggregate";
import {NgToastService} from "ng-angular-popup";
import ChartDataLabels from 'chartjs-plugin-datalabels';



@Component({
  selector: 'wea5-order-statistics',
  templateUrl: './order-statistics.component.html',
  styles: [
  ]
})
export class OrderStatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService, private toast: NgToastService) {
  }

  orderChart: Chart
  fromDate: Date = new Date()
  untilDate: Date = new Date()

  aggregatedResult: OrderStatisticsResultDateAggregate[]

  aggregate: string = "Month"
  display: string = "countOrders"

  dataLabels: string[] = []
  dataSeriesOne: number[] = []
  dataSeriesTwo: number[] = []
  dataSeriesOneLabel: string = 'Select data'
  dataSeriesTwoLabel: string = 'Select data'

  ngOnInit(): void {
    let newDate = this.fromDate.setDate(this.fromDate.getDate()-60)
    this.fromDate = new Date(newDate)
    this.createChart()
  }

  createChart() {
    if (this.orderChart) this.orderChart.destroy();

    this.orderChart = new Chart("orderStatistics", {
      type: 'bar',
      data: {
        labels: this.dataLabels,
        datasets: [
          {
            data: this.dataSeriesOne,
            label: this.dataSeriesOneLabel,
            backgroundColor: '#f88406'
          },
          {
            data: this.dataSeriesTwo,
            label: this.dataSeriesTwoLabel,
            backgroundColor: '#0143ad'
          }]
      }
    })

    if (this.display !== 'revenue' && this.display !== 'avgRevenue') {
      this.orderChart.data.datasets.splice(1,1)
      this.orderChart.update()
    }
  }


  prepareData(){
    this.dataLabels = []
    this.dataSeriesOne = []
    this.dataSeriesTwo = []

    let i = 0
    for(const item of this.aggregatedResult) {
      if(i > 60) {
        this.toast.error({detail: "Too much data", summary:"Max. 60 datapoints are displayed", duration: 5000})
        this.untilDate = new Date(this.fromDate)
        this.untilDate.setDate(this.fromDate.getDate()+60)
        break
      }
      i++

      this.dataLabels.push(item.date.slice(0,10))

      switch (this.display) {
        case "countOrders":
          this.dataSeriesOne.push(item.countOrders)
          this.dataSeriesOneLabel = "Number of orders"
          break
        case "revenue":
          this.dataSeriesOne.push(item.sumOfOrders)
          this.dataSeriesTwo.push(item.discountedSumOfOrders)
          this.dataSeriesOneLabel = "Revenue"
          this.dataSeriesTwoLabel = "Discounted Revenue"
          break
        case "avgRevenue":
          this.dataSeriesOne.push(item.avgValueOfOrders)
          this.dataSeriesTwo.push(item.discountedAvgValueOfOrders)
          this.dataSeriesOneLabel = "Avg. revenue per order"
          this.dataSeriesTwoLabel = "Discounted avg. revenue per order"
          break
        case "countProducts":
          this.dataSeriesOne.push(item.sumProducts)
          this.dataSeriesOneLabel = "sum of sold products"
          break
        case "avgProducts":
          this.dataSeriesOne.push(item.avgNumberOfProductsInOrders)
          this.dataSeriesOneLabel = "avg number of products per order"
      }
     }
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
    this.statisticsService.orderStatisticsAggregated(this.fromDate, this.untilDate, this.aggregate).subscribe(res => {
      this.aggregatedResult = res
      this.prepareData()
      this.createChart()
    })
  }

}
