import { Injectable } from '@angular/core';
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {ICart} from "@shop/core/components/shopping-cart/shopping-cart.interface";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  products: Array<IProduct> = [];
  cart: ICart = {
    total: 0,
    products: this.products,
    subtotal: 0,
  }

  public itemsVar = new Subject <ICart>();
  public itemsVar$ = this.itemsVar.asObservable();

  constructor() { }

  initialize() {
    const storeData = JSON.parse(localStorage.getItem('cart'));
    if(storeData !== null){
      this.cart = storeData;
    }
    return this.cart;
  }

  orderDescription(){
    let description = '';
    this.cart.products.map((product: IProduct) => {
        description += `${product.name} (${product.description}) x ${product.qty}\n`;
    });
    return description;
  }

  public updateItemsInCart(newValue: ICart){
    this.itemsVar.next(newValue);
  }

  manageProduct(product: IProduct){
    //console.log(this.cart.products);
    const productTotal = this.cart.products.length;

    if(productTotal === 0){
      this.cart.products.push(product);
    } else {
      const productFind = this.cart.products.find((productIn) => productIn.id === product.id)

      if(productFind !== undefined && product !== null){
        const index = this.cart.products.indexOf(productFind);
        if(productFind.qty > 0){
          this.cart.products[index] = productFind;
        } else {
          this.cart.products.splice(index, 1);
        }

      } else {
        this.cart.products.push(product);
      }
    }

    this.checkoutTotal();
  }

  clear(){
    this.products = [];
    this.cart = {
      total: 0,
      products: this.products,
      subtotal: 0,
    }
    this.setInfo();
  }

  private setInfo(){
    localStorage.setItem('cart', JSON.stringify(this.cart));
    this.updateItemsInCart(this.cart);
  }

  checkoutTotal(){
    this.cart.subtotal = this.cart.products.reduce((previousValue, currentValue) => +previousValue + currentValue.qty, 0 );
    this.cart.total = this.cart.products.reduce((previousValue, currentValue) => +previousValue + (currentValue.price * currentValue.qty), 0 );

    this.setInfo();
    return this.cart;
  }

  add(){

  }

  delete(){

  }

  open(){
    console.log("openNav");
    document.getElementById('mySidenav').style.width = '600px';
    document.getElementById('overlay').style.display = 'block';
    document.body.style.overflow = 'hidden';
  }

  close(){
    console.log("closeNav");
    document.getElementById('mySidenav').style.width = '0';
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
  }
}
