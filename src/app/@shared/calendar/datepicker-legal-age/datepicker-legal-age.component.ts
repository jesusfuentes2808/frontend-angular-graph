import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-datepicker-legal-age',
  templateUrl: './datepicker-legal-age.component.html',
  styleUrls: ['./datepicker-legal-age.component.scss']
})
export class DatepickerLegalAgeComponent implements OnInit {
  CURRENTDAY = {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  };

  minDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 100,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day,
  };

  maxDate: NgbDateStruct = {
    year: this.CURRENTDAY.year - 18,
    month: this.CURRENTDAY.month,
    day: this.CURRENTDAY.day,
  };

  model: NgbDateStruct = this.maxDate;

  @Output() newDate = new EventEmitter<NgbDateStruct>();

  constructor() { }

  ngOnInit(): void {
  }

  selectDateChange(){
    console.log(this.model);
    this.newDate.emit(this.model);
  }

}
