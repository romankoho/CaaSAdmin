import { Component, OnInit } from '@angular/core';
import {Shop} from "../models/shop/shop";
import {ShopService} from "../shared/shop.service";
import {AuthenticationService} from "../shared/authentication.service";

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

  constructor(private shopService: ShopService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.updateShop()
  }

  updateShop(): void {
    this.shopService.getByAdminId().subscribe(res => {
      this.shop = res
    })
  }

}
