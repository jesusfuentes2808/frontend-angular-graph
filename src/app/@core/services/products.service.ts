import {Injectable} from '@angular/core';
import {ApiService} from "@graphql/services/api.service";
import {Apollo} from "apollo-angular";
import {ACTIVE_FILTERS} from "@core/constants/filters";
import {SHOP_LAST_UNITS_OFFERS, SHOP_PRODUCT_BY_PLATFORM} from "@graphql/operations/query/shop-product";
import {map} from "rxjs/operators";
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    platform: string = "18"
  ){
    return this.get(
      SHOP_PRODUCT_BY_PLATFORM,
      {
        page,
        itemsPage,
        active,
        random,
        platform
      }
    ).pipe(map((result: any) => {
      return this.manageInfo(result.shopProductsPlatforms.shopProducts);
    }));
  }

  getByUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1
  ){
    console.log('Ultimas unidades y ofertas');
    return this.get(
      SHOP_LAST_UNITS_OFFERS,
      {
        page,
        itemsPage,
        active,
        random,
        topPrice,
        lastUnits,
      }
    ).pipe(map((result: any) => {
        return this.manageInfo(result.shopProductsOfferLast.shopProducts);
    }));
  }

  private  manageInfo(listProduct){
    const resultList: Array<IProduct> = [];
    listProduct.map((shopObject) => {
      resultList.push({
        id: shopObject.id,
        img: shopObject.product.img,
        name: shopObject.product.name,
        rating: shopObject.product.rating,
        description: '',
        qty: 1,
        price: shopObject.price,
        stock: shopObject.stock,
      })
    })
    return resultList;
  }
}
