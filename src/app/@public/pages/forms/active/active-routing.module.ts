import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ActiveComponent} from "@shop/pages/forms/active/active.component";


const routes: Routes = [{
  path: '',
  component: ActiveComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActiveRoutingModule { }
