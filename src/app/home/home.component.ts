import { Component, OnInit } from '@angular/core';
import {Shop} from "../models/shop/shop";
import {ShopService} from "../shared/shop.service";

@Component({
  selector: 'wea5-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  shop: Shop = {
    cartLifetimeMinutes: 0, id: "",
    shopAdmin: {
      id:"",
      shopId: ""
    }
  }

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.shopService.cast.subscribe(res => this.shop = res)
    this.shopService.getByAdminId()
  }

}
