import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangePasswordComponent} from "@shop/pages/forms/change-password/change-password.component";


const routes: Routes = [{
  path: '',
  component: ChangePasswordComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
