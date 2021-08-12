import { Component, OnInit } from '@angular/core';
import {CartService} from "@shop/core/services/cart.service";
import {ICart} from "@shop/core/components/shopping-cart/shopping-cart.interface";
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {CURRENCIES_SYMBOL} from "@mugan86/ng-shop-ui";

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {
  cart: ICart;
  currencySelect = CURRENCIES_SYMBOL['USD'];

  constructor(private cartService: CartService) {
    this.cartService.itemsVar$.subscribe((data: ICart) => {
      console.log("CAMBIO EN SUSCRIBE")
      if(data !== undefined && data !== null){
        this.cart = data;
      }
    })
  }

  ngOnInit(): void {
    this.cart = this.cartService.initialize();
    console.log(this.cart);
  }

  clearItem(product: IProduct){
    this.manageProductUnitInfo(0, product);
  }

  clear(){
    this.cartService.clear();
  }

  process(){

  }

  changeValue(qty: number, product: IProduct){
    this.manageProductUnitInfo(qty, product);
  }

  manageProductUnitInfo(qty: number, product: IProduct){
    product.qty = qty;
    this.cartService.manageProduct(product);
  }

  closeNav(){
    this.cartService.close();
  }
}
