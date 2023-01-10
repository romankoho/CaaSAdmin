import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgToastModule} from "ng-angular-popup";
import { OAuthModule } from 'angular-oauth2-oidc';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ShopformComponent } from './forms/shopform/shopform.component';
import { OrderStatisticsComponent } from './charts/order-statistics/order-statistics.component';
import { NgChartsModule } from 'ng2-charts';
import { DatepickerComponent } from './shared/datepicker/datepicker.component';
import { DatepickerModule} from "ng2-datepicker";
import { CartStatisticsComponent } from './charts/cart-statistics/cart-statistics.component';
import { DiscountformComponent } from './forms/discountform/discountform.component';
import { DiscountListComponent } from './discount-list/discount-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    ShopformComponent,
    OrderStatisticsComponent,
    DatepickerComponent,
    CartStatisticsComponent,
    DiscountformComponent,
    DiscountListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgToastModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    DatepickerModule,
    OAuthModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
