import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '@core/guards/admin.guard';

const routes: Routes = [
  {
    component: AdminComponent,
    canActivateChild: [AdminGuard],
    path: 'admin',
    children: [
      {
        path: ``,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: `dashboard`,
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: `users`,
        loadChildren: () =>
          import('./users/users.module').then(m => m.UsersModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
