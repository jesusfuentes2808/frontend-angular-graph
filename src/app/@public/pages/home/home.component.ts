import {UsersService} from './../../../@core/services/users.service';
import {AuthService} from './../../../@core/services/auth.service';
import {Component, OnInit} from '@angular/core';
import {ICarouselItem} from "@mugan86/ng-shop-ui/lib/interfaces/carousel-item.interface";
import carouselItems from '@data/carousel.json';
import productsList from '@data/products.json';
import {IProduct} from '@mugan86/ng-shop-ui/lib/interfaces/product.interface'
import {ProductsService} from "@core/services/products.service";
import {ACTIVE_FILTERS} from "@core/constants/filters";
import {closeAlert, loadData} from "@shared/alerts/alerts";

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
  loading:boolean;

  constructor(private authApi: AuthService, private usersApi: UsersService, private productsApi: ProductsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.productsList = productsList;
    loadData('Cargando datos', 'Espera mientras carga la información');
    this.productsApi.getHomePage().subscribe(data => {
      this.listOne=data.ps4;
      this.listTwo=data.topPrice35;
      this.listTrhee=data.pc;
      this.items = this.manageCarousel(data.carousel);
      this.loading = false;
      closeAlert();
    });
    //this.items = carouselItems;
    /*this.prodductsApi
        .getByUnitsOffers(1,4,ACTIVE_FILTERS.ACTIVE, true, 35, 40)
        .subscribe(data => {
          console.log("Productos a menos de 40");
          this.listTrhee = data.result;
        });

    this.prodductsApi
      .getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true, ['18'])
      .subscribe(data => {
        console.log("Productos PlayStation");
        this.listOne = data.result;
      });

    this.prodductsApi
      .getByPlatform(1,4,ACTIVE_FILTERS.ACTIVE, true, ['4'])
      .subscribe(data => {
        console.log("Productos PlayStation");
        this.listTwo = data.result;
      });

    this.prodductsApi.getByUnitsOffers(
      1,5,ACTIVE_FILTERS.ACTIVE, true,
      -1,
      20,
      false,
      true,
    ).subscribe( (data) => {
      data.result.map((item: IProduct) => {
        this.items.push({
          id: item.id,
          title: item.name,
          description: item.description,
          background: item.img,
          url: ''
        });
      })
    });*/

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

  private manageCarousel(list){
    const itemsValues: Array<ICarouselItem> = [];
    list.map( (item) => {
      console.log(item);
      itemsValues.push({
        id: item.id,
        title: item.product.name,
        description: item.platform.description,
        background: item.product.img,
        url: '/games/details/'.concat(item.id)
      });
    })

    return itemsValues;
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
