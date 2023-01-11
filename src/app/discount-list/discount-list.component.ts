import { Component, OnInit } from '@angular/core';
import {DiscountSettingForCreation} from "../models/discount/discountSettings";
import {DiscountService} from "../discount.service";
import {NgToastService} from "ng-angular-popup";
import {v4 as uuidv4} from "uuid";

@Component({
  selector: 'wea5-discount-list',
  templateUrl: './discount-list.component.html',
  styles: [
  ]
})
export class DiscountListComponent implements OnInit {

  constructor(private discountService: DiscountService, private toast: NgToastService) { }

  discounts: DiscountSettingForCreation[]

  metadata: {[key: string]: string} = {
    ["24EEFF2C-65C6-4482-B1AC-C6CB5F2D6B84"]: "MinProductCountDiscountRule",
    ["0F4E0B04-E32B-4897-804C-92F858468D8A"]: "TimeWindowDiscountRule",
    ["68A4020D-A8AC-4A74-8A04-24E449786898"]: "FixedValueDiscountAction",
    ["29AD1EEA-1CFB-4473-8556-65F86FCA0471"]: "PercentageDiscountAction",
  }

  emptyGuid = "empty"

  mapIdToName(id: string) {
    return this.metadata[id.toUpperCase()]
  }

  getActionForId(setting: DiscountSettingForCreation){
    return JSON.stringify(setting.action.parameters, null, 2)
  }

  getRuleForId(setting: DiscountSettingForCreation){
    return JSON.stringify(setting.rule.parameters, null, 2)
  }

  ngOnInit(): void {
    this.discountService.getAll().subscribe({
      next:(res) => {
        this.discounts = res
        console.log(this.discounts)
      },
      error:(e) => {
        this.toast.error({detail: e.error.message, duration: 10000})
      }
    })

  }

  delete(id: string) {
    this.discountService.delete(id).subscribe((res) => console.log(res))
    this.discountService.getAll().subscribe((res) => {
      this.discounts = res
    })
  }
}
