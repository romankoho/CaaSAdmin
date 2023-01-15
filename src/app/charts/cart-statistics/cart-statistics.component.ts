import {Component, OnInit} from '@angular/core';
import {Chart} from "chart.js";
import {StatisticsService} from "../../shared/statistics.service";
import {NgToastService} from "ng-angular-popup";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {CartStatisticsResultDateAggregate} from "../../models/cart/cartStatisticsResultDateAggregate";

@Component({
  selector: 'wea5-cart-statistics',
  templateUrl: './cart-statistics.component.html',
  styles: [
  ]
})
export class CartStatisticsComponent implements OnInit {

  constructor(private statisticsService: StatisticsService, private toast: NgToastService) {
  }

  cartChart: Chart

  fromDate: Date = new Date()
  untilDate: Date = new Date()

  aggregatedResult: CartStatisticsResultDateAggregate[]

  aggregate: string = "Month"
  display: string = "countCarts"

  dataLabels: string[] = []
  dataSeriesOne: number[] = []
  dataSeriesOneLabel: string = 'Select data'

  ngOnInit(): void {
    let newDate = this.fromDate.setDate(this.fromDate.getDate()-60)
    this.fromDate = new Date(newDate)
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
            data: this.dataSeriesOne,
            label: this.dataSeriesOneLabel,
            backgroundColor: '#f88406'
          }]
      }
    })
  }

  prepareData(){
    this.dataLabels = []
    this.dataSeriesOne = []

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
        case "countCarts":
          this.dataSeriesOne.push(item.countCarts)
          this.dataSeriesOneLabel = "Number of orders"
          break
        case "sumCartValue":
          this.dataSeriesOne.push(item.sumCartsValue)
          this.dataSeriesOneLabel = "Added value of carts"
          break
        case "avgValue":
          this.dataSeriesOne.push(item.avgValueOfCarts)
          this.dataSeriesOneLabel = "Avg value of carts"
          break
        case "countProducts":
          this.dataSeriesOne.push(item.countProductsInCarts)
          this.dataSeriesOneLabel = "Number of products in carts"
          break
        case "avgProducts":
          this.dataSeriesOne.push(item.avgProductsInCart)
          this.dataSeriesOneLabel = "Avg. products per cart"
          break
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
    this.statisticsService.cartStatisticsAggregated(this.fromDate, this.untilDate, this.aggregate).subscribe(res => {
      this.aggregatedResult = res
      this.prepareData()
      this.createChart()
    })
  }

}
