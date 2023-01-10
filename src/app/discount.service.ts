import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DiscountSettingForCreation} from "./models/discount/discountSettings";
import {map, Observable} from "rxjs";
import {environment} from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }

  private getHeader(): HttpHeaders {
    let header = new HttpHeaders({
      'Accept': 'application/json',
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'X-app-key': sessionStorage.getItem('appKey') || ''
    })
    return header
  }

  saveDiscountSetting(discountSetting: DiscountSettingForCreation): Observable<DiscountSettingForCreation> {
    return this.http.post<DiscountSettingForCreation>(`${environment.server}/discount`, discountSetting,{headers: this.getHeader()})
      .pipe(map<any,DiscountSettingForCreation>(res => res))
  }

  getAll(): Observable<DiscountSettingForCreation[]> {
    return this.http.get<DiscountSettingForCreation[]>(`${environment.server}/discount`, {headers: this.getHeader()})
      .pipe(map<any,DiscountSettingForCreation[]>(res => res))
  }

  delete(discountSettingId: string): Observable<any>{
    return this.http.delete<any>(`${environment.server}/discount/${discountSettingId}`, {headers:this.getHeader()})
      .pipe(map<any,any>(res => res))
  }
}
