import {Component, OnInit} from '@angular/core';
import {IProduct} from "@mugan86/ng-shop-ui/lib/interfaces/product.interface";
import {ACTIVE_FILTERS} from "../../../@core/constants/filters";
import {ProductsService} from "../../../@core/services/products.service";
import {IInfoPage} from "../../../@core/interfaces/result-data.interface";
import {ActivatedRoute} from "@angular/router";
import {IGamePageInfo} from "./game-page-info.interface";
import {GAMES_PAGES_INFO, TYPE_OPERATION} from "./game.constants";
import {closeAlert, loadData} from "../../../@shared/alerts/alerts";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  infoPage: IInfoPage = {
    page: 1,
    pages: 20,
    total: 160,
    itemsPage: 20,
  };

  gamesPageInfo: IGamePageInfo;
  typeData: TYPE_OPERATION;
  selectPage;
  productList: Array<IProduct> = [];
  listTrhee;
  loading:boolean;

  constructor(private prodductsApi: ProductsService, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.loading = true;
    console.log("https://event.webinarjam.com/live/257/n6v67ty4h9va2wocqww2");
    loadData('Cargando datos', 'Espera mientras carga la información');

    this.activatedRoute.params.subscribe(params => {
      const keyPage = `${params.type}/${params.filter}`;
      this.gamesPageInfo = GAMES_PAGES_INFO[keyPage];
      this.typeData = params.type;

      this.selectPage = 1;
      this.loadData();
    });
  }

  loadData() {

    if (this.typeData === TYPE_OPERATION.PLATFORMS) {
      this.prodductsApi
        .getByPlatform(
          this.selectPage,
          this.infoPage.itemsPage,
          ACTIVE_FILTERS.ACTIVE,
          false,
          this.gamesPageInfo.platformsIds,
          true,
          true)
        .subscribe(data => {
          console.log("Productos PlayStation");
          console.log(data);
          this.productList = data.result;
          this.infoPage = data.info;

          this.loading = false;
          closeAlert();
        });
      return;
    }

    this.prodductsApi.getByUnitsOffers(
      this.selectPage,
      this.infoPage.itemsPage,
      ACTIVE_FILTERS.ACTIVE,
      false,
      this.gamesPageInfo.topPrice,
      this.gamesPageInfo.stock,
      true,
      true
    ).subscribe( (data) => {
      console.log("Productos Promociones");
      console.log(data);
      this.productList = data.result;
      this.infoPage = data.info;

      this.loading = false;
      closeAlert();
    });

  }

  changePage() {
    console.log('Cambio de página');
    this.loadData();
  }
}
