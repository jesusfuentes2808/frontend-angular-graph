import { Component, OnInit } from '@angular/core';
import {CURRENCY_SELECT} from "@core/constants/config";
import {IMeData} from "@core/interfaces/sessionInterface";
import {IStripeCharge} from "../../../../../../meang-backend/src/interfaces/stripe/charge.interface";
import {AuthService} from "@core/services/auth.service";
import {ChargeService} from "@shop/core/services/stripe/charge.service";
import {closeAlert, loadData} from "@shared/alerts/alerts";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  currencySymol = CURRENCY_SELECT;
  meData: IMeData;
  startingAfter = '';
  hasMore = false;
  charges: Array<IStripeCharge> = [];
  loading:boolean = false;
  loadMoreBtn:boolean = false;

  constructor(
    private auth: AuthService,
    private chargeServices: ChargeService,

  ) {
    this.auth.accessVar$.pipe(take(1)).subscribe((meData: IMeData) => {
      this.meData = meData;
      if(this.meData.user.stripeCustomer !== ''){
        this.charges = [];
        this.loadChargeData();
      }
    })

  }

  ngOnInit(): void {
  }

  loadChargeData(){
    console.log('Cargando datos...');
    loadData('Cargando los datos para los pedidos...', 'Espera mientras carga');
    this.chargeServices.listByCustomer(
      this.meData.user.stripeCustomer,
      100,
      '',
      ''
    )
      .pipe(take(1))
      .subscribe((data: {hasMore: boolean, charges: Array<IStripeCharge>}) => {
        data.charges.map((item: IStripeCharge) => {
          this.charges.push(item);
        });
        this.hasMore = data.hasMore;
        console.log("this.hasMore");
        console.log(data);
        console.log(this.hasMore);
        if(this.hasMore){
          this.startingAfter = data.charges[data.charges.length-1].id;
          this.loadMoreBtn = true;
        } else {
          this.startingAfter = '';
          this.loadMoreBtn = false;
        }
        closeAlert();
        this.loading = true;
      })
  }



}
