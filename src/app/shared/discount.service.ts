import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {DiscountSetting} from "../models/discount/discountSettings";
import {map, Observable} from "rxjs";
import {environment} from "../../environments/environment";

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

  saveDiscountSetting(discountSetting: DiscountSetting): Observable<DiscountSetting> {
    return this.http.post<DiscountSetting>(`${environment.server}/discount`, discountSetting,{headers: this.getHeader()})
      .pipe(map<any,DiscountSetting>(res => res))
  }

  getById(discountSettingId: string): Observable<DiscountSetting> {
    return this.http.get<DiscountSetting>(`${environment.server}/discount/${discountSettingId}`,  {headers: this.getHeader()})
      .pipe(map<any, DiscountSetting>(res => res))
  }

  getAll(): Observable<DiscountSetting[]> {
    return this.http.get<DiscountSetting[]>(`${environment.server}/discount`, {headers: this.getHeader()})
      .pipe(map<any,DiscountSetting[]>(res => res))
  }

  update(id:string, updatedSetting: DiscountSetting): Observable<DiscountSetting> {
    return this.http.put<DiscountSetting>(`${environment.server}/discount/${id}`, updatedSetting, {headers: this.getHeader()})
      .pipe(map<any,DiscountSetting>(res => res))
  }

  delete(discountSettingId: string): Observable<any>{
    return this.http.delete<any>(`${environment.server}/discount/${discountSettingId}`, {headers:this.getHeader()})
      .pipe(map<any,any>(res => res))
  }
}
