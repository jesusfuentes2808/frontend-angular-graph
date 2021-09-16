import {Component, OnInit} from '@angular/core';
import {IMeData} from '@core/interfaces/sessionInterface'
import {AuthService} from '@core/services/auth.service';
import {Router} from '@angular/router';
import {environment} from "../../../../../environments/environment.prod";
import {StripePaymentService} from "@mugan86/stripe-payment-form";
import {take} from "rxjs/operators";
import {CartService} from "@shop/core/services/cart.service";
import {CURRENCY_CODE} from "@core/constants/config";
import {infoEventAlert, loadData} from "@shared/alerts/alerts";
import {CustomerService} from "@shop/core/services/stripe/customer.service";
import {TYPE_ALERT} from "@shared/alerts/values.config";
import {ChargeService} from "@shop/core/services/stripe/charge.service";
import {IPayment} from "@core/interfaces/stripe/payment.interface";
import {ICart} from "@shop/core/components/shopping-cart/shopping-cart.interface";
import {ICharge} from "@core/interfaces/stripe/charge.interface";
import {IMail} from "@core/interfaces/mail.interface";
import {MailService} from "@core/services/mail.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  meData: IMeData;
  key = environment.stripePublicKey;
  address = '';
  available = false;
  block = false;
  constructor(private auth : AuthService, private router: Router,
              private stripePayment: StripePaymentService,
              private cartService: CartService,
              private customerService: CustomerService,
              private chargeService: ChargeService,
              private mailService: MailService,
  ) {

    this.cartService.itemsVar$.pipe(take(1)).subscribe((cart: ICart) => {
      if(this.cartService.cart.total === 0 && this.available === false) {
        this.notAvailableProducts();
        this.available = false;
      } else {
        //this.available = true;
      }
    });

    this.auth.accessVar$.subscribe((data: IMeData)=>{
      if(!data.status){
        this.router.navigate(['/login']);
        return;
      }
      this.meData = data;
    });

    this.stripePayment.cardTokenVar$.pipe(take(1)).subscribe((token: string) => {
      console.log(token);
      if(token.indexOf('tok_')>-1 && this.meData.status && this.address !== ''){
        /*console.log('podemos encvar la info', token);
        console.log('Símbolo', CURRENCY_SELECT, 'Cídigo: '+ CURRENCY_CODE);
        //this.caretService.initialize();
        console.log(this.meData.user.stripeCustomer);

        console.log(this.cartService.cart.total);

        console.log(this.cartService.orderDescription());*/

        const payment: IPayment = {
          token,
          customer: this.meData.user.stripeCustomer,
          amount: this.cartService.cart.total.toString(),
          currency: CURRENCY_CODE,
          description: this.cartService.orderDescription(),
        };
        this.block = true;
        loadData(
          'Realizando el pago',
          'Espera mientras se procesa la información de pago'
        );
        console.log(payment);

        this.chargeService.pay(payment)
          .pipe(take(1))
          .subscribe(async (result: {
            status: boolean,
            message: string,
            charge: ICharge
          }) => {
            if(result.status){
              console.log('OK');
              console.log(result.charge);
              await infoEventAlert('Pedido realizado correctamente',
                'Haz efectuato el pedido ¡Muchas gracias!',
                TYPE_ALERT.SUCCESS);
              this.sendEmail(result.charge);
              this.router.navigate(['/orders']);
              this.cartService.clear();
              return;
            } else {
              console.log(result.message);
              await infoEventAlert('Pedido NO SE HA realizado correctamente',
                'El pedido no se ha completado, intentelo de nuevo por favor',
                TYPE_ALERT.ERROR)
            }
            this.block = false;
          });

      }
    })
  }

  async notAvailableProducts(){
    this.cartService.close();
    this.available = false;

    await infoEventAlert(
      'Acción no disponible',
      'No puedes realizar el pago sin productos en el carrito de la compra');
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
    console.log("START FFROM CHECKOUT");
    this.block = false;
    this.auth.start();
    if(localStorage.getItem('address')){
      this.address = localStorage.getItem('address');
      localStorage.removeItem('address');
    }
    this.cartService.initialize();
    localStorage.removeItem('route_after_login');
    if(this.cartService.cart.total === 0 ){
      this.notAvailableProducts();
      this.available = false;
    } else {
      this.available = true;
    }
  }

  sendEmail(charge: ICharge){
    const mail: IMail = {
      to: charge.receiptEmail,
      subject: 'Confirmacion de pedido',
      html: 'El pedido se ha realizadfo correctamente.' +
        'puedes cponsultarlo en la siguiente url <a href="#" target="_blank">Aqui</a>'
    };
    this.mailService.send(mail).pipe(take(1)).subscribe();
  }

  async sendData(){
    if(this.meData.user.stripeCustomer === null){
      await infoEventAlert('Cliente no existe', 'Necesitamos un cliente para realizar el pago');
      const stripeName = `${this.meData.user.name} ${this.meData.user.lastname}`;
      loadData('procesando la información', 'creando cliente');
      this.customerService.add(
        stripeName,
        this.meData.user.email
      ).pipe(take(1))
        .subscribe(async (result: {status: boolean, message: string}) => {
        if(result.status){
          await infoEventAlert(
            'Cliente añadido al usuario',
            'Reiniciar la sesión',
            TYPE_ALERT.SUCCESS);

          localStorage.setItem('address', this.address);
          localStorage.setItem('route_after_login', this.router.url);
          this.auth.resetSession();
        } else {
          await infoEventAlert(
            'Cliente no añadido',
            result.message,
            TYPE_ALERT.ERROR);
        }

      });

      return;
    }
    this.stripePayment.takeCardToken(true);
  }
}
