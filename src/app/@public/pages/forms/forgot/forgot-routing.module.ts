import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActiveComponent} from "@shop/pages/forms/active/active.component";
import {ForgotComponent} from "@shop/pages/forms/forgot/forgot.component";


const routes: Routes = [{
  path: '',
  component: ForgotComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ForgotRoutingModule { }
