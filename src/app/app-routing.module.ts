import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {OrderStatisticsComponent} from "./charts/order-statistics/order-statistics.component";
import {CartStatisticsComponent} from "./charts/cart-statistics/cart-statistics.component";
import {DiscountformComponent} from "./forms/discountform/discountform.component";
import {DiscountListComponent} from "./discount-list/discount-list.component";
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductformComponent} from "./forms/productform/productform.component";
import {RedirectComponent} from "./redirect/redirect.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'orderstatistics',
    component: OrderStatisticsComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'cartstatistics',
    component: CartStatisticsComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'discounts',
    component: DiscountListComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'discounts/:id',
    component: DiscountformComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'products/:id',
    component: ProductformComponent,
    canActivate: [CanNavigateToAdminGuard]
  },
  {
    path: 'redirect',
    component: RedirectComponent
  },
  {
    path: 'index.html',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
