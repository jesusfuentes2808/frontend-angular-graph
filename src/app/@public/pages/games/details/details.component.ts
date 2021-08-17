import { Component, OnInit } from '@angular/core';
import products from '@data/products.json';
import {CURRENCIES_SYMBOL, CURRENCY_LIST} from "@mugan86/ng-shop-ui";
import ProductService from "../../../../../../../meang-backend/src/services/product.service";
import {ProductsService} from "@core/services/products.service";
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {GAMES_PAGES_INFO} from "@shop/pages/games/game.constants";
import {ActivatedRoute} from "@angular/router";
import {closeAlert, loadData} from "@shared/alerts/alerts";
import {CartService} from "@shop/core/services/cart.service";
import {ICart} from "@shop/core/components/shopping-cart/shopping-cart.interface";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  product: IProduct =  {
                        id: '',
                        img: '',
                        name: '',
                        rating: {value:0, count: 0},
                        description: '',
                        qty: 0,
                        price: 0,
                        stock: 0,
                      };
  // = products[Math.floor(Math.random() * products.length)];
  selectImage: String;
  currencySelect = CURRENCIES_SYMBOL['USD'];
  screens = [];
  relationalProducts: Array<object> = [];
  randomItems: Array<IProduct> = [];
  loading: boolean;

  constructor(private productService: ProductsService, private activatedRoute: ActivatedRoute, private cartService:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.getProduct(+params.id);
      loadData('Cargando datos', 'Espera mientras carga la información');
    })

    this.productService.getRandomItems().subscribe(result => {
      console.log('random', result);
      this.randomItems = result;
    });

    this.loading = true;
  }

  getProduct(id){
    this.productService.getItem(id).subscribe( result => {
      this.product = result.product;

      const saveProductInCart = this.findProduct(+this.product.id);
      this.product.qty = (saveProductInCart !== undefined) ? saveProductInCart.qty : this.product.qty;

      this.selectImage = this.product.img;
      this.screens = result.screens;
      this.relationalProducts = result.relational;
      this.loading = false;
      closeAlert();
    });

    this.cartService.itemsVar$.subscribe((data: ICart) => {
      if(data.subtotal === 0){
        this.product.qty = 1;
      }

      //if(this.product!== undefined){
        this.product.qty = this.findProduct(+this.product.id).qty;
      //}
    });
  }

  findProduct(id: number){
    return this.cartService.cart.products.find(item => +item.id === id)
  }

  selectOtherPlatform($event) {
    this.getProduct(+$event.target.value);
  }

  selectImgMain(i){
    this.selectImage = this.screens[i];
  }

  changeValue(qty: number) {
    console.log(qty);
    this.product.qty = qty;
  }

  addToCart(){
    this.cartService.manageProduct(this.product);
  }
}
