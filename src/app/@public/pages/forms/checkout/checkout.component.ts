import { Component, OnInit } from '@angular/core';
import {IMeData} from '@core/interfaces/sessionInterface'
import { AuthService } from '@core/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;

  constructor(private auth : AuthService, private router: Router) {
    console.log("------------------HOLA----");
    this.auth.accessVar$.subscribe((data: IMeData)=>{
      console.log("--------qqq--------------");
      console.log(data);
      if(!data.status){
        this.router.navigate(['/login']);
        return;
      }
      this.meData = data;
    })
  }

  ngOnInit(): void {
    console.log("START FFROM CHECKOUT");
    this.auth.start();
  }

}
