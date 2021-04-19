import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { HeaderComponent } from '@admin-core/componentes/header/header.component';
import { TitleComponent } from '@admin-core/componentes/title/title.component';
import { SidebarComponent } from '@admin-core/componentes/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AdminComponent, 
    HeaderComponent,
    TitleComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
