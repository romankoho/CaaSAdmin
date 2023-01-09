import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShopService} from "./shop.service";
import {OrderStatisticsResultDateAggregate} from "../models/order/orderStatisticsResultDateAggregate";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {CartStatisticsResultDateAggregate} from "../models/cart/cartStatisticsResultDateAggregate";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }

  orderStatisticsAggregated(from: Date, until: Date, aggregate: string): Observable<OrderStatisticsResultDateAggregate[]> {

    let header = new HttpHeaders({
      'Accept': 'application/json',
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'X-app-key': sessionStorage.getItem('appKey') || ''
    })

    //datepicker otherwise delivers 31.04. 23:00 depending (due to summer/winter time).
    //by adding two hours I make sure that I'm really always picking the right days
    let fromIso = new Date(from.setTime(from.getTime() + (2*60*60*1000))).toISOString()
    let untilIso = new Date(until.setTime(until.getTime() + (2*60*60*1000))).toISOString()

    return this.http.get<OrderStatisticsResultDateAggregate[]>(`${environment.server}/orderadministration/orderstatisticsaggregatedbydate?from=${fromIso}&until=${untilIso}&aggregate=${aggregate}`,
      {headers: header}).pipe(map<any, OrderStatisticsResultDateAggregate[]>(res => res))
  }

  cartStatisticsAggregated(from: Date, until: Date, aggregate: string): Observable<CartStatisticsResultDateAggregate[]> {

    let header = new HttpHeaders({
      'Accept': 'application/json',
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'X-app-key': sessionStorage.getItem('appKey') || ''
    })

    //datepicker otherwise delivers 31.04. 23:00 depending (due to summer/winter time).
    //by adding two hours I make sure that I'm really always picking the right days
    let fromIso = new Date(from.setTime(from.getTime() + (2*60*60*1000))).toISOString()
    let untilIso = new Date(until.setTime(until.getTime() + (2*60*60*1000))).toISOString()

    return this.http.get<CartStatisticsResultDateAggregate[]>(`${environment.server}/cartadministration/cartstatisticsaggregatedbydate?from=${fromIso}&until=${untilIso}&aggregate=${aggregate}`,
      {headers: header}).pipe(map<any, CartStatisticsResultDateAggregate[]>(res => res))
  }

}
