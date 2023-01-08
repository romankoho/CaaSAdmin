import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {CanNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {OrderStatisticsComponent} from "./charts/order-statistics/order-statistics.component";

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
