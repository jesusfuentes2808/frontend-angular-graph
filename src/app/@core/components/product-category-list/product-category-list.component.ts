import {Component, Input, OnInit} from '@angular/core';
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {Router} from "@angular/router";
import {CartService} from "@shop/core/services/cart.service";

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html',
  styleUrls: ['./product-category-list.component.scss']
})
export class ProductCategoryListComponent implements OnInit {
  @Input() title = 'Título de catgoría';
  @Input() productList: Array<IProduct> = [];
  @Input() description = '';
  @Input() showDesc: boolean;

  constructor(private router: Router, private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart($event: IProduct) {
    // Usar la información del producto pasado para llevarlo al carrito de compra
    //console.log($event);
    this.cartService.manageProduct($event);
  }

  showProductDetails($event: IProduct) {
    console.log($event);
    this.router.navigate(['/games/details', +$event.id])
  }
}
