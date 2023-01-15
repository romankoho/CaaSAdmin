import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import {ProductPagedResult} from "../models/product/product-paged-result";
import {Direction} from "../models/base/parsed-pagination-token";
import {ProductDetail} from "../models/product/productDetail";
import {ProductForUpdate} from "../models/product/productForUpdate";
import {Product} from "../models/product/product";
import {ProductForCreation} from "../models/product/productForCreation";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: ProductPagedResult[] = []

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    console.log(error);
    return of(error);
  }

  private getHeader(): HttpHeaders {
    return new HttpHeaders({
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'Accept': 'application/json'
    })
  }

  private getAuthHeader(): HttpHeaders {
    return new HttpHeaders({
      'X-tenant-id': sessionStorage.getItem('tenantId') || '',
      'X-app-key': sessionStorage.getItem('appKey') || '',
      'Accept': 'application/json'
    })
  }

  public findByTextSearch(q: string | null, paginationDirection: Direction, skipToken:string | undefined, limit: number): Observable<ProductPagedResult> {
    let cleanSkipToken = ""

    if (skipToken != undefined) {
      cleanSkipToken = skipToken
    }

    if(q != null) {
      return this.http.get<ProductPagedResult[]>(`${environment.server}/Product?q=${q}&paginationDirection=${paginationDirection}&$skiptoken=${cleanSkipToken}&limit=${limit}`
        , {headers: this.getHeader()}).pipe(map<any, ProductPagedResult[]>(res => res), catchError(this.errorHandler));
    } else {
      return this.http.get<ProductPagedResult[]>(`${environment.server}/Product?paginationDirection=${paginationDirection}&$skiptoken=${cleanSkipToken}&limit=${limit}`
        , {headers: this.getHeader()}).pipe(map<any, ProductPagedResult[]>(res => res), catchError(this.errorHandler));
    }
  }

  public findById(productId: string):Observable<Product> {
    return this.http.get<ProductDetail>(`${environment.server}/productadministration/${productId}`, {headers: this.getAuthHeader()})
      .pipe(map<any,Product>(res => res), catchError(this.errorHandler));
  }

  delete(productId: string): Observable<any>{
    return this.http.delete<any>(`${environment.server}/productadministration/${productId}`, {headers:this.getAuthHeader()})
      .pipe(map<any,any>(res => res))
  }

  update(productId:string, updatedProduct: ProductForUpdate): Observable<Product> {
    return this.http.put<ProductForUpdate>(`${environment.server}/productadministration/${productId}`, updatedProduct, {headers: this.getAuthHeader()})
      .pipe(map<any,Product>(res => res))
  }

  saveProduct(productForCreation: ProductForCreation): Observable<any> {
    return this.http.post<ProductForCreation>(`${environment.server}/productadministration`, productForCreation,{headers: this.getAuthHeader()})
      .pipe(map<any,any>(res => res))
  }
}
