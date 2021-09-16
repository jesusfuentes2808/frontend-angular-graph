import { Injectable } from '@angular/core';
import {ApiService} from "@graphql/services/api.service";
import {Apollo} from "apollo-angular";
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {IPayment} from "@core/interfaces/stripe/payment.interface";
import {CREATE_PAY_ORDDER} from "@graphql/operations/mutation/stripe/charge";
import {any} from "codelyzer/util/function";
import {map} from "rxjs/operators";
import {CUSTOMER_CHARGES_LIST} from "@graphql/operations/query/stripe/charge";

@Injectable({
  providedIn: 'root'
})
export class ChargeService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  pay (payment: IPayment){
    return this.set(
      CREATE_PAY_ORDDER,
      { payment }
    ).pipe(map((result: any) => {
      return result.chargeOrder;
    })
    );
  }

  listByCustomer(
    customer: string,
    limit: number,
    startingAfter: string,
    endingBefore: string,
  ){
    console.log("HOLA"+limit);

    return this.get(
      CUSTOMER_CHARGES_LIST,
      {
        customer,
        limit,
        startingAfter,
        endingBefore
      }
    ).pipe(map((result: any) => {
      console.log("PIPE");
      console.log(result);
      return result.chargesByCustomer;
    }));
  }
}
