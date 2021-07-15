import {Injectable} from '@angular/core';
import {ApiService} from "@graphql/services/api.service";
import {Apollo} from "apollo-angular";
import {ACTIVE_FILTERS} from "@core/constants/filters";
import {SHOP_LAST_UNITS_OFFERS, SHOP_PRODUCT_BY_PLATFORM} from "@graphql/operations/query/shop-product";
import {map} from "rxjs/operators";
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {HOME_PAGE} from "@graphql/operations/fragment/home-page";

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ApiService{

  constructor(apollo: Apollo) {
    super(apollo);
  }

  getHomePage(){
    return this.get(
      HOME_PAGE,
      {
        showPlatform: true,
        showInfo: false,
      }
    ).pipe(map((result: any) => {
      console.log(result);
      return{
        carousel: result.carousel.shopProducts,
        ps4: this.manageInfo(result.ps4.shopProducts),
        pc: this.manageInfo(result.pc.shopProducts),
        topPrice35: this.manageInfo(result.topPrice35.shopProducts)
      }
    }))
  }

  getByPlatform(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    platform: Array<string> = ["-1"],
    showInfo: boolean = true,
    showPlatform: boolean = false
  ){
    return this.get(
      SHOP_PRODUCT_BY_PLATFORM,
      {
        page,
        itemsPage,
        active,
        random,
        platform,
        showInfo,
        showPlatform
      }
    ).pipe(map((result: any) => {
      //return this.manageInfo(result.shopProductsPlatforms.shopProducts);
      const data = result.shopProductsPlatforms;
      console.log("dsadas", data.info);
      return {
        info: data.info,
        result: this.manageInfo(data.shopProducts),
      }
    }));
  }

  getByUnitsOffers(
    page: number = 1,
    itemsPage: number = 10,
    active: ACTIVE_FILTERS = ACTIVE_FILTERS.ACTIVE,
    random: boolean = false,
    topPrice: number = -1,
    lastUnits: number = -1,
    showInfo: boolean = false,
    showPlatform: boolean = true,
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
        showInfo
      }
    ).pipe(map((result: any) => {
        const data = result.shopProductsOfferLast;
        //return this.manageInfo(data.shopProducts);

      return {
        info: data.info,
        result: this.manageInfo(data.shopProducts),
      }
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
        description: (shopObject.platform)? shopObject.platform.name: '',
        qty: 1,
        price: shopObject.price,
        stock: shopObject.stock,
      })
    })
    return resultList;
  }
}
