import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {OrdersComponent} from "@shop/pages/orders/orders.component";


const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
