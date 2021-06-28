import {UsersService} from './../../../@core/services/users.service';
import {AuthService} from './../../../@core/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {ICarouselItem} from "@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface";
import carouselItems from '@data/carousel.json';
import productsList from '@data/products.json';
import {IProduct} from '@mugan86/ng-shop-ui/lib/interfaces/product.interface'
import {ProductsService} from "@core/services/products.service";
import {ACTIVE_FILTERS} from "@core/constants/filters";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  items: ICarouselItem[] = [];
  productsList;
  listOne;
  listTwo;
  listTrhee;

  constructor(private authApi: AuthService, private usersApi: UsersService, private prodductsApi: ProductsService) { }

  ngOnInit(): void {
    this.productsList = productsList;
    //this.items = carouselItems;
    this.prodductsApi
        .getByUnitsOffers(1,4,ACTIVE_FILTERS.ACTIVE, true, 35, 40)
        .subscribe(result => {
          console.log("Productos a menos de 40");
          this.listTrhee = result;
        });

    this.prodductsApi
      .getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true, '18')
      .subscribe(result => {
        console.log("Productos PlayStation");
        this.listOne = result;
      });

    this.prodductsApi
      .getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true, '4')
      .subscribe(result => {
        console.log("Productos PlayStation");
        this.listTwo = result;
      });

    this.prodductsApi.getByUnitsOffers(
      1,5,ACTIVE_FILTERS.ACTIVE, true, -1, 20
    ).subscribe( (result: IProduct[]) => {
      result.map((item: IProduct) => {
        this.items.push({
          id: item.id,
          title: item.name,
          description: item.description,
          background: item.img,
          url: ''
        });
      })
    });

    //this.listOne = this.fakeRandomProductList();
    //this.listTwo = this.fakeRandomProductList();
    //this.listTrhee = this.fakeRandomProductList();
    /*this.authApi.login('jesusfuentes2808@gmail.com', '1234333').subscribe(result=>{
      console.log(result);
    });*/

    /*this.usersApi.getUsers(2, 1).subscribe(result => {
      console.log(result);
    });*/

    /*this.authApi.getMe().subscribe(result => {
      console.log(result);
    });*/
  }

  addToCart($event: IProduct) {
    // Usar la información del producto pasado para llevarlo al carrito de compra
    console.log($event);
  }

  showProductDetails($event: IProduct) {
    console.log($event);
  }

  fakeRandomProductList(){
    const list = [];
    const arrayMax = 4;
    const limit = this.productsList.length;

    for (let i=0; i<arrayMax; i++){
      list.push(this.productsList[Math.floor(Math.random() * limit)]);
    }
    return list;
  }
}
