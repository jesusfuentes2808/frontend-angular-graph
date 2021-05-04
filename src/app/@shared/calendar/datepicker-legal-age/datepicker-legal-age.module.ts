import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatepickerLegalAgeComponent } from './datepicker-legal-age.component';
import {FormsModule} from '@angular/forms';
import {NgbDatepickerModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DatepickerLegalAgeComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDatepickerModule
  ],
  exports: [DatepickerLegalAgeComponent]
})
export class DatepickerLegalAgeModule { }
