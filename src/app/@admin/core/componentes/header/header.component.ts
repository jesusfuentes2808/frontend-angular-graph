import { Output, EventEmitter, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  toogledValue = true;
  @Output() toggleChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
  }

  toggled(){
    if(this.toogledValue === undefined){
      this.toogledValue = true;
    }
    this.toogledValue = ! this.toogledValue;
    this.toggleChange.emit(this.toogledValue);
  }
}
