import { Component, OnInit } from '@angular/core';
import {DiscountSetting} from "../models/discount/discountSettings";
import {DiscountService} from "../discount.service";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'wea5-discount-list',
  templateUrl: './discount-list.component.html',
  styles: [
  ]
})
export class DiscountListComponent implements OnInit {

  constructor(private discountService: DiscountService, private toast: NgToastService) { }

  discounts: DiscountSetting[]

  metadata: {[key: string]: string} = {
    ["24eeff2c-65c6-4482-b1ac-c6cb5f2d6b84"]: "MinProductCountDiscountRule",
    ["0f4e0b04-e32b-4897-804c-92f858468d8a"]: "TimeWindowDiscountRule",
    ["68a4020d-a8ac-4a74-8a04-24e449786898"]: "FixedValueDiscountAction",
    ["29ad1eea-1cfb-4473-8556-65f86fca0471"]: "PercentageDiscountAction",
  }

  emptyGuid = "empty"

  mapIdToName(id: string) {
    return this.metadata[id.toUpperCase()]
  }

  getActionForId(setting: DiscountSetting){
    return JSON.stringify(setting.action.parameters, null, 2)
  }

  getRuleForId(setting: DiscountSetting){
    return JSON.stringify(setting.rule.parameters, null, 2)
  }

  ngOnInit(): void {
    this.discountService.getAll().subscribe({
      next:(res) => {
        this.discounts = res
      },
      error:(e) => {
        this.toast.error({detail: e.error.message, duration: 10000})
      }
    })
  }

  delete(id: string) {
    this.discountService.getAll().subscribe((res) => {
      this.discounts = res
    })
  }
}
