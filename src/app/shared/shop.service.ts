import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, map, Observable, of, Subject} from "rxjs";
import {Shop} from "../models/shop/shop";
import {environment} from "../../environments/environment";
import {ShopForUpdate} from "../models/shop/shopForUpdate";

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private shop = new BehaviorSubject<Shop>( {id: "", cartLifetimeMinutes: 0, shopAdmin: {id:"", shopId: ""}})
  cast = this.shop.asObservable()

  getByAdminId() {
    let header = new HttpHeaders({
      'Accept': 'application/json',
    })

    let storage = JSON.parse(sessionStorage.getItem("id_token_claims_obj") || "[]")

    this.http.get<Shop>(`${environment.server}/shopadministration/adminid/${storage['caasId']}`, {headers: header})
      .pipe(map<any, Shop>(res => res)).subscribe(shopFromBackend => {
        let updatedShop: Shop = {
          ...shopFromBackend
        }
        this.shop.next(updatedShop)

      sessionStorage.setItem('tenantId', shopFromBackend.id);
      sessionStorage.setItem('appKey', shopFromBackend.appKey || '')
      })
  }

  updateShop(shopId: string, updatedShop: ShopForUpdate): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.updateShopRestCall(shopId, updatedShop).subscribe({
      next:(shopFromBackend) => {
        let updatedShop: Shop = {
          ...shopFromBackend
        }
        sessionStorage.setItem("appKey", shopFromBackend.appKey || "");
        this.shop.next(updatedShop);
        subject.next(true)
      },
      error:(e) => {
        subject.next(false)
      }
    })
    return subject.asObservable()
  }

  private updateShopRestCall(shopId: string, updatedShop: ShopForUpdate): Observable<Shop> {
    let header = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    })

    return this.http.put<ShopForUpdate>(`${environment.server}/shopadministration/${shopId}`, updatedShop, {headers: header})
      .pipe(map<any, Shop>(res => res))
  }
}
