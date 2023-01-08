import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ShopService} from "./shop.service";
import {OrderStatisticsResultDateAggregate} from "../models/order/orderStatisticsResultDateAggregate";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient, private shopService: ShopService) { }

  orderStatisticsAggregated(from: Date, until: Date, aggregate: string): Observable<OrderStatisticsResultDateAggregate[]> {

    let header = new HttpHeaders({
      'Accept': 'application/json',
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'X-app-key': sessionStorage.getItem('appKey') || ''
    })

    let fromIso = from.toISOString()
    let untilIso = until.toISOString()

    return this.http.get<OrderStatisticsResultDateAggregate[]>(`${environment.server}/orderadministration/orderstatisticsaggregatedbydate?from=${fromIso}&until=${untilIso}&aggregate=${aggregate}`,
      {headers: header}).pipe(map<any, OrderStatisticsResultDateAggregate[]>(res => res))
  }
}
