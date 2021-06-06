import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActiveRoutingModule } from './active-routing.module';
import { ActiveComponent } from './active.component';
import {FormsModule} from "@angular/forms";
import {DatepickerLegalAgeModule} from "@shared/calendar/datepicker-legal-age/datepicker-legal-age.module";


@NgModule({
  declarations: [ActiveComponent],
  imports: [
    CommonModule,
    ActiveRoutingModule,
    FormsModule,
    DatepickerLegalAgeModule
  ]
})
export class ActiveModule { }
