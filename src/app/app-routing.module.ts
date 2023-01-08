import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {CartStatisticsComponent} from "./charts/cart-statistics/cart-statistics.component";

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
    path: 'cartstatistics',
    component: CartStatisticsComponent,
    canActivate: [CanNavigateToAdminGuard]
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
