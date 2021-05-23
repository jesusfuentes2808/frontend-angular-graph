import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DocumentNode} from "graphql";
import {TablePaginationService} from "@shared/table-pagination/table-pagination.service";
import {USERS_LIST_QUERY} from "@graphql/operations/query/user";
import {IInfoPage, IResultData} from "@core/interfaces/result-data.interface";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {ITableColumns} from "@core/interfaces/table-columns.interface";

@Component({
  selector: 'app-table-pagination',
  templateUrl: './table-pagination.component.html',
  styleUrls: ['./table-pagination.component.scss']
})
export class TablePaginationComponent implements OnInit {
  @Input() query: DocumentNode = USERS_LIST_QUERY;
  @Input() context: Object;
  @Input() itemsPage = 20;
  @Input() resultData : IResultData;
  @Input() include = true;
  @Input() tableColumns : Array<ITableColumns> = undefined;
  @Output() manageItem = new EventEmitter<Array<any>>();
  infoPage: IInfoPage;
  data$: Observable<any>;
  constructor(private service: TablePaginationService) {

  }

  ngOnInit(): void {
    if(this.query === undefined){
      throw new Error('Query is undefined please add');
    }

    if(this.resultData === undefined){
      throw new Error('resultData is undefined please add');
    }
    console.log("this.tableColumns");
    console.log(this.tableColumns);
    if(this.tableColumns === undefined){
      throw new Error('tableColumns is undefined please add');
    }

    this.infoPage = {
      page: 1,
      pages: 1,
      itemsPage: this.itemsPage,
      total: 1,
    };
    this.loadData();
  }

  loadData() {
    console.log("this.infoPage.itemsPage");
    console.log(this.infoPage.itemsPage);
    const variables = {
      page: this.infoPage.page,
      itemsPage: this.infoPage.itemsPage,
      include: this.include
    };

    this.data$ = this.service.getCollectionData(this.query, variables, {}).pipe(
      map((result: any)=>{
        const data = result[this.resultData.definitionKey];
        this.infoPage.pages = data.info.pages;
        this.infoPage.total = data.info.total;
        return data[this.resultData.listKey];
      })
    )
    //Verificar el suscripe vs el observable
    /*.subscribe(result => {
      return result.users;
    });*/
  }

  changePage(){
    //console.log("this.infoPage.page");
    //console.log(this.infoPage.page);
    this.loadData();
  }

  manageAction(action: string, data: any){
    this.manageItem.emit([action, data])
  }
}
