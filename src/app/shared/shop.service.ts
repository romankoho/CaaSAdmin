import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, map, Observable, of} from "rxjs";
import {Shop} from "../models/shop/shop";
import {environment} from "../../environments/environment";
import {ShopForUpdate} from "../models/shop/shopForUpdate";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  getByAdminId() {
    let header = new HttpHeaders({
      'Accept': 'application/json',
    })

    let storage = JSON.parse(sessionStorage.getItem("id_token_claims_obj") || "[]")

    return this.http.get<Shop>(`${environment.server}/shopadministration/adminid/${storage['caasId']}`, {headers: header})
      .pipe(map<any, Shop>(res => res));
  }

  updateShop(shopId: string, updatedShop: ShopForUpdate){
    let header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    return this.http.put<ShopForUpdate>(`${environment.server}/shopadministration/${shopId}`, updatedShop, {headers: header})
      .pipe(map<any, Shop>(res => res));
  }
}
