import { Component, OnInit } from '@angular/core';
import {AuthService} from '@core/services/auth.service';
import {IMeData} from '@core/interfaces/sessionInterface';
import {IUser} from '@core/interfaces/user.interface';
import shopMenuItems from '@data/menus/shop.json'
import {IMenuItem} from "@core/interfaces/menu-item..interface";
import {ICart} from "@shop/core/components/shopping-cart/shopping-cart.interface";
import {CartService} from "@shop/core/services/cart.service";
import {REDIRECTS_ROUTES} from "@core/constants/config";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems: Array<IMenuItem> = shopMenuItems;
  session: IMeData = {
    status: false
  };
  access = false;
  role: string;
  userLabel = '';
  cartItemsTotal: Number;

  constructor(private authService: AuthService, private cartService: CartService, private router: Router) {
    this.authService.accessVar$.subscribe((result) => {

      this.session = result;
      this.access = this.session.status;

      this.role = this.session.user?.role;
      this.userLabel = `${this.session.user?.name} ${this.session.user?.lastname}`;

    });

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if(data !== undefined && data !== null){
        this.cartItemsTotal = data.subtotal;
      }
    })
  }

  ngOnInit(): void {
    this.cartItemsTotal = this.cartService.initialize().subtotal;
  }

  logout(){
    if(REDIRECTS_ROUTES.includes(this.router.url)){
      localStorage.setItem('route_after_login', this.router.url);
    }

    this.authService.resetSession();
  }

  open(){
    this.cartService.open();
  }

}
