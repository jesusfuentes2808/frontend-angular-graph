import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GamesComponent} from "@shop/pages/games/games.component";
import {DetailsComponent} from "@shop/pages/games/details/details.component";

const routes: Routes = [{
  path: '',
  component: DetailsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailsRoutingModule { }
